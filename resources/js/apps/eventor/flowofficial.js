class FlowOfficial{
    static offsetted = 0;
    static offsetval = 100;
    static eventArray = [];
    static userEventArray = [];
    static userArray = [];
    static miniSections = [];
    constructor(){
        let ofw = document.querySelector('#officialEventWrapper');
        ofw.innerHTML = "";
        // for (let i = 0; i < 10; i++) {
        //     let events = [];
        //     for (let index = 0; index < 6; index++) {
        //         const element = EventorTemplate.createOfficialEventCard({title: 'Marat', content: 'dfjka dkfja ksdjf asjdkfjaskdjfkasjdkfjkalsdjfklsajdkfjask'});
        //         events.push(element);
        //     }
        //     let block = EventorTemplate.createOfficiaUserEventsWrapper(events);
        //     ofw.insertAdjacentHTML('beforeend', block);
        // }
        FlowOfficial.loadEvents();
    }



    static loadEvents(callArray = []) {
        // console.log('command :>> ', 'loadEvents');

        let counter = 0;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    console.log("You are not registered!");
                    return 0;
                };
                //console.log(JSON.parse(this.responseText));
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Event") {
                        // console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                            FlowOfficial.eventArray.push(item2);
                            });
                            
                        };
                    });
                    // console.log(FlowOfficial.eventArray);
                FlowOfficial.groupEventsByUsers();

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
        xhttp.open("POST", "/evt/postcall", false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
        let taskArray = [];

            let task = EventorTypes.GetNewTask();
            //task.user = me;
            task.action = 1;
            task.type = "event";
            const where1  = {
                column: "access",
                value: 4
            };
            task.where.push(where1);
            const where2 = {
                column: "status",
                value: 1
            };
            task.where.push(where2);
            // if (section != undefined && section != 'all' && section != ''){
            //     const where3 = {
            //         column: "section",
            //         value: section,
            //     };
            //     task.where.push(where3);
            //     console.log('WHERE SECTION: ', section);
            // }
            task.order = "setdate DESC";
            task.offset = FlowOfficial.offsetted;
            task.limit = FlowOfficial.limit;
            // console.log(task);
            taskArray.push(task);

        xhttp.send(JSON.stringify(taskArray));
        //console.log(JSON.stringify(taskArray));
    }


    static loadSections(callArray = []) {
        // console.log('command :>> ', 'loadEvents');

        let counter = 0;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    console.log("You are not registered!");
                    return 0;
                };
                //console.log(JSON.parse(this.responseText));
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Section") {
                        // console.log(item.results);
                        MiniSection.placeLoadedSections(item.results, FlowOfficial.miniSections);
                    }
                });
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
        xhttp.open("POST", "/evt/postcall", false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
        let taskArray = [];
        console.log('callArray :>> ', callArray);
            let task = EventorTypes.GetNewTask();
            //task.user = me;
            task.action = 1;
            task.type = "section";
            const where1  = {
                column: "access",
                operator: "IN",
                value: callArray.join(", ")
            };
            task.where.push(where1);
            // console.log(task);
            taskArray.push(task);

        xhttp.send(JSON.stringify(taskArray));
        console.log(taskArray);
    }




    static getUserName(uid) {
        // console.log('command :>> ', 'getUserName', uid);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {


                for (const key in FlowOfficial.userArray) {
                    if (FlowOfficial.userArray.hasOwnProperty(key)) {
                      const element = FlowOfficial.userArray[key];
                      if (element.id == uid) {
                        FlowOfficial.userArray[key].name = this.responseText;
                        FlowOfficial.userArray[key].loaded = true;
                        break;
                      }
                    }
                  }
            }
            else if (this.status > 200) {
                    console.log("Oops! There is some problems with the server connection.", this.responseText);
            }
        };
        xhttp.open("POST", "/getusername/" + uid, false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);

        xhttp.send("");
    }


    static groupEventsByUsers(){
        for (let i = 0; i < FlowOfficial.eventArray.length; i++) {
            const element = FlowOfficial.eventArray[i];
            if (element.setted == null){
                element.setted = false;
                let user  = element.user;
                if (FlowOfficial.userEventArray[user] == null)
                {
                    FlowOfficial.userEventArray[user] = [];
                    FlowOfficial.userArray[user] = {id: user, loaded: false};
                }
                FlowOfficial.userEventArray[user].push(element);

            }
            
        }
        FlowOfficial.loadUsers();
        FlowOfficial.setEventsOnDesk();
    }
    
    static setEventsOnDesk(){
        let ofw = document.querySelector('#officialEventWrapper');
        console.log(FlowOfficial.userEventArray);
        

        for (const key in FlowOfficial.userEventArray) {
            if (FlowOfficial.userEventArray.hasOwnProperty(key)) {
                const objects = FlowOfficial.userEventArray[key];
                objects.forEach(element => {
                    FlowOfficial.miniSections = MiniSection.push(FlowOfficial.miniSections, new MiniSection(element.section));
                });
                let user = FlowOfficial.userArray[key];
                let block = EventorTemplate.createOfficiaUserEventsWrapper(user, objects);
                ofw.insertAdjacentHTML('beforeend', block);
              }
        }
        let unloadedArr = MiniSection.getUnloadedSections(FlowOfficial.miniSections);
        FlowOfficial.loadSections(unloadedArr);
        FlowOfficial.placeSectionNames();
    }


    static placeSectionNames(){

        let labels = document.querySelectorAll('.evt-section-name-badge');
        for (let i = 0; i < labels.length; i++) {
            const element = labels[i];
            if (element.getAttribute('data-sat') == 'false'){
                let gid = element.getAttribute('data-id');
                FlowOfficial.miniSections.forEach(miniq => {
                    if (miniq.id == gid){
                        if (miniq.loaded == true){
                            labels[i].innerHTML = miniq.object.title;
                            labels[i].setAttribute('data-sat', true);
                        }
                    }
                });

            }
            
        }
    }


    static loadUsers(){
        for (const key in FlowOfficial.userArray) {
            if (FlowOfficial.userArray.hasOwnProperty(key)) {
              const element = FlowOfficial.userArray[key];
              if (element.loaded == false) {
                FlowOfficial.getUserName(key);
              }
            }
          }
    }
}

class MiniSection
{
    constructor(id, object = null){
        this.id = id,
        this.object = object;
        this.loaded = false;
        if (object != null){
            this.loaded = true;
        }
    }

    static push(array, minisection)
    {
        let has = false;
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element.id == minisection.id){
                has = true;
                break;
            }
        }
        if (!has){
            array.push(minisection);
        };
        return array;
    }

    static getUnloadedSections(array){
        let nar = [];
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element.loaded == false){
                nar.push(element.id);
            }
        }
        return nar;
    }

    static placeLoadedSections(loadedArray, array)
    {
        while (loadedArray[0] != null)
        {
            let loaded = false;
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                if (element.id == loadedArray[0].id){
                    array[i] = new MiniSection( loadedArray[0].id, loadedArray[0]);
                    loaded = true;
                    break;
                }
            }
            if (!loaded){
                array.push(new MiniSection( loadedArray[0].id, loadedArray[0]));
            }
            loadedArray.shift(0);
        }
        return array;
    }
}