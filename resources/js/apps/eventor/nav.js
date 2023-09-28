class EventorNav {

  static expendedRows = true;
  constructor()
  {
    this.mainMenuItemsContainer = document.querySelector('#th_sidenav_items');
    this.sectionNameBlock = document.querySelector('#evt_tool_sectionName');
    this.expendor = document.querySelector('#evt_expandRows');

    this.mainMenuItemsContainer.addEventListener('click', (e) => {
      //console.log(e.target.closest('.th-com-s-nav-item'));
      if (e.target.closest('.th-com-s-nav-item')){
        e.preventDefault();
        let section  = e.target.closest('.th-com-s-nav-item').getAttribute('data-section');
        if (EventorFlow.activeSection == section){ return;};
        let text  = e.target.closest('.th-com-s-nav-item').querySelector('.th-sn-item-text').innerHTML;
        this.sectionNameBlock.innerHTML = text;
        
        //alert(section);
        let prevExpended = EventorNav.expendedRows;
        if (EventorNav.expendedRows == false){
          EventorNav.expendAllRows();
        };
        EventorNav.recheckMenuItems(section);
        EventorUtils.changeAddressBar('sect', section);
        EventorFlow.clearAllCardBodyFromChart();
        EventorFlow.activeSection = section;
        console.log('section to load :>> ', section);
        eventor.reloadSectionEvents(section);
        if (prevExpended == false){
          EventorNav.shrinkAllRows();
        }
        if (DayFlow.dateArray.length ){
          let tod = document.getElementById("row_today");
          if (tod != null && me != ""){
            tod.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
          };
      };
      EventorFlow.clearFounders();
      }
    });

    let cursect = EventorUtils.getParam('sect');
    if (cursect == null){
      cursect = 'all';
    }
    EventorNav.recheckMenuItems(cursect);

    for (let i = 0; i < section_container.length; i++) {
      const element = section_container[i];
      if (element.id == EventorFlow.activeSection){
        document.querySelector('#evt_tool_sectionName').innerHTML = element.title;
        break;
      }
      
    }

    this.expendor.addEventListener('click', (e) => {
      

      if (EventorNav.expendedRows == true){
        EventorNav.shrinkAllRows();
        this.expendor.setAttribute('uk-icon', 'icon: expand');
        this.expendor.setAttribute('title', 'Expand rows');
        EventorNav.expendedRows = false;
      } else {
        this.expendor.setAttribute('uk-icon', 'icon: shrink');
        this.expendor.setAttribute('title', 'Shrink rows');
        EventorNav.expendAllRows();
        EventorNav.expendedRows = true;
      }
      EventorFlow.clearFounders();
    });


    const restrictors = document.querySelectorAll('.evt-restrictor');
    const toolbarDatemark = document.querySelector('.evt-toolbar-datemark');

    window.addEventListener('scroll', () => {
      restrictors.forEach(restrictor => {
        const rect = restrictor.getBoundingClientRect();
        if (rect.top <= 0) {
          const dataRestrictor = restrictor.getAttribute('data-restrictor');
          toolbarDatemark.textContent = dataRestrictor;
        }
      });
    });

  }

  static shrinkAllRows(){
    let evesec = document.querySelectorAll('.event-section');
    for (let i = 0; i < evesec.length; i++) {
      const element = evesec[i];
      let cards = element.querySelectorAll('.evt-card-wrapper');
      if (cards.length == 0){
        element.classList.add('uk-hidden');
      }
    }
    EventorNav.expendedRows = false;
  }

  static expendAllRows(){
    let evesec = document.querySelectorAll('.event-section');
    for (let i = 0; i < evesec.length; i++) {
      const element = evesec[i];
      element.classList.remove('uk-hidden');
    }
    EventorNav.expendedRows = true;
  }

  static recheckMenuItems(section = "")
  {
    let items  = document.querySelector('#th_sidenav_items').querySelectorAll('.th-com-s-nav-item');
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      element.classList.remove('th-active');
      if (element.getAttribute('data-section') == section){
        element.classList.add('th-active');
      }
    }
  }



    static navButtons(containerId = "", position = "") {
        let goBottom = "";
        if (position === "bottom") {
          goBottom = "#" + containerId;
        }
        let result = "";
        result += `<div class='uk-section uk-padding'><div class='uk-flex uk-flex-center'>
        <div class="uk-container" id="${containerId}">
        <div class="uk-button-group evt-navigation">`;
      
        result += `<a type="uk-button" class="uk-button uk-button-default" id="act_moveBottom">
        <span uk-icon="chevron-left"></span></a>`;
        result += `<a type="button" class="uk-button uk-button-default" id="act_expandBottom">
        <span uk-icon="chevron-double-left"></span>
        </a>`;
        result += `<button type="button" id="f_showEmptyRows" class="uk-button uk-button-default uk-hidden" title="HIDEEMPTY">
        <span uk-icon="more"></span>
        </button>`;
        result += `<button type="button" id="f_showTotalCols" class="uk-button uk-button-default uk-hidden" title="HIDETOTALS">
        <span uk-icon="more-vertical"></span>
        </button>`;
      
        result += `<button type="button" href="#modal-container" class="uk-button uk-button-default" uk-toggle title="Navigator">
        <span uk-icon="server"></span>
        </button>`;
        result += `<button type="button" onclick="tf_create(1, 0);" class="uk-button uk-button-default uk-hidden" title="NEWEVENT">
        <span uk-icon="file-text"></span>
        </button>`;
        result += `<a type="button" class="uk-button uk-button-default" id="act_expandTop">
        <span uk-icon="chevron-double-right"></span>
        </a>`;
        result += `<a type="button" class="uk-button uk-button-default" id="act_moveTop">
        <span uk-icon="chevron-right"></span>
        </a>`;
        result += `</div>
        </div>
        </div>
        </div>
        <br>`;
      
        return result;
      }


      static topTools() {
        // Create the main container div
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('flex-space', 'th-sticky-bottom-box');
        containerDiv.setAttribute('uk-sticky', 'position: top');
    
        // Create the first flex container
        const flexContainer1 = document.createElement('div');
        flexContainer1.style.display = 'flex';
        flexContainer1.style.alignItems = 'center';
        flexContainer1.style.gridGap = '8px';
    
        // Create the section name div
        const sectionNameDiv = document.createElement('div');
        sectionNameDiv.classList.add('evt-toolbar-sectionname');
        sectionNameDiv.id = 'evt_tool_sectionName';
        sectionNameDiv.title = 'Active section';
        sectionNameDiv.textContent = 'Section: All';
    
        // Create the date mark div
        const dateMarkDiv = document.createElement('div');
        dateMarkDiv.classList.add('evt-toolbar-datemark');
    
        // Append sectionNameDiv and dateMarkDiv to flexContainer1
        flexContainer1.appendChild(sectionNameDiv);
        flexContainer1.appendChild(dateMarkDiv);
    
        // Create the second flex container
        const flexContainer2 = document.createElement('div');
    
        // Create additional content for flexContainer2 if needed
    
        // Create the third flex container
        const flexContainer3 = document.createElement('div');
        flexContainer3.title = 'Create an event';
    
        // Create the "shrink rows" button
        const shrinkRowsButton = document.createElement('a');
        shrinkRowsButton.classList.add('uk-button');
        shrinkRowsButton.id = 'evt_expandRows';
        shrinkRowsButton.setAttribute('uk-icon', 'icon: shrink');
        shrinkRowsButton.title = 'shrink rows';
    
        // Create the "create event" button
        const createEventButton = document.createElement('a');
        createEventButton.classList.add('uk-button');
        createEventButton.id = 'callCreateModal';
        createEventButton.href = '#modalHtmlEditor';
        createEventButton.setAttribute('uk-toggle', '');
        createEventButton.setAttribute('aria-expanded', 'false');
        createEventButton.setAttribute('uk-icon', 'icon: plus');
    
        // Append shrinkRowsButton and createEventButton to flexContainer3
        flexContainer3.appendChild(shrinkRowsButton);
        flexContainer3.appendChild(createEventButton);
    
        // Append flexContainer1, flexContainer2, and flexContainer3 to the main container div
        containerDiv.appendChild(flexContainer1);
        containerDiv.appendChild(flexContainer2);
        containerDiv.appendChild(flexContainer3);
    
        return containerDiv;
    }



}