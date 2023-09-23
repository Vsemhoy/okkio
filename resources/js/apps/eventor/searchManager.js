class EventorSearch
{
    static loadedEvents = [];
    constructor(selector)
    {
        this.window = document.querySelector('#' + selector);
        this.maintrigger = document.querySelector('#th_topSearch');
        if (this.maintrigger != null){
            this.maintrigger.addEventListener('click', (e)=>{
                this.text = document.querySelector('#th_searchArea').value;
                UIkit.modal(this.window).show();
                if (this.text.length > 2){
                    this.search(this.text);
                }
                document.querySelector('#evt_search_text').value = this.text;
                this.fillSelectors();
            });
        }

        this.searchTrig = document.querySelector('#evt_search_go');
        this.searchTrig.addEventListener('click', (e)=>{
            this.text = document.querySelector('#evt_search_text').value;
            if (this.text.length > 2){
                this.search(this.text);
            }
            document.querySelector('#th_searchArea').value = this.text;
        });

        document.querySelector('#th_searchArea').addEventListener('keydown', (event) => {
            // Check if the pressed key is the "Enter" key (key code 13)
            if (event.keyCode === 13) {
                this.text = document.querySelector('#th_searchArea').value;
                UIkit.modal(this.window).show();
                if (this.text.length > 2){
                    this.search(this.text);
                }
            }
            document.querySelector('#evt_search_text').value = this.text;
            this.fillSelectors();
        });

        document.querySelector('#evt_search_text').addEventListener('keydown', (event) => {
            // Check if the pressed key is the "Enter" key (key code 13)
            if (event.keyCode === 13) {
                this.text = document.querySelector('#evt_search_text').value;
                if (this.text.length > 2){
                    this.search(this.text);
                }
                document.querySelector('#th_searchArea').value = this.text;
            }
        });

        this.fillSelectors();
    }


    fillSelectors(){
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
            sect.appendChild(option2);
        }

        for (let i = 0; i < category_container.length; i++) {
            const element = category_container[i];
            let option2 = document.createElement('option');
            option2.setAttribute('value', element.id);
            option2.textContent = element.title;
            grop.appendChild(option2);
        }

        let acc = EventorTypes.getAccess(3);
        for (let i = 0; i < acc.length; i++) {
            const element = acc[i];
            let option2 = document.createElement('option');
            option2.setAttribute('value', element.value);
            option2.textContent = element.label;
            access.appendChild(option2);
        }

        let stats = EventorTypes.getStatus();
        for (let i = 0; i < stats.length; i++) {
            const element = stats[i];
            let option2 = document.createElement('option');
            option2.setAttribute('value', element.value);
            option2.textContent = element.label;
            stat.appendChild(option2);
        }
    }

    static async fillSearchBody(){
        let container = document.querySelector('#eventor_search_content');
        container.innerHTML = "";
        let delay = 0;
        if (EventorSearch.loadedEvents.length == 0){
            let param = document.createElement('p');
            param.classList.add('uk-label-warning');
            param.classList.add('uk-padding-small');
            param.innerHTML = "There is no one items found...";
            container.appendChild(param);
        } else {
            let param = document.createElement('p');
            param.classList.add('uk-label-success');
            param.classList.add('uk-padding-small');
            param.innerHTML = "Found " + EventorSearch.loadedEvents.length + " items:";
            container.appendChild(param);
        }
    
        EventorSearch.loadedEvents.forEach((event) => {
            setTimeout(() => {
                let card = EventorTemplate.makeEventSearchCard(event);
                container.insertAdjacentHTML('beforeend', card);
            }, delay);
            
            delay += 250;
        });
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
                    EventorSearch.fillSearchBody();
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
                const where = {
                    column: "user",
                    value: me,
                };
                task.where.push(where);

                const where2 = {
                    column: "content",
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