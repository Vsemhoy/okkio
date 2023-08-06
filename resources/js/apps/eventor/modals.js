class Modals {


  // Call the function to create and add the modal to the body

  
}

class EventModal {
  constructor(){
    this.fields = [];
    this.fields.push(this.field_title());
    this.fields.push(this.field_content());
    this.fields.push(this.field_section());
    this.fields.push(this.field_category());
    this.fields.push(this.field_importance());
    this.fields.push(this.field_setdate());
    this.modalBody = this.modalEventEditor(this.fields);
  }

  get()
  {
    return this.modalBody;
  }

  modalEventEditor(elements = []) {
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
    for (let i = 0 ; i < elements.length; i++)
    {
      modalForm.appendChild(elements[i]);
    }
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
  

  field_title(id = 'evt_content', name = 'title', content = '')
  {
    const divElement = document.createElement('div');
    divElement.classList.add('uk-margin');
    divElement.innerHTML = `
    <label class="uk-form-label" for="${id}">Title:</label>
    <div class="uk-form-controls">
        <input class="uk-input" type="text" id="${id}" name="${name}" maxlength="190" required>
    </div>
    `;
    return divElement;
  }

  field_content(id = 'evt_content', name = 'content', content = '')
  {
    const divElement = document.createElement('div');
    divElement.classList.add('uk-margin');
    divElement.innerHTML = `
    <label class="uk-form-label" for="${id}">Content:</label>
    <div class="uk-form-controls">
      <textarea class="uk-textarea" id="${id}" name="${name}" rows="6"></textarea>
    </div>
    `;
    return divElement;
  }

  field_section(id = 'evt_section', name = 'status', content = '')
  {
    const divElement = document.createElement('div');
    divElement.classList.add('uk-margin');
    divElement.innerHTML = `
    <label class="uk-form-label" for="${id}">Section:</label>
    <div class="uk-form-controls">
        <select class="uk-select" id="${id}" name="${name}">
          <option value="dmedicine">Medicine</option>
          <option value="sselling">Selling</option>
          <option value="gshopping">Shopping</option>
        </select>
    </div>
    `;
    return divElement;
  }

  field_category(id = 'evt_category', name = 'category', content = '')
  {
    const divElement = document.createElement('div');
    divElement.classList.add('uk-margin');
    divElement.innerHTML = `
    <label class="uk-form-label" for="${id}">Category:</label>
    <div class="uk-form-controls">
        <select class="uk-select" id="${id}" name="${name}">
          <option value="4medicine">Medicine</option>
          <option value="5selling">Selling</option>
          <option value="6shopping">Shopping</option>
        </select>
    </div>
    `;
    return divElement;
  }

  field_importance(id = 'evt_importance', name = 'importance', content = '')
  {
    const divElement = document.createElement('div');
    divElement.classList.add('uk-margin');
    divElement.innerHTML = `
    <label class="uk-form-label" for="${id}">Importance:</label>
    <div class="uk-form-controls">
    <input class="uk-range" type="range" value="2" min="0" max="5" step="1"
        id="${id}" aria-label="Range" name='${name}'>
    </div>
    `;
    return divElement;
  }

  field_setdate(id = 'evt_setdate', name = 'setdate', content = '')
  {
    const divElement = document.createElement('div');
    divElement.classList.add('uk-margin');
    divElement.innerHTML = `
    <label class="uk-form-label" for="${id}">Set date:</label>
        <div class="uk-form-controls">
        <input class="uk-input" type="date" id="${id}" name="${name}">
    </div>
    `;
    return divElement;
  }

}