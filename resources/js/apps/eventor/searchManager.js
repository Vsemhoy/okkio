class EventorSearch
{
    static loadedEvents = [];
    static searchWord = '';
    constructor(selector)
    {
        this.window = document.querySelector('#' + selector);
        this.maintrigger = document.querySelector('#th_topSearch');
        if (this.maintrigger != null){
            this.maintrigger.addEventListener('click', (e)=>{
                this.text = document.querySelector('#th_searchArea').value;
                UIkit.modal(this.window).show();
                if (this.text.trim().length > 2){
                    this.search(this.text.trim());
                    EventorSearch.fillSearchBody(this.getAllParams());
                }
                document.querySelector('#evt_search_text').value = this.text;
                EventorSearch.fillSelectors(this.getAllParams());
                EventorSearch.searchWord = this.text.trim();
            });
        }
        
        this.searchTrig = document.querySelector('#evt_search_go');
        this.searchTrig.addEventListener('click', (e)=>{
            this.text = document.querySelector('#evt_search_text').value;
            if (this.text.trim().length > 2){
                this.search(this.text.trim());
                EventorSearch.fillSearchBody(this.getAllParams());
            }
            document.querySelector('#th_searchArea').value = this.text.trim();
            EventorSearch.fillSelectors(this.getAllParams());
            EventorSearch.searchWord = this.text.trim();
        });
        
        document.querySelector('#th_searchArea').addEventListener('keydown', (event) => {
            // Check if the pressed key is the "Enter" key (key code 13)
            if (event.keyCode === 13) {
                this.text = document.querySelector('#th_searchArea').value;
                UIkit.modal(this.window).show();
                if (this.text.trim().length > 2){
                    this.search(this.text.trim());
                    EventorSearch.fillSearchBody(this.getAllParams());
                }
            }
            document.querySelector('#evt_search_text').value = 
            this.text == null ? "" : this.text.trim();
            EventorSearch.fillSelectors(this.getAllParams());
            EventorSearch.searchWord =
            this.text == null ? "" : this.text.trim();
        });
        
        document.querySelector('#evt_search_text').addEventListener('keydown', (event) => {
            // Check if the pressed key is the "Enter" key (key code 13)
            if (event.keyCode === 13) {
                this.text = document.querySelector('#evt_search_text').value;
                if (this.text.trim().length > 2){
                    this.search(this.text.trim());
                    EventorSearch.fillSearchBody(this.getAllParams());
                }
                document.querySelector('#th_searchArea').value = this.text.trim();
                EventorSearch.fillSelectors(this.getAllParams());
                EventorSearch.searchWord = this.text.trim();
            }
        });

        document.querySelector('#evt_search_section').addEventListener('change', (e)=> {
            EventorSearch.fillSearchBody(this.getAllParams());
        });
        document.querySelector('#evt_search_group').addEventListener('change', (e)=> {
            EventorSearch.fillSearchBody(this.getAllParams());
        });
        document.querySelector('#evt_search_status').addEventListener('change', (e)=> {
            EventorSearch.fillSearchBody(this.getAllParams());
        });
        document.querySelector('#evt_search_access').addEventListener('change', (e)=> {
            EventorSearch.fillSearchBody(this.getAllParams());
        });

        EventorSearch.fillSelectors();
    }


    getAllParams() {
        let params = [];
    
        let section = document.querySelector('#evt_search_section').value;
        if (section.trim() !== '') {
            params.push({ param: 'section', value: section });
        }
    
        let category = document.querySelector('#evt_search_group').value;
        if (category.trim() !== '') {
            params.push({ param: 'category', value: category });
        }
    
        let status = document.querySelector('#evt_search_status').value;
        if (status.trim() !== '') {
            params.push({ param: 'status', value: status });
        }
    
        let access = document.querySelector('#evt_search_access').value;
        if (access.trim() !== '') {
            params.push({ param: 'access', value: access });
        }
        return params;
    }

    static fillSelectors(params = []){
        let sect = document.querySelector('#evt_search_section');
        let grop = document.querySelector('#evt_search_group');
        let stat = document.querySelector('#evt_search_status');
        let access = document.querySelector('#evt_search_access');
        sect.innerHTML = "";
        grop.innerHTML = "";
        stat.innerHTML = "";
        access.innerHTML = "";

        let option = document.createElement('option');
        option.setAttribute('value', '');
        option.textContent = "No use";

        sect.appendChild(option.cloneNode(true));
        grop.appendChild(option.cloneNode(true));
        stat.appendChild(option.cloneNode(true));
        access.appendChild(option.cloneNode(true));
        
        for (let i = 0; i < section_container.length; i++) {
            const element = section_container[i];
            let option2 = document.createElement('option');
            option2.setAttribute('value', element.id);
            option2.textContent = element.title;
            option2.style.backgroundColor = "#ddd";
            for (let i = 0; i < EventorSearch.loadedEvents.length; i++) {
                const element2 = EventorSearch.loadedEvents[i];
                if (element2.section == element.id){
                    option2.style.backgroundColor = "#fff";
                    break;
                }
            }
            sect.appendChild(option2);
        }

        for (let i = 0; i < category_container.length; i++) {
            const element = category_container[i];
            let option2 = document.createElement('option');
            option2.setAttribute('value', element.id);
            option2.textContent = element.title;
            option2.style.backgroundColor = "#ddd";
            for (let i = 0; i < EventorSearch.loadedEvents.length; i++) {
                const element2 = EventorSearch.loadedEvents[i];
                if (element2.category == element.id){
                    option2.style.backgroundColor = "#fff";
                    break;
                }
            }
            grop.appendChild(option2);
        }

        let acc = EventorTypes.getAccess(3);
        for (let i = 0; i < acc.length; i++) {
            const element = acc[i];
            let option2 = document.createElement('option');
            option2.setAttribute('value', element.value);
            option2.textContent = element.label;
            option2.style.backgroundColor = "#ddd";
            for (let i = 0; i < EventorSearch.loadedEvents.length; i++) {
                const element2 = EventorSearch.loadedEvents[i];
                if (element2.access == element.value){
                    option2.style.backgroundColor = "#fff";
                    break;
                }
            }
            access.appendChild(option2);
        }

        let stats = EventorTypes.getStatus();
        for (let i = 0; i < stats.length; i++) {
            const element = stats[i];
            let option2 = document.createElement('option');
            option2.setAttribute('value', element.value);
            option2.textContent = element.label;
            option2.style.backgroundColor = "#ddd";
            for (let i = 0; i < EventorSearch.loadedEvents.length; i++) {
                const element2 = EventorSearch.loadedEvents[i];
                if (element2.status == element.value){
                    option2.style.backgroundColor = "#fff";
                    break;
                }
            }
            stat.appendChild(option2);
        }

        params.forEach(element => {
            if (element.param == 'section'){
                sect.value = element.value;
            };
            if (element.param == 'category'){
                grop.value = element.value;
            };
            if (element.param == 'status'){
                stat.value = element.value;
            };
            if (element.param == 'access'){
                access.value = element.value;
            };
        });
    }

    static async fillSearchBody(params = []){
        console.log('params :>> ', params);
        let container = document.querySelector('#eventor_search_content');
        container.classList.add('evt-lazy-load');
        container.innerHTML = "";
        let delay = 0;
        let array = [];
        for (let i = 0; i < EventorSearch.loadedEvents.length; i++) {
            const element = EventorSearch.loadedEvents[i];
    
            let matchesAllParams = true;
    
            for (let j = 0; j < params.length; j++) {
                const { param, value } = params[j];
    
                if (param !== '' && element[param] !== null && element[param] != value) {
                    // If any parameter doesn't match, set matchesAllParams to false
                    matchesAllParams = false;
                    break;
                }
            }
    
            if (matchesAllParams) {
                array.push(element);
            }
        }
        let setdate = '';

        if (array.length == 0){
            let param = document.createElement('p');
            param.classList.add('uk-label-warning');
            param.classList.add('uk-padding-small');
            param.innerHTML = "There is no one items found...";
            container.appendChild(param);
        } else {
            let param = document.createElement('p');
            param.classList.add('uk-label-success');
            param.classList.add('uk-padding-small');
            param.innerHTML = "Found " + array.length + " items:";
            container.appendChild(param);
        }
        
        array.forEach((event) => {
            setTimeout(() => {
                if (event.setdate != setdate)
                {
                    let sepiq = EventorTemplate.makeEventSearchSeparator(event.setdate);
                    container.insertAdjacentHTML('beforeend', sepiq);
                }
                if (setdate == ''){ setdate = event.setdate;};
                let card = EventorTemplate.makeEventSearchCard(event, EventorSearch.searchWord);
                container.insertAdjacentHTML('beforeend', card);
                setdate = event.setdate;
            }, delay);
            
            delay += 150;
        });
        setTimeout(() => {
            
            container.classList.remove('evt-lazy-load');
        }, delay);
    }


    search(text, 
        section = '',
        category = '',
        access = '', 
        share = '' )
        {
            console.log('command :>> ', 'loadEvents');
            let counter = 0;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == -1) {
                        console.log("You are not registered!");
                        return 0;
                    };
                    //console.log(this.responseText);
                    console.log(JSON.parse(this.responseText));
                    let result = JSON.parse(this.responseText);
                    Array.from(result.results).forEach((item) => {
                        if (item.type == "Event") {
                            EventorSearch.loadedEvents = [];
                            // console.log(item.results);
                            Array.from(item.results).forEach((item2) => {
                                EventorSearch.loadedEvents.push(item2);
                            });
    
                        };
                    });
                    // EventorFlow.refreshEvents();
                    
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
            

                // let shortdate = element[0];

                let task = EventorTypes.GetNewTask();
                task.user = me;
                task.action = 1;
                task.type = "event";
                task.order = "setdate ASC";
                const where = {
                    column: "user",
                    value: me,
                };
                task.where.push(where);

                const where2 = {
                    column: ["content", "title"],
                    operator: "LIKE",
                    value: text
                } 
                task.where.push(where2);
                // const where2 = {
                //     column: "setdate",
                //     value: EventorUtils.getSimpleDate(shortdate.getFirstDate(true), true),
                //     operator: "BETWEEN",
                //     value2: EventorUtils.getSimpleDate(shortdate.getLastDate(true), true),
                // };
                // task.where.push(where2);
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
            
    
    
            xhttp.send(JSON.stringify(taskArray));
            //console.log(JSON.stringify(taskArray));
        }
}