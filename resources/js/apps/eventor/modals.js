class Modals {


  // Call the function to create and add the modal to the body

  
}

class EventModal {
  constructor(){
    const options = [
      { value: 'dmedicine', label: 'Medicine' },
      { value: 'sselling', label: 'Selling' },
      { value: 'gshopping', label: 'Shopping' },
    ];

    const categorises = [
      { value: '', label: 'No category' },
      { value: 'sselling', label: 'Selling' },
      { value: 'gshopping', label: 'Shopping' },
    ];

    // SET USER ACCESS LIMIT
    const access = EventorTypes.getAccess(3);

    const status = EventorTypes.getStatus();
    const format = [
      { value: '0', label: 'Text' },
      { value: '1', label: 'HTML' },
    ];

    // const textInput = createFormField('Title:', 'evt_title', 'title', 'text', [], 'Default Title');
    // const textareaInput = createFormField('Content:', 'evt_content', 'content', 'textarea', [], 'Default Content');
    // const selectInput = createFormField('Section:', 'evt_section', 'section', 'select', options);
    // const checkboxInput = createFormField('Starred:', 'evt_starred', 'starred', 'checkbox', [], '1');
    // const rangeInput = createFormField('Importance:', 'evt_importance', 'importance', 'range', [], '2');
    // const dateInput = createFormField('Set Date:', 'evt_setdate', 'setdate', 'date');

    this.fields = [];
    this.fields.push(this.createFormField('Title:', 'evt_title', 'title', 'text', [], 'Default Title'));
    this.fields.push(this.createFormField('Content:', 'evt_content', 'content', 'textarea', [], 'Default Content'));
    this.fields.push(this.createFormField('Section:', 'evt_section', 'section', 'select', options));
    this.fields.push(this.createFormField('Category:', 'evt_category', 'category', 'select', categorises));
    this.fields.push(this.createFormField('Importance:', 'evt_importance', 'importance', 'range', [], '2'));
    this.fields.push(this.createFormField('Set Date:', 'evt_setdate', 'setdate', 'date'));
    this.fields.push(this.createFormField('Access:', 'evt_access', 'access', 'select', access));
    this.fields.push(this.createFormField('Status:', 'evt_status', 'status', 'select', status));
    this.fields.push(this.createFormField('Starred', 'evt_starred', 'starred', 'checkbox', [], '1', true));
    this.fields.push(this.createFormField('Pinned', 'evt_pinned', 'pinned', 'checkbox', [], '0', true));
    this.fields.push(this.createFormField('Locked', 'evt_locked', 'locked', 'checkbox', [], '0', true));
    this.fields.push(this.createFormField('Format:', 'evt_format', 'format', 'select', format, 0, true, true));
    
    this.modalBody = this.modalEventEditor(this.fields);

    // let timeoutId;
    // document.querySelector("body").addEventListener('mousedown', (e) => {
    //   if (e.target.id == 'evt_content'){
    //     timeoutId = setTimeout(() => {
    //       // Long-press event
    //       console.log('Long-press detected');
    //       e.target.classList.toggle('evt-input-fullscreen');
    //       e.target.closest("#modalHtmlEditor").querySelector('.uk-modal-close-full').classList.toggle('uk-hidden');
    //       e.target.closest("#modalHtmlEditor").querySelector('.evt-textarea-toggle').classList.toggle('uk-hidden');
    //       // You can perform your desired action here
    //     }, 1000); // Adjust the duration (in milliseconds) as needed
    //   }
    // });

    // document.querySelector("body").addEventListener('mouseup', (e) => {
    //   if (e.target.id == 'evt_content'){
    //     clearTimeout(timeoutId); // Clear the timeout if mouse is released before the long-press duration
    //   }
    // });


    document.querySelector("body").addEventListener('click', (e) => {

    });


    document.querySelector("body").addEventListener('click', (e) => {
      if (e.target.closest('.evt-full-trigger') || e.target.id == 'evt_toggleTextarea' || e.target.parentElement != null && e.target.parentElement.id == 'evt_toggleTextarea'){
        document.querySelector('#evt_content').classList.toggle('evt-input-fullscreen');
        document.querySelector('.evt-full-trigger').classList.toggle('evt-full-trigger-fullscreen');
        document.querySelector("#modalHtmlEditor").querySelector('.uk-modal-close-full').classList.toggle('uk-hidden');
        document.querySelector("#modalHtmlEditor").querySelector('.evt-textarea-toggle').classList.toggle('uk-hidden');
      }
    });

    document.body.addEventListener('dblclick', (e) => {
      if (e.target.closest('.evt-card-body')){

        let elem = e.target.closest('.evt-card-wrapper');
        if (elem != null && elem.id != null)
        {
          document.querySelector('.evt-reader-body').innerHTML = '';
          for (let i = 0; i < event_container.length; i++) {
            if (elem.id == event_container[i].id){

              let el = event_container[i];
              let divs = EventorTemplate.wrapTextToHtmlView(el.content);
                let parentContainer = document.querySelector('.evt-reader-body'); // Replace 'parentContainer' with the actual ID or selector of your parent container
                for (let i = 0; i < divs.length; i++) {
                  const element = divs[i];
                  parentContainer.appendChild(element);
                }
                document.querySelector('.evt-reader-title').innerHTML = el.title;

  
              break;
            }
          }
        }

        UIkit.modal("#modal_eventReader").show();
      }
    })

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
    modalCloseButton.style.background = 'none';

    const modalExpandTextareaButton = document.createElement('button');
    modalExpandTextareaButton.classList.add('evt-textarea-toggle', 'uk-hidden');
    modalExpandTextareaButton.setAttribute('type', 'button');
    modalExpandTextareaButton.setAttribute('uk-icon', 'minus');
    modalExpandTextareaButton.style.background = 'none';
    modalExpandTextareaButton.id = 'evt_toggleTextarea';
  
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
    modalTitle.classList.add('evt-modal-header-title');
    modalTitle.textContent = 'Headline';
    modalTitle.id = 'evt_eventEditorTitle';
  
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

    const editButtonGroup = document.createElement('div');
    editButtonGroup.id = 'eventor_act_editgroup';


    
    const updateButton = document.createElement('button');
    updateButton.classList.add('uk-button', 'uk-button-primary');
    updateButton.id = 'eventor_act_updateEvent';
    updateButton.setAttribute('type', 'button');
    updateButton.textContent = 'Update';

    let dropdownMenu = document.createElement('div');
    dropdownMenu.setAttribute('uk-dropdown', '');

    let ukdrop = document.createElement('ul');
    ukdrop.classList.add('uk-nav');
    ukdrop.classList.add('uk-dropdown-nav');

    const lockButton = document.createElement('li');
    // lockButton.classList.add('uk-button', 'uk-button-danger');
    lockButton.id = 'eventor_act_lockEvent';
    // lockButton.setAttribute('type', 'button');
    lockButton.innerHTML = '<a>Lock</a>';

    const deleteButton = document.createElement('li');
    // deleteButton.classList.add('uk-button', 'uk-button-secondary');
    deleteButton.id = 'eventor_act_deleteEvent';
    // deleteButton.setAttribute('type', 'button');
    deleteButton.innerHTML = '<a>Delete</a>';

    ukdrop.appendChild(lockButton);
    ukdrop.appendChild(deleteButton);
    dropdownMenu.appendChild(ukdrop);

    let morebutton = document.createElement('button');
    morebutton.classList.add('uk-button');
    morebutton.classList.add('uk-button-default');
    morebutton.setAttribute('type', 'button');
    morebutton.innerHTML = "More...";
    

    // editButtonGroup.appendChild(lockButton);
    // editButtonGroup.appendChild(deleteButton);
    
    editButtonGroup.appendChild(morebutton);
    editButtonGroup.appendChild(dropdownMenu);
    editButtonGroup.appendChild(updateButton);
  
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
    modalFooter.appendChild(editButtonGroup);
    modalDialog.appendChild(modalCloseButtonInsideDialog);
    modalDialog.appendChild(modalHeader);
    modalDialog.appendChild(modalBody);
    modalDialog.appendChild(modalFooter);
    modalContainer.appendChild(modalExpandTextareaButton);
    modalContainer.appendChild(modalCloseButton);
    modalContainer.appendChild(modalDialog);
  
    let triggerFull = document.createElement('div');
    triggerFull.classList.add('evt-full-trigger');
    triggerFull.textContent = ' ';
    triggerFull.setAttribute("uk-icon", "icon: tablet");
    modalContainer.querySelector('#evt_content').parentElement.prepend(triggerFull);
    // Append the modal container to the body
    return modalContainer;
  }
  


