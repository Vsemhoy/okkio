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
        let section  = e.target.closest('.th-com-s-nav-item').getAttribute('data-section');
        if (activeSection == section){ return;};
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
        activeSection = section;
        console.log('section to load :>> ', section);
        eventor.reloadSectionEvents(section);
        if (prevExpended == false){
          EventorNav.shrinkAllRows();
        }
      }
    });

    let cursect = EventorUtils.getParam('sect');
    if (cursect == null){
      cursect = 'all';
    }
    EventorNav.recheckMenuItems(cursect);

    for (let i = 0; i < section_container.length; i++) {
      const element = section_container[i];
      if (element.id == activeSection){
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
        let result = `
        <div class="flex-space th-sticky-bottom-box evt-tooltop" uk-sticky="position: top">
          <div class="evt-toolbar-sectionname" id='evt_tool_sectionName' title='Active section'>Section: All</div>
          <div class="uk-padding-remove">
            <div class="">
              
            </div> 
          </div>
          <div class="uk-padding-remove" title='Create an event'>
          <a class="uk-button" id='evt_expandRows' uk-icon="icon: shrink" title='shrink rows'></a>
            <a class="uk-button " id="callCreateModal" href="#modalHtmlEditor" uk-toggle="" aria-expanded="false" uk-icon="icon: plus"></a>
          </div>
        </div>
        `;
        return result;
      }



}