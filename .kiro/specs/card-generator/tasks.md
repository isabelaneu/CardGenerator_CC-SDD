# Implementation Plan

## Task Format Template

Use whichever pattern fits the work breakdown:

### Major task only
- [x] 1. Build the static HTML structure for the Card Generator UI.
  - Create the form fields, preview panel, saved card list, and main layout shell.
  - _Requirements: 1, 2, 3_

### Major + Sub-task structure
- [ ] 2. Implement card data validation and form behavior.
- [ ] 2.1 Capture required form fields and update validation messages in real time.
  - Validate name, job title, email, social links, and theme selection.
  - Show error messages for missing or invalid values before the user can save.
  - _Requirements: 1_
- [ ] 2.2 Provide accessible and visible form statuses for saved and edited cards.
  - Ensure the submit and update actions match the current form validation state.
  - _Requirements: 1, 3_

- [ ] 3. Implement the live card preview and layout customization.
- [ ] 3.1 Render the current form state into the business card preview.
  - Show the selected name, title, email, social links, and visual theme.
  - Keep the preview synchronized with the active form values.
  - _Requirements: 2_
- [ ] 3.2 Add theme and layout change handling for the preview.
  - Update card colors, frame styles, and layout presentation when the user changes theme or layout settings.
  - _Requirements: 2_

- [ ] 4. Implement LocalStorage persistence and card management.
- [ ] 4.1 Create card storage helpers for reading and writing the saved list.
  - Use the browser LocalStorage API and define a consistent storage key.
  - _Requirements: 3_
- [ ] 4.2 Add create, list, edit, and delete operations.
  - Persist a new card when the form is valid, refresh the list, and allow editing from the list.
  - Delete an existing card and remove the corresponding stored record.
  - _Requirements: 3_

- [ ] 5. Add export or image capture behavior for the preview.
- [ ] 5.1 Generate a downloadable image from the preview card.
  - Provide user-triggered export of the card preview as an image file.
  - _Requirements: 2_

> Parallel marker notes: these tasks are intentionally planned as a static front-end generator and should only be mapped here, not executed.
