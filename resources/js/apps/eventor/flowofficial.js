class FlowOfficial{
    static offsetted = 0;
    static offsetval = 100;
    static eventArray = [];
    static userEventArray = [];
    static userArray = [];
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
        xhttp.open("POST", "/eventor/postcall", false);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);

        // console.log(datePast);
        // console.log(dateFuture);
        // console.log(EventorUtils.getSimpleDate(datePast, true));
        // console.log(EventorUtils.getSimpleDate(dateFuture, true));
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
            console.log(task);
            taskArray.push(task);



        xhttp.send(JSON.stringify(taskArray));
        //console.log(JSON.stringify(taskArray));
    }


    static getUserName(uid) {
        console.log('command :>> ', 'getUserName', uid);
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
                let user = FlowOfficial.userArray[key];

                
                let block = EventorTemplate.createOfficiaUserEventsWrapper(user, objects);
                ofw.insertAdjacentHTML('beforeend', block);


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