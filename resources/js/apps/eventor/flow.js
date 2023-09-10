class EventorFlow {
    static updatedItem = null;

    static loadedSections = {};
    static dayFlow = null;
    constructor(selector) {
        // { 'date' => [ 'afklsjdklfjas', 'jdlfkajsdf' ]}
        let cursect = EventorUtils.getParam('sect');
        if (cursect == null){
            activeSection = 'all';
        } else {
            activeSection = cursect.trim();
        }


        this.pool = document.querySelector(selector);
        EventorFlow.dayFlow = new DayFlow(selector);
        


        document.addEventListener("dblclick", function (e) {
            if (e.target.closest(".event-section") && !e.target.closest(".event-card")) {
                e.preventDefault();
                let date = e.target.parentElement.parentElement.getAttribute('data-date');
                if (date == null){
                    date = e.target.closest('.event-section').getAttribute('data-date');
                }
                let data  = EventorFlow.harvestModalData();
                if (activeSection != 'all'){
                    data.section = activeSection;
                };
                data.setdate = date;
                data.title = "";
                data.content = "";
                data.access = 1;
                data.status = 1;
                UIkit.modal("#modalHtmlEditor").show();
                let cook = EventorUtils.getCookie('eventorEventDraft');
                if (cook != null && cook != '' && cook != false ){
                    let daco = JSON.parse(cook);
                    if (daco != null){
                        data = daco;
                    }
                }

                EventorFlow.fillFormWithData(data);
                document.querySelector('#evt_title').focus();
                document.querySelector('#evt_eventEditorTitle').innerHTML = "Create new event";
                document.querySelector('#eventor_act_editgroup').classList.add('uk-hidden');
                document.querySelector('#eventor_act_saveEvent').classList.remove('uk-hidden');

            }
        });

        document
            .querySelector("#eventor_act_saveEvent")
            .addEventListener("click", () => {
                
                this.saveEvent("");
                UIkit.modal("#modalHtmlEditor").hide();
            });

            document
            .querySelector("#eventor_act_updateEvent")
            .addEventListener("click", () => {
                this.saveEvent(EventorFlow.updatedItem.id);
                UIkit.modal("#modalHtmlEditor").hide();
            });

            document
            .querySelector("#eventor_act_deleteEvent")
            .addEventListener("click", () => {
                this.deleteEvent(EventorFlow.updatedItem.id);
                UIkit.modal("#modalHtmlEditor").hide();
            });

        document.querySelector("#callCreateModal").addEventListener("click", function (e) {
            const dateInput = document.querySelector("#evt_setdate");
            EventorUtils.getLocation();
            let date = e.target.parentElement.parentElement.getAttribute('data-date');
            let data  = EventorFlow.harvestModalData();
            data.setdate = EventorUtils.getCurrentDateAsString();
            if (activeSection != 'all'){
                data.section = activeSection;
            };
            data.title = "";
            data.content = "";
            data.access = 1;
            data.status = 1;
            EventorFlow.fillFormWithData(data);
            document.querySelector('#evt_eventEditorTitle').innerHTML = "Create new event";
            document.querySelector('#eventor_act_editgroup').classList.add('uk-hidden');
            document.querySelector('#eventor_act_saveEvent').classList.remove('uk-hidden');
            document.querySelector('#evt_title').focus();
        });


        document.addEventListener("click", function (e) {
            if (e.target.classList.contains("evt-edit-button")) {
                e.preventDefault();
                document.querySelector('#eventor_act_editgroup').classList.remove('uk-hidden');
                document.querySelector('#eventor_act_saveEvent').classList.add('uk-hidden');
                let element = e.target.closest('.evt-card-wrapper');
                // get object from array
                for (let i = 0; i < event_container.length; i++){
                    let el = event_container[i];
                    if (el.id == element.id){
                        EventorFlow.fillFormWithData(el);
                        document.querySelector('#evt_eventEditorTitle').innerHTML = "Edit event";
                        UIkit.modal("#modalHtmlEditor").show();
                        document.querySelector('#evt_title').focus();
                        EventorFlow.updatedItem = el;
                        break;
                    }
                }
            }
        });


        if (me != ""){
            this.loadSectionsAndCategories();

            let callParamsArray = [];
            for (let i = 0; i < DayFlow.dateArray.length; i++) {
              //console.log(eventor.dateArray[i]);
              callParamsArray.push( [DayFlow.dateArray[i], activeSection]);
            };
            EventorFlow.loadEvents(callParamsArray);
            EventorFlow.dayFlow.onMoved(this.reloadSectionEvents);
        };

        let sects = document.querySelector('#evt_section');
        sects.addEventListener('change', (e) => {
           EventorFlow.refreshCategoriesAndSections(sects.value); 
        });
    }




    static harvestModalData() {
        const myObject = {
            title: document.querySelector('#evt_title').value,
            content: document.querySelector('#evt_content').value,
            format: parseInt(document.querySelector('#evt_format').value),
            section: document.querySelector('#evt_section').value,
            category: document.querySelector('#evt_category').value,
            locked: document.querySelector('#evt_locked').checked ? 1 : 0,
            access: document.querySelector('#evt_access').value,
            status: document.querySelector('#evt_status').value,
            starred: document.querySelector('#evt_starred').checked ? 1 : 0,
            pinned: document.querySelector('#evt_pinned').checked ? 1 : 0,
            setdate: document.querySelector('#evt_setdate').value,
            importance: document.querySelector('#evt_importance').value,
        };
        return myObject;
    }

    static fillFormWithData(data) {
        EventorFlow.refreshCategoriesAndSections(data.section);
        document.querySelector('#evt_title').value = new DOMParser().parseFromString( data.title, 'text/html').body.textContent;
        document.querySelector('#evt_content').value = new DOMParser().parseFromString( data.content, 'text/html').body.textContent;
        document.querySelector('#evt_format').value = data.format.toString();
        document.querySelector('#evt_section').value = data.section;
        document.querySelector('#evt_category').value = data.category;
        document.querySelector('#evt_locked').checked = data.locked === 1;
        document.querySelector('#evt_access').value = data.access;
        document.querySelector('#evt_status').value = data.status;
        document.querySelector('#evt_starred').checked = data.starred === 1;
        document.querySelector('#evt_pinned').checked = data.pinned === 1;
        document.querySelector('#evt_setdate').value = data.setdate;
        document.querySelector('#evt_importance').value = data.importance;
    }


    saveEvent(event_id = "") {
        let counter = 0;
        let outFormat = "number";
        let data = {};
        let formdata = EventorFlow.harvestModalData();
        if (event_id == ""){
            formdata.trans_id = (Math.random() + 1).toString(36).substring(15);
            EventorUtils.setCookie('eventorEventDraft', JSON.stringify(formdata));
        } else {
            formdata.id = event_id;
        }
        if (formdata.title.length == 0 && formdata.content.length == 0) {
            alert("Empty form!");
            return;
        } else {
            formdata.id = event_id;
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    alert("You are not registered!");
                    return 0;
                };
                //console.log(this.responseText);
                //console.log(JSON.parse(this.responseText));
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Event") {
                        //console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                            if (event_id == ""){
                                event_container.push(item2);
                                EventorUtils.setCookie('eventorEventDraft', '', 1);
                            } else {
                                // for (let i = 0; i < event_container.length ; i++){
                                //     if (event_container[i].id == event_id){
                                //         event_container[i].id = item2;
                                //         break;
                                //     }
                                // }
                                let card = document.querySelector('#' + event_id.replace('.', `\\.`));
                                //console.log(card);
                                if (card != null){
                                    card.remove();
                                }

                                for (let i = 0; i < event_container.length; i++){
                                    let el = event_container[i];
                                    if (el.id == event_id){
                                        event_container.splice(i);
                                        break;
                                    }
                                }
                                event_container.push(item2);
                            }
                        });

                    };
                });
                EventorFlow.refreshEvents();

                // let result = JSON.parse(this.responseText);
                // console.log('рудзукы updated ' + this.responseText);
            }
            else if (this.status > 200) {
                if (counter < 1) {
                    alert("Oops! There is some problems with the server connection, or you are not logged in.");

                    counter++;
                }
            }
        };
        xhttp.open("POST", "/eventor/postcall", false);
        // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);

        //alert(JSON.stringify(data));

        const where = {
            column: "user",
            value: me,
        };

        let taskArray = [];
        let task = EventorTypes.GetNewTask();
        task.objects.push(formdata);
        task.user = me;
        if (event_id == ""){
            task.action = 3;

        } else {
            task.action = 5;
        }
        task.type = "event";
        task.where.push(where);
        taskArray.push(task);
        xhttp.send(JSON.stringify(taskArray));
    }



   reloadSectionEvents()
   {
    let sectionid = this.activeSection;
    console.log('command :>> ', 'reloadSectionEvents');
        // check if there not events in the array for this section
        let loadArray = [];
        if (activeSection != 'all'){
            for (let i = 0; i < DayFlow.dateArray.length; i++) {
                let cdate =  DayFlow.dateArray[i].getShortDate();
                console.log(cdate);
                if (EventorFlow.loadedSections[cdate] != null){
                    console.log('not null cdate');

                    if (!EventorFlow.loadedSections[cdate].includes(sectionid)){
                        EventorFlow.loadedSections[cdate].push(sectionid);
                        loadArray.push([DayFlow.dateArray[i], sectionid]);
                        EventorFlow.refreshEvents();
                        console.log('section when try' , activeSection);
                    } else {
                        console.log('includes');
                        
                        EventorFlow.refreshEvents();
                    }
                } else {
                    // EventorFlow.loadedSections[cdate] = [];
                    // EventorFlow.loadedSections[cdate].push(sectionid);
                    console.log('NO DATE IN THE ARRAY');
                };
            };
            if (loadArray.length){
                EventorFlow.loadEvents(loadArray);
            }


        } else {
            let loadArray = [];
            for (let i = 0; i < section_container.length; i++) {
                const targetSection = section_container[i].id;
                for (let i = 0; i < DayFlow.dateArray.length; i++) {
                    let cdate =  DayFlow.dateArray[i].getShortDate();
                    if (EventorFlow.loadedSections[cdate] != null){
                        if (!EventorFlow.loadedSections[cdate].includes(targetSection)){
                            // EventorFlow.loadedSections[cdate].push(targetSection);
                            // if (!sectionsToLoad.includes(targetSection)){
                            //     sectionsToLoad.push(targetSection);
                            // }
                            loadArray.push([DayFlow.dateArray[i], targetSection]);
                        } 
                    } else {
                        loadArray.push([DayFlow.dateArray[i], targetSection]);
                    }
                };
            }
            // for (let io = 0; io < sectionsToLoad.length; io++) {
            //     const secid = sectionsToLoad[io];
            //     //this.loadEvents(EventorUtils.getFirstDayOfMonth(startDate), EventorUtils.getLastDayOfMonth(endDate), secid);
                
            // }
            if (loadArray.length){
                EventorFlow.loadEvents(loadArray);
            }
            
            
        }
        
        EventorFlow.refreshEvents();

        // load it

   }



    static refreshCategoriesAndSections(section) {
        console.log('command :>> ', 'refreshCategoriesAndSections');
        const cats = document.querySelector('#evt_category');
        const sects = document.querySelector('#evt_section');
        cats.innerHTML = "";
        sects.innerHTML = "";
        const optionElement0 = document.createElement('option');
        optionElement0.value = "";
        optionElement0.textContent = "no category";
        cats.appendChild(optionElement0);

        let counter = 0;
        let selected = false;
        Array.from(section_container).forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.title;
            if (section == option.id){
                optionElement.setAttribute('selected', 'selected');
                selected = true;
            }
            sects.appendChild(optionElement);
            counter++;
        });
        const optionElement2 = document.createElement('option');
        optionElement2.value = "";
        optionElement2.textContent = "no section";
        sects.appendChild(optionElement2);
        if (selected == false){
            sects.selectedIndex = counter;
        }

        let strcats = '';
        if (section != null && section != ''){
            for (let i = 0; i < section_container.length; i++) {
                const element = section_container[i];
                if (element.id == section){
                    strcats = element.categories;
                    break;
                }
            }
        }
        let catar = strcats.split(',');
        console.log('catar :>> ', catar);
        Array.from(category_container).forEach((option) => {
            if (catar.includes(option.id) || section == "" || section == 'all'){
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.title;
                cats.appendChild(optionElement);
            };
        });

        cats.selectedIndex = 0;
    }


    loadSectionsAndCategories() {
        console.log('command :>> ', 'loadSectionsAndCategories');
        let cursect = EventorUtils.getParam('sect');
        if (cursect == null){
            activeSection = 'all';
        } else {
            activeSection = cursect.trim();
            console.log("YEP2", activeSection);
        }
        let counter = 0;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    console.log("You are not registered!");
                    return 0;
                };
                //console.log(this.responseText);
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Section") {
                        //console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                            section_container.push(item2);

                            if (activeSection == 'all'){
                                console.log('cursect :>> ', activeSection);
                                for (let i = 0; i < DayFlow.dateArray.length; i++) {
                                    let cdate =  DayFlow.dateArray[i].getShortDate();
                                    if (EventorFlow.loadedSections[cdate] != null){
                                        EventorFlow.loadedSections[cdate].push(item2.id);
                                    } else {
                                        EventorFlow.loadedSections[cdate] = [];
                                        EventorFlow.loadedSections[cdate].push(item2.id);
                                    };
                                  };
                            };
                              

                        });

                    } else if (item.type == "Category") {
                        //console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                            category_container.push(item2);
                        });
                    }
                });
                EventorFlow.refreshCategoriesAndSections();
                console.log(EventorFlow.loadedSections);
                // let result = JSON.parse(this.responseText);
            }
            else if (this.status > 200) {
                if (counter < 1) {
                    if (me == ""){
                        return;
                    };
                    console.log("Oops! There is some problems with the server connection.");
                    //console.log(this.responseText);
                    counter++;
                }
            }
        };
        xhttp.open("POST", "/eventor/postcall", false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
        const where = {
            column: "user",
            value: me,
        };

        let taskArray = [];

        let task = EventorTypes.GetNewTask();
        task.user = me;
        task.action = 1;
        task.type = "section";
        task.order = "ordered ASC";
        task.where.push(where);
        taskArray.push(task);

        let task2 = EventorTypes.GetNewTask();
        task2.user = me;
        task2.action = 1;
        task2.type = "category";
        task2.order = "ordered ASC";
        task2.where.push(where);
        taskArray.push(task2);

        xhttp.send(JSON.stringify(taskArray));
    }



    static refreshEvents() {
        console.log('command :>> ', 'refreshEvents');
        let arsenal = document.querySelectorAll('.evt-card-wrapper');
        for (let ind = arsenal.length - 1; ind >= 0; ind--) {
            const element = arsenal[ind];
            element.remove();
        }

        Array.from(event_container).forEach((event) => {
            if (activeSection == 'all' || event.section == activeSection){
                //console.log(event.setdate);
                // if (document.querySelector('#' + event.id) != null){
                //     document.querySelector('#' + event.id).remove();
                // }
                let rid = "row_" + event.setdate;

                let row = document.querySelector('#' + rid);
                if (row != null) {
                    let erc = row.querySelector('.eventor-row-content');
                    //let card = EventorTemplate.createEventCard(event.title, event.setdate, event.category, event.content);
                    let card = EventorTemplate.makeEventCard(event);
                    erc.insertAdjacentHTML('beforeend', card);
                    //erc.appendChild(card);
                }
                
                //console.log(rid);
            }

        });
    }

    static clearAllCardBodyFromChart(){
        let cards = document.querySelectorAll(".evt-card-wrapper");
        for (let i = 0; i < cards.length; i++) {
          const element = cards[i].remove();
        }
        Array.from(event_container).forEach((event) => {
            event.loaded = false;
        });
      }


    static loadEvents(callArray) {
        console.log('command :>> ', 'loadEvents');
        console.log('Called section' , activeSection);
        let counter = 0;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    console.log("You are not registered!");
                    return 0;
                };
                //console.log(this.responseText);
                //console.log(JSON.parse(this.responseText));
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Event") {
                        // console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                            let exists = false;
                            let newId = item2.id;
                            for (let i = 0; i < event_container.length; i++) {
                                const element = event_container[i];
                                if (element.id == newId){
                                    exists = true;
                                    break;
                                }
                            }
                            if (exists == false){
                                event_container.push(item2);
                            }

                            
                                for (let i = 0; i < DayFlow.dateArray.length; i++) {
                                    let cdate =  DayFlow.dateArray[i].getShortDate();
                                    if (EventorFlow.loadedSections[cdate] != null){
                                        if (!EventorFlow.loadedSections[cdate].includes(item2.section)){
                                            EventorFlow.loadedSections[cdate].push(item2.section);
                                        };
                                    } else {
                                        EventorFlow.loadedSections[cdate] = [];
                                        EventorFlow.loadedSections[cdate].push(item2.section);
                                    };
                                };
                     

                        });

                    };
                });
                EventorFlow.refreshEvents();

            }
            else if (this.status > 200) {
                if (counter < 1) {
                    if (me == ""){
                        return;
                    };
                    console.log("Oops! There is some problems with the server connection.");
                    //console.log(this.responseText);
                    counter++;
                }
            }
        };
        xhttp.open("POST", "/eventor/postcall", false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);

        // console.log(datePast);
        // console.log(dateFuture);
        // console.log(EventorUtils.getSimpleDate(datePast, true));
        // console.log(EventorUtils.getSimpleDate(dateFuture, true));
        let taskArray = [];
        
        for (let ind = 0; ind < callArray.length; ind++) {
            const element = callArray[ind];
            let shortdate = element[0];
            let section = element[1];

            let task = EventorTypes.GetNewTask();
            task.user = me;
            task.action = 1;
            task.type = "event";
            const where = {
                column: "user",
                value: me,
            };
            task.where.push(where);
            const where2 = {
                column: "setdate",
                value: EventorUtils.getSimpleDate(shortdate.getFirstDate(true), true),
                operator: "BETWEEN",
                value2: EventorUtils.getSimpleDate(shortdate.getLastDate(true), true),
            };
            task.where.push(where2);
            if (section != undefined && section != 'all' && section != ''){
                const where3 = {
                    column: "section",
                    value: section,
                };
                task.where.push(where3);
                console.log('WHERE SECTION: ', section);
            }
            console.log(task);
            taskArray.push(task);
        }


        xhttp.send(JSON.stringify(taskArray));
        //console.log(JSON.stringify(taskArray));
    }


    deleteEvent(event_id = "") {
        let counter = 0;
        let formdata = EventorFlow.harvestModalData();
        if (event_id == ""){
            alert("OOPS! There is no event selected!");
            return;
        }
        formdata.id = event_id;


        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    alert("You are not registered!");
                    return 0;
                };
                //console.log(this.responseText);
                //console.log(JSON.parse(this.responseText));
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Event") {
                        //console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                            if (event_id == ""){
                                event_container.push(item2);
                            } else {
                                // for (let i = 0; i < event_container.length ; i++){
                                //     if (event_container[i].id == event_id){
                                //         event_container[i].id = item2;
                                //         break;
                                //     }
                                // }
                                let card = document.querySelector('#' + event_id.replace('.', `\\.`));
                               // console.log(card);
                                if (card != null){
                                    card.remove();
                                }

                                for (let i = 0; i < event_container.length; i++){
                                    let el = event_container[i];
                                    if (el.id == event_id){
                                        event_container.splice(i);
                                        break;
                                    }
                                }
                            }
                        });

                    };
                });
                //EventorFlow.refreshEvents();

                // let result = JSON.parse(this.responseText);
                // console.log('рудзукы updated ' + this.responseText);
            }
            else if (this.status > 200) {
                if (counter < 1) {
                    alert("Oops! There is some problems with the server connection.");

                    counter++;
                }
            }
        };
        xhttp.open("POST", "/eventor/postcall", false);
        // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);

        //alert(JSON.stringify(data));

        const where = {
            column: "user",
            value: me,
        };

        let taskArray = [];
        let task = EventorTypes.GetNewTask();
        task.objects.push(formdata);
        task.user = me;
        task.action = 7;
        task.type = "event";
        task.where.push(where);
        taskArray.push(task);
        xhttp.send(JSON.stringify(taskArray));
    }

}