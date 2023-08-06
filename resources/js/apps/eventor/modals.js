class Modals {


  static modalEventEditor() {
    // Create the modal container
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modalHtmlEditor';
    modalContainer.classList.add('uk-modal-container');
    modalContainer.setAttribute('uk-modal', '');
    modalContainer.setAttribute('bg-close', 'false');
  
    // Modal close button
    const modalCloseButton = document.createElement('button');
    modalCloseButton.classList.add('uk-modal-close-full', 'uk-close-large');
    modalCloseButton.setAttribute('type', 'button');
    modalCloseButton.setAttribute('uk-close', '');
  
    // Modal dialog
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('uk-modal-dialog');
  
    // Modal close button inside dialog
    const modalCloseButtonInsideDialog = document.createElement('button');
    modalCloseButtonInsideDialog.classList.add('uk-modal-close-default');
    modalCloseButtonInsideDialog.setAttribute('type', 'button');
    modalCloseButtonInsideDialog.setAttribute('uk-close', '');
  
    // Modal header
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('uk-modal-header');
  
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('uk-modal-title');
    modalTitle.textContent = 'Headline';
  
    // Modal body
    const modalBody = document.createElement('div');
    modalBody.classList.add('uk-modal-body');
    modalBody.setAttribute('uk-overflow-auto', '');
  
    // Modal form
    const modalForm = document.createElement('form');
    modalForm.classList.add('uk-form-stacked', 'uk-margin-large');
    modalForm.setAttribute('method', 'POST');
    modalForm.setAttribute('action', 'submit.php');
  
    // Modal form fields and elements (omitted for brevity)
  
    // Modal footer
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('uk-modal-footer', 'uk-text-right');
  
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('uk-button', 'uk-button-default', 'uk-modal-close');
    cancelButton.setAttribute('type', 'button');
    cancelButton.textContent = 'Cancel';
  
    const saveButton = document.createElement('button');
    saveButton.classList.add('uk-button', 'uk-button-primary');
    saveButton.id = 'eventor_act_saveEvent';
    saveButton.setAttribute('type', 'button');
    saveButton.textContent = 'Save';
  
    // Append all elements together to create the modal structure
    modalHeader.appendChild(modalTitle);
   // modalForm.appendChild(/* Add your form fields and elements here */);
    modalBody.appendChild(modalForm);
    modalFooter.appendChild(cancelButton);
    modalFooter.appendChild(saveButton);
    modalDialog.appendChild(modalCloseButtonInsideDialog);
    modalDialog.appendChild(modalHeader);
    modalDialog.appendChild(modalBody);
    modalDialog.appendChild(modalFooter);
    modalContainer.appendChild(modalCloseButton);
    modalContainer.appendChild(modalDialog);
  
    // Append the modal container to the body
    return modalContainer;
  }
  
  // Call the function to create and add the modal to the body

  
}