  createFormField(labelText, id, name, type, options = [], defaultValue = '', hasLabel = true, hidden = false) {
    const divElement = document.createElement('div');
    divElement.classList.add('uk-margin-small');
    if (hidden){
      divElement.classList.add('uk-hidden');
    }
  
      const labelElement = document.createElement('label');
      labelElement.classList.add('uk-form-label');
      labelElement.setAttribute('for', id);
      labelElement.textContent = labelText;

  
    const formControls = document.createElement('div');
    formControls.classList.add('uk-form-controls');
  
    let inputElement;
  
    switch (type) {
      case 'text':
      case 'date':
        inputElement = document.createElement('input');
        inputElement.classList.add('uk-input');
        inputElement.setAttribute('type', type);
        inputElement.id = id;
        inputElement.name = name;
        inputElement.value = defaultValue;
        break;
      case 'textarea':
        inputElement = document.createElement('textarea');
        inputElement.classList.add('uk-textarea');
        inputElement.id = id;
        inputElement.name = name;
        inputElement.rows = '6';
        inputElement.textContent = defaultValue;
        break;
      case 'select':
        inputElement = document.createElement('select');
        inputElement.classList.add('uk-select');
        inputElement.id = id;
        inputElement.name = name;
  
        options.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option.value;
          optionElement.textContent = option.label;
          inputElement.appendChild(optionElement);
        });
  
