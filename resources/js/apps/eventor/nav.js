class EventorNav {

  static expendedRows = true;
  static activeTypes = [1,2,3];
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
        // console.log('section to load :>> ', section);
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
        let secName = 'All sections';
        for (let i = 0; i < section_container.length; i++) {
          const sc = section_container[i];
          if (sc.id == EventorFlow.activeSection){
            secName = sc.title;
            break;
          }
        }
        UIkit.notification({
          message: 'Active section: ' + secName,
          status: 'primary',
          pos: 'bottom-right',
          timeout: 3000
      });
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


    document.addEventListener('click', (e)=> {
      if (e.target.closest('.evt-stb-group')){
        let tg = e.target.closest('.evt-stb-group');
        e.preventDefault();
        if (!e.ctrlKey) {
        tg.classList.toggle('active');

        let tggroup = document.querySelectorAll('.evt-stb-group');
        let active = false;
        for (let i = 0; i < tggroup.length; i++) {
          const element = tggroup[i];
          if (element.classList.contains('active')){
            active = true;
            break;
          }
        }

        if (!active){
          tg.classList.toggle('active');
        } else {
          EventorNav.activeTypes = [];
          for (let i = 0; i < tggroup.length; i++) {
            const element = tggroup[i];
            if (element.classList.contains('active')){
              let ax = element.getAttribute('data-type');
              EventorNav.activeTypes.push(parseInt(ax));
            }
          }
          this.triggerTypeToggle();
          UIkit.notification({
            message: 'Type toggled!',
            status: 'success',
            pos: 'bottom-left',
            timeout: 3000
        });
        }
      } else {
        let oldTypes = JSON.stringify(EventorNav.activeTypes);
        let tggroup = document.querySelectorAll('.evt-stb-group');

        for (let i = 0; i < tggroup.length; i++) {
          const element = tggroup[i];
          element.classList.remove('active');
        };
        tg.classList.toggle('active');
        

          EventorNav.activeTypes = [];
          for (let i = 0; i < tggroup.length; i++) {
            const element = tggroup[i];
            if (element.classList.contains('active')){
              let ax = element.getAttribute('data-type');
              EventorNav.activeTypes.push(parseInt(ax));
            }
          }
          if (JSON.stringify(EventorNav.activeTypes.length) != oldTypes ){
            this.triggerTypeToggle();
            UIkit.notification({
              message: 'Type toggled!',
              status: 'success',
              pos: 'bottom-left',
              timeout: 3000
          });
          }
      }
      }
      
    });


  }


    /**
    * Trigger the move or expand event.
    */
    triggerTypeToggle() {
      if (typeof this.typeCallback === 'function') {
          this.typeCallback(EventorNav.activeTypes);
      }
  }

  /**
   *
   * @param {Function} callback - The callback function to be called when the user changed or expand calendar.
   */
  onTypeToggle(callback) {
      this.typeCallback = callback;
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

    
        // Create the "shrink rows" button
        const shrinkRowsButton = document.createElement('a');
        shrinkRowsButton.classList.add('uk-button', 'evt-stickybar-button');
        shrinkRowsButton.id = 'evt_expandRows';
        shrinkRowsButton.setAttribute('uk-icon', 'icon: shrink');
        shrinkRowsButton.title = 'shrink rows';
        flexContainer3.appendChild(shrinkRowsButton);
    
        // Create the "create event" button
        for (let i = 0 ; i < EventorTypes.DataTypes.length; i++){
          let item = EventorTypes.DataTypes[i];
          if (item.state == 1){
            const createEventButton = document.createElement('a');
            createEventButton.classList.add('uk-button', 'evt-stickybar-button', 'evt-stb-group', item.class);
            if (EventorNav.activeTypes.includes(1)){
              createEventButton.classList.add( 'active');
            }
            createEventButton.id = 'evt_toggle_' + item.name.toLowerCase() + 's';
            createEventButton.href = '#';
            createEventButton.setAttribute('aria-expanded', 'false');
            createEventButton.setAttribute('data-type', item.value);
            createEventButton.setAttribute('uk-icon', 'icon: ' + item.icon);
            createEventButton.setAttribute("uk-tooltip", "title: Toggle " + item.name + "; pos: bottom-right");
            flexContainer3.appendChild(createEventButton);
          }
        }


        // const createEventButton2 = document.createElement('a');
        // createEventButton2.classList.add('uk-button', 'evt-stickybar-button', 'evt-stb-group', 'evt-action-color');
        // if (EventorNav.activeTypes.includes(2)){
        //   createEventButton2.classList.add( 'active');
        // }
        // createEventButton2.id = 'evt_toggle_actions';
        // createEventButton2.href = '#';
        // createEventButton2.setAttribute('aria-expanded', 'false');
        // createEventButton2.setAttribute('data-type', '2');
        // createEventButton2.setAttribute('uk-icon', 'icon: crosshairs');
        // createEventButton2.setAttribute("uk-tooltip", "title: Toggle Actions; pos: bottom-right");
        // flexContainer3.appendChild(createEventButton2);

        // const createEventButton3 = document.createElement('a');
        // createEventButton3.classList.add('uk-button', 'evt-stickybar-button', 'evt-stb-group', 'evt-note-color');
        // if (EventorNav.activeTypes.includes(3)){
        //   createEventButton3.classList.add( 'active');
        // }
        // createEventButton3.id = 'evt_toggle_notes';
        // createEventButton3.href = '#';
        // createEventButton3.setAttribute('aria-expanded', 'false');
        // createEventButton3.setAttribute('data-type', '3');
        // createEventButton3.setAttribute('uk-icon', 'icon: pencil');
        // createEventButton3.setAttribute("uk-tooltip", "title: Toggle Notes; pos: bottom-right");
        // flexContainer3.appendChild(createEventButton3);
    
        // Append shrinkRowsButton and createEventButton to flexContainer3
    
        // Append flexContainer1, flexContainer2, and flexContainer3 to the main container div
        containerDiv.appendChild(flexContainer1);
        containerDiv.appendChild(flexContainer2);
        containerDiv.appendChild(flexContainer3);
    
        return containerDiv;
    }

    static RemoveItemById(sid){
      let items = document.querySelectorAll('.th-com-s-nav-item');
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        if (element.getAttribute('data-section') == sid){
          element.remove();
        }
      }
    }

    static buildMenu(){
      let getSection = EventorUtils.getParam('sect');
      let smenu = SidebarMenu.getNewMenu();
      let fitem = SidebarMenu.getNewItem();
      fitem.name  = "All sections";
      fitem.literals = "ALL";
      fitem.params = ["data-section", 'all'];
      if (getSection == null || getSection == ""){
          fitem.active = true;
        };
      smenu.items.push(fitem);

      for (let i = 0 ; i < section_container.length; i++){
        let sectim = section_container[i];
        if (sectim.status != 1){ continue; }
        let item = SidebarMenu.getNewItem();
        item.name = sectim.title;
        item.active = false;
        let litar = item.name.split(' ');
        if (litar.length == 2){
          var ltr = litar[0].slice(0,1).toUpperCase() + litar[1].slice(0,1).toUpperCase();
          item.literals = ltr;
        } else if (litar.lenght > 2){
          var ltr = litar[0].slice(0,1).toUpperCase() + litar[1].slice(0,1).toUpperCase()+ litar[2].slice(0,1).toUpperCase();
          item.literals = ltr;
        } else {
          var ltr = SidebarMenu.removeVowels(item.name);
          ltr = (ltr).slice(0,2).toUpperCase();
          item.literals = ltr;
        }
        item.params = ["data-section", sectim.id];
        item.color = sectim == null ? '' : sectim.color;

        if (sectim.id == getSection){
          item.active = true;
        };

        smenu.items.push(item);
        smenu.count++;
      }

      let setItem1 = SidebarMenu.getNewItem();
      setItem1.name  = "Sections";
      setItem1.ukicon = 'thumbnails';
      setItem1.id = "evt_openSectionManager";
      setItem1.ref='#modal_sectionManager';
      setItem1.linkSingleAttribute = "uk-toggle";
      smenu.setItems.push(setItem1);

      let setItem2 = SidebarMenu.getNewItem();
      setItem2.name  = "Categories";
      setItem2.ukicon = 'social';
      setItem2.id = "evt_openCategoryManager";
      setItem2.ref='#modal_categoryManager';
      setItem2.linkSingleAttribute = "uk-toggle";
      smenu.setItems.push(setItem2);

      let setItem3 = SidebarMenu.getNewItem();
      setItem3.name  = "Settings";
      setItem3.ukicon = 'settings';
      setItem3.id = "evt_openSetingsManager";
      setItem3.ref='#modal_settingsManager';
      setItem3.linkSingleAttribute = "uk-toggle";
      //smenu.setItems.push(setItem3);

      return smenu;
    }

}