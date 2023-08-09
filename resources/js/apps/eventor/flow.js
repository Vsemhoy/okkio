class EventorFlow {
    constructor() {
        this.pool = document.querySelector('#eventPool');
        //this.addEventTrigger = document.querySelectorAll(".eventor-act-addevent");
        this.expendTopTrigger = document.querySelector("#act_expandTop");
        this.expendBottomTrigger = document.querySelector("#act_expandBottom");

        this.expendTopTrigger.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.renderMonth(EventorUtils.getNextMonth(endDate), true);
            console.log(EventorUtils.getLastDayOfMonth(endDate, true));
            console.log(EventorUtils.getFirstDayOfMonth(endDate, true));
        });

        this.expendBottomTrigger.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.renderMonth(EventorUtils.getPrevMonth(beginDate));
            console.log(EventorUtils.getLastDayOfMonth(beginDate, true));
            console.log(EventorUtils.getFirstDayOfMonth(beginDate, true));
        });

        this.moveTopTrigger = document.querySelector("#act_moveTop");
        this.moveBottomTrigger = document.querySelector("#act_moveBottom");

        this.moveTopTrigger.addEventListener('mousedown', (e) => {
            e.preventDefault();
            event_container = [];
            this.pool.innerHTML = "";
            this.renderMonth(EventorUtils.getNextMonth(endDate), true);
            beginDate = EventorUtils.getFirstDayOfMonth(endDate, false);
            EventorUtils.changeAddressBar("stm", EventorUtils.getFirstDayOfMonth(endDate, true));
            // console.log(EventorUtils.getLastDayOfMonth(endDate, true));
            // console.log(EventorUtils.getFirstDayOfMonth(beginDate, true));
            endDate = EventorUtils.getFirstDayOfMonth(endDate, false);
        });

        this.moveBottomTrigger.addEventListener('mousedown', (e) => {
            e.preventDefault();
            event_container = [];
            this.pool.innerHTML = "";
            this.renderMonth(EventorUtils.getPrevMonth(beginDate));
            // console.log(EventorUtils.getLastDayOfMonth(beginDate, true));
            // console.log(EventorUtils.getFirstDayOfMonth(beginDate, true));
            endDate = EventorUtils.getLastDayOfMonth(EventorUtils.getDateMinusMonth(beginDate), false, 1);
            EventorUtils.changeAddressBar("enm", EventorUtils.getLastDayOfMonth(beginDate, true));
            beginDate = EventorUtils.getFirstDayOfMonth(endDate, false);
        });




        // second 
        this.pool = document.querySelector('#eventPool');
        //this.addEventTrigger = document.querySelectorAll(".eventor-act-addevent");

        document.addEventListener("click", function (e) {
            if (e.target.classList.contains("eventor-act-addevent")) {
                e.preventDefault();
                const dateInput = document.querySelector("#evt_setdate");
                dateInput.value = EventorUtils.getCurrentDateAsString();

                const target = e.target.closest(".event-section"); // Or any other selector.

                if (target) {
                    let epool = target.querySelector(".eventor-row-content");
                    let evc = EventorTemplate.createEventCard("Title", "2022-11-07", "CAT", "THE BIG TEXT");
                    epool.insertAdjacentHTML('beforeend', evc);
                }
            }
        });

        document
            .querySelector("#eventor_act_saveEvent")
            .addEventListener("click", () => {
                //let obj = this.harvestModalData();
                //alert(JSON.stringify(obj)); // Display the object as a JSON string for debugging purposes
                this.saveEvent();
            });

        document.querySelector("#callCreateModal").addEventListener("click", function (e) {
            const dateInput = document.querySelector("#evt_setdate");
            dateInput.value = EventorUtils.getCurrentDateAsString();
            EventorUtils.getLocation();
        });
    }

    renderMonth(date, start = false) {
        // Get the month and year from the input date
        const month = new Date(date).getMonth();
        const year = new Date(date).getFullYear();

        // Create a new Date object for the first day of the month
        let firstDayOfMonth = new Date(year, month, 1);

        // Create a new Date object for the last day of the month
        let lastDayOfMonth = new Date(year, month + 1, 0);
        lastDayOfMonth = EventorUtils.getLastDayOfMonth(lastDayOfMonth);
        if (beginDate > firstDayOfMonth) {
            beginDate = firstDayOfMonth;
        }
        if (endDate < lastDayOfMonth) {
            endDate = lastDayOfMonth;
        }
        EventorUtils.changeAddressBar("enm", EventorUtils.getLastDayOfMonth(endDate, true, 0));
        EventorUtils.changeAddressBar("stm", EventorUtils.getFirstDayOfMonth(beginDate, true, 0));

        let mhdr = EventorTemplate.createMonthHeader(date);
        if (start == false) {
            this.pool.insertAdjacentHTML('beforeend', mhdr);
            // Loop from the first day to the last day of the month
            for (let day = lastDayOfMonth; day >= firstDayOfMonth; day.setDate(day.getDate() - 1)) {
                // Get the date of the current day
                const currentDate = day.getDate();

                // Format the date and log it to the console
                //console.log(`${year}-${(month + 1).toString().padStart(2, '0')}-${currentDate.toString().padStart(2, '0')}`);
                let mrow = EventorTemplate.createDayRow(`${year}-${(month + 1).toString().padStart(2, '0')}-${currentDate.toString().padStart(2, '0')}`);
                this.pool.insertAdjacentHTML('beforeend', mrow);
            }
        } else {
            // Loop from the first day to the last day of the month
            for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
                // Get the date of the current day
                const currentDate = day.getDate();

                // Format the date and log it to the console
                //console.log(`${year}-${(month + 1).toString().padStart(2, '0')}-${currentDate.toString().padStart(2, '0')}`);
                let mrow = EventorTemplate.createDayRow(`${year}-${(month + 1).toString().padStart(2, '0')}-${currentDate.toString().padStart(2, '0')}`);
                this.pool.insertAdjacentHTML('afterbegin', mrow);
            }
            this.pool.insertAdjacentHTML('afterbegin', mhdr);
        }

        this.loadEvents(EventorUtils.getFirstDayOfMonth(date), EventorUtils.getLastDayOfMonth(date));
        console.log('loadcall: ', EventorUtils.getFirstDayOfMonth(date), EventorUtils.getLastDayOfMonth(date));
    }






    harvestModalData() {
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

    fillFormWithData(data) {
        document.querySelector('#evt_title').value = data.title;
        document.querySelector('#evt_content').value = data.content;
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


    saveEvent() {
        let counter = 0;
        let outFormat = "number";
        let data = {};
        let formdata = this.harvestModalData();
        if (formdata.title.length == 0 && formdata.content.length == 0) {
            alert("Empty form!");
            return;
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    alert("You are not registered!");
                    return 0;
                };
                console.log(this.responseText);
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
        task.action = 3;
        task.type = "event";
        task.where.push(where);
        taskArray.push(task);
        xhttp.send(JSON.stringify(taskArray));
    }


    static refreshCategoriesAndSections() {
        const cats = document.querySelector('#evt_category');
        const sects = document.querySelector('#evt_section');
        cats.innerHTML = "";
        sects.innerHTML = "";
        const optionElement0 = document.createElement('option');
        optionElement0.value = "";
        optionElement0.textContent = "no category";
        cats.appendChild(optionElement0);
        Array.from(section_container).forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.title;
            sects.appendChild(optionElement);
        });

        Array.from(category_container).forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.title;
            cats.appendChild(optionElement);
        });
    }


    loadSectionsAndCategories() {
        let counter = 0;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    alert("You are not registered!");
                    return 0;
                };
                //console.log(this.responseText);
                console.log(JSON.parse(this.responseText));
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Section") {
                        console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                            section_container.push(item2);
                        });

                    } else if (item.type == "Category") {
                        console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                            category_container.push(item2);
                        });
                    }
                });
                EventorFlow.refreshCategoriesAndSections();
                // let result = JSON.parse(this.responseText);
            }
            else if (this.status > 200) {
                if (counter < 1) {
                    alert("Oops! There is some problems with the server connection.");
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
        Array.from(event_container).forEach((event) => {
            // const optionElement = document.createElement('option');
            // optionElement.value = option.id;
            // optionElement.textContent = option.title;
            //sects.appendChild(optionElement);
            if (!event.hasOwnProperty("loaded")) {
                //let evDate = event.setDate;
                console.log(event.setdate);
                let rid = "row_" + event.setdate;

                let row = document.querySelector('#' + rid);
                if (row != null) {
                    let erc = row.querySelector('.eventor-row-content');
                    //let card = EventorTemplate.createEventCard(event.title, event.setdate, event.category, event.content);
                    let card = EventorTemplate.makeEventCard(event);
                    erc.insertAdjacentHTML('beforeend', card);
                    //erc.appendChild(card);
                }


                event.loaded = true;
                console.log(rid);
            }

        });
    }


    loadEvents(datePast, dateFuture) {
        let counter = 0;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    alert("You are not registered!");
                    return 0;
                };
                //console.log(this.responseText);
                console.log(JSON.parse(this.responseText));
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Event") {
                        console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                            event_container.push(item2);
                        });

                    };
                });
                EventorFlow.refreshEvents();

            }
            else if (this.status > 200) {
                if (counter < 1) {
                    alert("Oops! There is some problems with the server connection.");
                    //console.log(this.responseText);
                    counter++;
                }
            }
        };
        xhttp.open("POST", "/eventor/postcall", false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);

        console.log(datePast);
        console.log(dateFuture);
        const where = {
            column: "user",
            value: me,
        };
        const where2 = {
            column: "setdate",
            value: EventorUtils.getSimpleDate(datePast, true),
            operator: "BETWEEN",
            value2: EventorUtils.getSimpleDate(dateFuture, true),
        };
        console.log(EventorUtils.getSimpleDate(datePast, true));
        console.log(EventorUtils.getSimpleDate(dateFuture, true));
        let taskArray = [];

        let task = EventorTypes.GetNewTask();
        task.user = me;
        task.action = 1;
        task.type = "event";
        task.where.push(where);
        task.where.push(where2);
        taskArray.push(task);

        xhttp.send(JSON.stringify(taskArray));
        //console.log(JSON.stringify(taskArray));
    }

}