        break;
      case 'checkbox':
        inputElement = document.createElement('input');
        inputElement.classList.add('uk-checkbox');
        inputElement.setAttribute('type', 'checkbox');
        inputElement.id = id;
        inputElement.name = name;
        inputElement.value = defaultValue;
        //labelElement.appendChild(inputElement);
        break;
      case 'range':
        inputElement = document.createElement('input');
        inputElement.classList.add('uk-range');
        inputElement.setAttribute('type', 'range');
        inputElement.setAttribute('min', '0');
        inputElement.setAttribute('max', '5');
        inputElement.setAttribute('step', '1');
        inputElement.id = id;
        inputElement.setAttribute('aria-label', 'Range');
        inputElement.name = name;
        inputElement.value = defaultValue;
        break;
      default:
        break;
    }
  
    if (type == 'checkbox'){
      labelElement.innerHTML = '';
      labelElement.classList.add('uk-form-label');
      let span = document.createElement('span');
      span.textContent = " " + labelText;

      labelElement.appendChild(inputElement);
      labelElement.appendChild(span);
      divElement.appendChild(labelElement);
    } else {
      formControls.appendChild(inputElement);
      divElement.appendChild(labelElement);
    }
    divElement.appendChild(formControls);
  
    return divElement;
  }


 

}








class SettingsModal
{
  constructor(){

  }


  get(){
    let result = `<div id="modal-full" class="uk-modal-full" uk-modal>
        <div class="uk-modal-dialog">
            <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
            <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
                <div class="uk-background-cover" style="background-image: url('images/photo.jpg');" uk-height-viewport></div>
                <div class="uk-padding-large">
                    <h1>Headline</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
    </div>`;

    return result;
  }
}