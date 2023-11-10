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
    this.fields.push(this.createFormField('Category:', 'evt_category', 'category', 'select', categorises));
    this.fields.push(this.createFormField('Access:', 'evt_access', 'access', 'select', access));
    this.fields.push(this.createFormField('Status:', 'evt_status', 'status', 'select', status));
    // this.fields.push(this.createFormField('Importance:', 'evt_importance', 'importance', 'range', [], '2'));
    this.fields.push(this.createFormField('Starred', 'evt_starred', 'starred', 'checkbox', [], '1', true));
    this.fields.push(this.createFormField('Pinned', 'evt_pinned', 'pinned', 'checkbox', [], '0', true));
    this.fields.push(this.createFormField('Locked', 'evt_locked', 'locked', 'checkbox', [], '0', true));
    this.fields.push(this.createFormField('Format:', 'evt_format', 'format', 'select', format, 0, true, true));
    this.fields.push(this.createFormField('Params:', 'evt_params', 'params', 'text', [], '', false, true));
    this.fields.push(this.createFormField('Type:', 'evt_type', 'params', 'number', [], 1, false, true));
    this.fields.push(this.createFormField('Section:', 'evt_section', 'section', 'select', options));
    this.fields.push(this.createFormField('Set Date:', 'evt_setdate', 'setdate', 'date'));
    
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
      if (e.target.closest('.evt-full-trigger') || e.target.id == 'evt_toggleTextarea' || e.target.parentElement != null && e.target.parentElement.id == 'evt_toggleTextarea'){
        document.querySelector('#evt_content').classList.toggle('evt-input-fullscreen');
        document.querySelector('.evt-full-trigger').classList.toggle('evt-full-trigger-fullscreen');
        document.querySelector("#modalHtmlEditor").querySelector('.uk-modal-close-full').classList.toggle('uk-hidden');
        document.querySelector("#modalHtmlEditor").querySelector('.evt-textarea-toggle').classList.toggle('uk-hidden');
      }

      if (e.target.closest('.evt-mod-typetrig')){
        let item = e.target.closest('.evt-mod-typetrig');
        let itms = document.querySelector('#evt_trigCreateButtons').querySelectorAll('.evt-mod-typetrig');
        for (let i = 0; i < itms.length; i++) {
          itms[i].classList.remove('active');
          
        }
        item.classList.add('active');
        let type = item.getAttribute('data-type');
        document.querySelector('#evt_type').value = type;
      }
    });

    document.body.addEventListener('dblclick', (e) => {
      if (e.target.closest('.evt-card-body')){
        e.preventDefault();
        let elem = e.target.closest('.evt-card-wrapper');
        let searchPrefix = "sr_";
          if (elem != null && elem.id != null)
          {
            if (!elem.id.startsWith(searchPrefix)){
              // ordinary card
              let modal = document.querySelector('#modal_eventReader');
              modal.querySelector('.evt-reader-body').innerHTML = '';
              for (let i = 0; i < event_container.length; i++) {
                if (elem.id == event_container[i].id){
    
                  let el = event_container[i];
                  let divs = EventorTemplate.wrapTextToHtmlView(el.content);
                    let parentContainer = modal.querySelector('.evt-reader-body'); // Replace 'parentContainer' with the actual ID or selector of your parent container
                    for (let i = 0; i < divs.length; i++) {
                      const element = divs[i];
                      parentContainer.appendChild(element);
                    }
                    modal.querySelector('.evt-reader-title').innerHTML = el.title;
                  break;
                }
              }
              UIkit.modal("#modal_eventReader").show();
              EventorFlow.clearFounders();
            } else {
              // search card
              let modal = document.querySelector('#modal_searchReader');
              modal.querySelector('.evt-reader-body').innerHTML = '';
              let natId = (elem.id).substring(searchPrefix.length);
              console.log('natId :>> ', natId);
              UIkit.modal("#modal_searchReader").show();
              for (let i = 0; i < EventorSearch.loadedEvents.length; i++) {
                if (natId == EventorSearch.loadedEvents[i].id){
                  let el = EventorSearch.loadedEvents[i];
                  
                  const regex = new RegExp(EventorSearch.searchWord, 'gi');
                  el.content = el.content.replace(regex, `<span class='evt-found'>$&</span>`);

                  let divs = EventorTemplate.wrapTextToHtmlView(el.content);

                    let parentContainer = modal.querySelector('.evt-reader-body'); // Replace 'parentContainer' with the actual ID or selector of your parent container
                    for (let i = 0; i < divs.length; i++) {
                      const element = divs[i];
                      parentContainer.appendChild(element);
                    }
                    modal.querySelector('.evt-reader-title').innerHTML = el.title;
                  break;
                }
              }
            }



          }




        
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
  
    // Type trigButtons
    let typeTrigs = document.createElement('div');
    typeTrigs.id = 'evt_trigCreateButtons';
    typeTrigs.classList.add('evt-modal-type_triggers');
    
    // let bt1 = document.createElement('div');
    // bt1.id = '';
    // bt1.classList.add('evt-mod-typetrig', 'evt-event-color', 'active');
    // bt1.setAttribute('data-type', '1');
    // bt1.innerHTML = "Event";
    // typeTrigs.appendChild(bt1);
    
    // let bt2 = document.createElement('div');
    // bt2.id = '';
    // bt2.classList.add('evt-mod-typetrig', 'evt-action-color');
    // bt2.setAttribute('data-type', '2');
    // bt2.innerHTML = "Action";
    // typeTrigs.appendChild(bt2);

    // let bt3 = document.createElement('div');
    // bt3.id = '';
    // bt3.classList.add('evt-mod-typetrig', 'evt-note-color');
    // bt3.setAttribute('data-type', '3');
    // bt3.innerHTML = "Note";
    // typeTrigs.appendChild(bt3);
    
    for (let i = 0 ; i < EventorTypes.DataTypes.length; i++){
      let item = EventorTypes.DataTypes[i];
      if (item.state == 1){
        let block = document.createElement('div');
        block.id = '';
        block.classList.add('evt-mod-typetrig', item.class);
        if (i == 0){
          block.classList.add('active');
        }
        
        block.setAttribute('data-type', item.value);
        block.innerHTML = item.name;
        typeTrigs.appendChild(block);
      }
    }

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
    // for (let i = 0 ; i < elements.length; i++)
    // {
    //   modalForm.appendChild(elements[i]);
    // }
    modalForm.appendChild(elements[0]);
    modalForm.appendChild(elements[1]);
    modalForm.appendChild(elements[2]);

    let diver = document.createElement('div');
    diver.classList.add('uk-column-1-2@s','uk-column-1-2@m');
    diver.appendChild(elements[3]);
    diver.appendChild(elements[4]);
    modalForm.appendChild(diver);
    
    let diver1 = document.createElement('div');
    diver1.classList.add('uk-column-1-2@s','uk-column-1-4@m');
    diver1.appendChild(elements[5]);
    diver1.appendChild(elements[6]);
    diver1.appendChild(elements[7]);
    modalForm.appendChild(diver1);
    
    modalForm.appendChild(document.createElement('br'));
    let diver2 = document.createElement('div');
    diver2.classList.add('uk-column-1-1@s','uk-column-1-2@m');
    diver2.appendChild(elements[11]);
    diver2.appendChild(elements[12]);
    diver2.appendChild(elements[8]);
    diver2.appendChild(elements[9]);
    diver2.appendChild(elements[10]);
    modalForm.appendChild(diver2);

   // modalForm.appendChild(/* Add your form fields and elements here */);
    modalBody.appendChild(modalForm);
    modalFooter.appendChild(cancelButton);
    modalFooter.appendChild(saveButton);
    modalFooter.appendChild(editButtonGroup);
    modalDialog.appendChild(modalCloseButtonInsideDialog);
    modalDialog.appendChild(modalHeader);
    modalDialog.appendChild(typeTrigs);
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
      case 'number':
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
        inputElement.classList.add('addmathevaluate');
        inputElement.id = id;
        inputElement.name = name;
        inputElement.rows = '10';
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
                <div class="uk-background-cover" style="" uk-height-viewport></div>
                <div class="uk-padding-large">
                    <h1>Eventor Laravel extension</h1>
                    <p>You can download microservice here: <a href='https://github.com/Vsemhoy/starter_microservice_php'>https://github.com/Vsemhoy/starter_microservice_php</a></p>
                    <p>And download extension with laravel here: <a href='https://github.com/Vsemhoy/okkio'>https://github.com/Vsemhoy/okkio</a></p>
                    <h5>Version 0.8 by 01 October 2023</h5>
                </div>
            </div>
        </div>
    </div>`;

    return result;
  }
}