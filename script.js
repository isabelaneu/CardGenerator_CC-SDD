const STORAGE_KEY = 'card-generator-cards';

const form = document.getElementById('card-form');
const saveButton = document.getElementById('save-card');
const exportButton = document.getElementById('export-card');
const preview = document.getElementById('card-preview');
const savedCardsList = document.getElementById('saved-cards');
const statusElement = document.getElementById('form-status');

const fieldNames = ['name', 'jobTitle', 'email', 'socialLinks', 'layout', 'theme'];
const defaultValues = {
  name: '',
  jobTitle: '',
  email: '',
  socialLinks: '',
  layout: 'classic',
  theme: 'midnight'
};

const paletteMap = {
  midnight: {
    background: '#0f172a',
    accent: '#38bdf8',
    text: '#e2e8f0',
    secondary: '#cbd5e1'
  },
  sand: {
    background: '#f5ebd6',
    accent: '#b7791f',
    text: '#1f2933',
    secondary: '#4b5563'
  },
  forest: {
    background: '#0f3d2e',
    accent: '#86efac',
    text: '#ecfdf5',
    secondary: '#dcfce7'
  }
};

let editingCardId = null;

function getFormValues() {
  return {
    name: document.getElementById('name').value,
    jobTitle: document.getElementById('job-title').value,
    email: document.getElementById('email').value,
    socialLinks: document.getElementById('social-links').value,
    layout: document.getElementById('layout').value,
    theme: document.getElementById('theme').value
  };
}

function setStatus(message, type = '') {
  statusElement.textContent = message;
  statusElement.className = 'form-status';
  if (type) {
    statusElement.classList.add(type);
  }
}

function validateField(fieldName, value) {
  const trimmedValue = String(value ?? '').trim();

  if (fieldName === 'name') {
    return trimmedValue.length >= 2 ? '' : 'Name must contain at least 2 characters.';
  }

  if (fieldName === 'jobTitle') {
    return trimmedValue.length >= 2 ? '' : 'Job title is required.';
  }

  if (fieldName === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)
      ? ''
      : 'Enter a valid email address.';
  }

  if (fieldName === 'socialLinks') {
    if (!trimmedValue) {
      return '';
    }

    const lines = trimmedValue
      .split(/[\n,]+/)
      .map((entry) => entry.trim())
      .filter(Boolean);

    const invalid = lines.some((entry) => !/^https?:\/\//.test(entry) && !/^[\w.-]+(\.[\w.-]+)+/.test(entry));

    return invalid ? 'Use valid social profile URLs or domain names.' : '';
  }

  if (fieldName === 'layout') {
    return trimmedValue ? '' : 'Select a card layout.';
  }

  if (fieldName === 'theme') {
    return trimmedValue ? '' : 'Select a visual theme.';
  }

  return '';
}

function isFormValid(values = getFormValues()) {
  return fieldNames.every((fieldName) => validateField(fieldName, values[fieldName]) === '');
}

function showFieldError(fieldName, message) {
  const inputId = fieldName === 'jobTitle' ? 'job-title' : fieldName === 'socialLinks' ? 'social-links' : fieldName;
  const errorBox = document.getElementById(`${inputId}-error`);

  if (errorBox) {
    errorBox.textContent = message;
  }

  const input = document.getElementById(inputId);
  if (input) {
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }
}

function updateValidationState() {
  const values = getFormValues();

  fieldNames.forEach((fieldName) => {
    const message = validateField(fieldName, values[fieldName]);
    showFieldError(fieldName, message);
  });

  saveButton.disabled = !isFormValid(values);

  if (!isFormValid(values)) {
    setStatus('Please correct the highlighted form fields before saving.', 'error');
    return false;
  }

  if (editingCardId) {
    setStatus('Ready to update the selected card.', 'success');
  } else {
    setStatus('Ready to save this card.', 'success');
  }

  return true;
}

function renderPreview(values = getFormValues()) {
  const { name, jobTitle, email, socialLinks, layout, theme } = values;
  const palette = paletteMap[theme] || paletteMap.midnight;

  preview.className = `card-preview theme-${theme} layout-${layout}`;
  preview.style.background = palette.background;
  preview.style.color = palette.text;

  const nameElement = preview.querySelector('.preview-name');
  const titleElement = preview.querySelector('.preview-title');
  const emailElement = preview.querySelector('.preview-email');
  const socialElement = preview.querySelector('.preview-social');

  nameElement.textContent = name || 'Your name';
  titleElement.textContent = jobTitle || 'Job title';
  emailElement.textContent = email || 'email@example.com';
  socialElement.textContent = socialLinks || 'Social links';

  if (layout === 'split') {
    preview.style.borderLeft = `6px solid ${palette.accent}`;
  } else {
    preview.style.borderLeft = '1px solid rgba(15, 23, 42, 0.08)';
  }
}

function readCards() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    const cards = JSON.parse(stored);
    return Array.isArray(cards) ? cards : [];
  } catch (error) {
    console.error('Unable to read cards from storage', error);
    return [];
  }
}

function writeCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function renderSavedCards() {
  const cards = readCards();

  if (!cards.length) {
    savedCardsList.innerHTML = '<li class="empty-state">No cards saved yet.</li>';
    return;
  }

  savedCardsList.innerHTML = cards
    .map(
      (card) => `
        <li class="saved-card-item">
          <button type="button" class="saved-card-select" data-id="${card.id}">
            <strong>${escapeHtml(card.name || 'Unnamed Card')}</strong><br />
            <span>${escapeHtml(card.jobTitle || 'No title')}</span>
          </button>
          <div class="saved-card-actions">
            <button type="button" class="saved-card-edit" data-action="edit" data-id="${card.id}">Edit</button>
            <button type="button" class="saved-card-delete" data-action="delete" data-id="${card.id}">Delete</button>
          </div>
        </li>
      `
    )
    .join('');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function populateForm(card) {
  document.getElementById('name').value = card.name || '';
  document.getElementById('job-title').value = card.jobTitle || '';
  document.getElementById('email').value = card.email || '';
  document.getElementById('social-links').value = card.socialLinks || '';
  document.getElementById('layout').value = card.layout || 'classic';
  document.getElementById('theme').value = card.theme || 'midnight';
  renderPreview(getFormValues());
  updateValidationState();
}

function resetForm() {
  editingCardId = null;
  form.reset();
  document.getElementById('layout').value = defaultValues.layout;
  document.getElementById('theme').value = defaultValues.theme;
  renderPreview(getFormValues());
  updateValidationState();
  setStatus('Draft cleared.', 'success');
}

function createCardObject(values) {
  return {
    id: editingCardId || `card-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: values.name.trim(),
    jobTitle: values.jobTitle.trim(),
    email: values.email.trim(),
    socialLinks: values.socialLinks.trim(),
    layout: values.layout,
    theme: values.theme
  };
}

function handleSubmit(event) {
  event.preventDefault();

  const values = getFormValues();
  if (!isFormValid(values)) {
    updateValidationState();
    setStatus('Please fix the validation errors before saving.', 'error');
    return;
  }

  const cards = readCards();
  const nextCard = createCardObject(values);
  const wasEditing = Boolean(editingCardId);

  if (editingCardId) {
    const index = cards.findIndex((card) => card.id === editingCardId);
    if (index >= 0) {
      cards[index] = { ...cards[index], ...nextCard, id: editingCardId };
    }
    setStatus('Card updated successfully.', 'success');
  } else {
    cards.push(nextCard);
    setStatus('Card saved successfully.', 'success');
  }

  writeCards(cards);
  renderSavedCards();
  resetForm();
  setStatus(wasEditing ? 'Card updated successfully.' : 'Card saved successfully.', 'success');
}

function handleSavedCardClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) {
    const selected = event.target.closest('.saved-card-select');
    if (!selected) {
      return;
    }

    const card = readCards().find((item) => item.id === selected.dataset.id);
    if (!card) {
      return;
    }

    editingCardId = card.id;
    populateForm(card);
    setStatus('Card loaded for editing.', 'success');
    return;
  }

  const { action, id } = target.dataset;
  const cards = readCards();

  if (action === 'edit') {
    const card = cards.find((item) => item.id === id);
    if (!card) {
      return;
    }

    editingCardId = id;
    populateForm(card);
    setStatus('Card loaded for editing.', 'success');
    return;
  }

  if (action === 'delete') {
    const remainingCards = cards.filter((card) => card.id !== id);
    writeCards(remainingCards);
    renderSavedCards();

    if (editingCardId === id) {
      editingCardId = null;
      resetForm();
    }

    setStatus('Card deleted successfully.', 'success');
  }
}

function exportCardImage() {
  const { name, jobTitle, email, socialLinks, theme } = getFormValues();
  const palette = paletteMap[theme] || paletteMap.midnight;
  const canvas = document.createElement('canvas');
  const width = 900;
  const height = 520;
  const scale = 2;

  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = palette.accent;
  ctx.fillRect(0, 0, width, 18);

  ctx.fillStyle = palette.text;
  ctx.font = '700 42px Arial';
  ctx.fillText(name || 'Your name', 52, 140);

  ctx.font = '400 24px Arial';
  ctx.fillStyle = palette.secondary;
  ctx.fillText(jobTitle || 'Job title', 52, 188);
  ctx.fillText(email || 'email@example.com', 52, 236);

  const socialText = socialLinks || 'social links';
  const lines = wrapText(ctx, socialText, width - 120);
  lines.slice(0, 3).forEach((line, index) => {
    ctx.fillText(line, 52, 292 + index * 30);
  });

  const link = document.createElement('a');
  link.download = `${(name || 'business-card').trim().replace(/\s+/g, '-').toLowerCase()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();

  setStatus('Card exported as an image.', 'success');
}

function wrapText(context, text, maxWidth) {
  const words = String(text)
    .split(/\s+/)
    .filter(Boolean);
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (context.measureText(nextLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
      return;
    }

    currentLine = nextLine;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length ? lines : ['Social links'];
}

form.addEventListener('input', () => {
  renderPreview();
  updateValidationState();
});

form.addEventListener('change', () => {
  renderPreview();
  updateValidationState();
});

form.addEventListener('submit', handleSubmit);

savedCardsList.addEventListener('click', handleSavedCardClick);
exportButton.addEventListener('click', exportCardImage);

renderPreview();
updateValidationState();
renderSavedCards();
setStatus('Ready to create a new card.', 'success');
