class SectionManager
{
    static bindedTaskCount = 0;
    
    constructor()
    {
        this.renderSectionBody();
        this.renderSectionList();

        document.querySelector('#evt_createSectionBtn').addEventListener('click', (e) => {
            let item = {};
            item.id = '';
            item.title = 'New section';
            item.content ='Description...';
            item.color = 'ffffff';
            item.user = me;
            item.ordered = section_container.length + 1;
            this.saveSection(item);

        });


        document.body.addEventListener('input', (e) => {
            const colorPickerClass = 'evt-section-colorpicker';
        
            if (e.target.classList.contains(colorPickerClass)) {
                const card = e.target.closest('.evt-section-card'); // Replace with the actual class name of your card
                if (card) {
                    // Handle color change within the card
                    const color = e.target.value; // Get the selected color from the color picker
                    card.style.borderLeftColor = color;
                    
                }
            }
        });

        document.body.addEventListener('change', (e) => {
            const targetClass = 'evt-section-colorpicker';
        
            if (e.target.classList.contains(targetClass)) {
                const card = e.target.closest('.card-box'); // Replace with the actual class name of your card
                if (card) {
                    let id = card.getAttribute('data-id');
                    let value = card.querySelector('.evt-section-colorpicker').value;
                    console.log(value, id, section_container.length);
                    for (let i = 0; i < section_container.length; i++) {
                        console.log(i);
                        let element = section_container[i];
                        if (element.id == id){
                            element.color = value.replace('#', '');
                            element.content = element.content == null ? '' : element.content;
                            this.saveSection(element, element.id);
                            console.log("call to update content");
                            break;
                        }
                    }
                }
            }
        });

        document.body.addEventListener('change', (e) => {
            const targetClass = 'evt-section-name-in';
        
            if (e.target.classList.contains(targetClass)) {
                const card = e.target.closest('.card-box'); // Replace with the actual class name of your card
                if (card) {
                    let id = card.getAttribute('data-id');
                    let value = card.querySelector('.evt-section-name-in').value;
                    for (let i = 0; i < section_container.length; i++) {
                        let element = section_container[i];
                        if (element.id == id){
                            element.title = value.replace(/[^\p{L}\p{N}\s]/gu, '');
                            element.content = element.content == null ? '' : element.content;
                            this.saveSection(element, element.id);
                            console.log("call to update name");
                            break;
                        }
                    }
                }
            }
        });

        // document.body.addEventListener('change', (e) => {
        //     const targetClass = 'evt-section-content-in';
        
        //     if (e.target.classList.contains(targetClass)) {
        //         const card = e.target.closest('.card-box'); // Replace with the actual class name of your card
        //         if (card) {
        //             let id = card.getAttribute('data-id');
        //             let value = card.querySelector('.evt-section-content-in').value;
        //             for (let i = 0; i < section_container.length; i++) {
        //                 let element = section_container[i];
        //                 if (element.id == id){
        //                     element.content = value.replace(/[^\p{L}\p{N}\s]/gu, '');
        //                     this.saveSection(element, element.id);
        //                     console.log("call to update content");
        //                     break;
        //                 }
        //             }
        //         }
        //     }
        // });

        // document.body.addEventListener('click', (e) => {
        //     const targetClass = 'evt-section-group-trigger';
        //     let modal = document.querySelector('.evt-cat-group-modal');

        //     if (e.target.classList.contains(targetClass)) {
        //         const card = e.target.closest('.evt-section-card'); // Replace with the actual class name of your card
        //         if (card) {
        //             // Handle color change within the card
        //             modal.classList.toggle('uk-hidden');


        //         }
        //     }
        // });

        UIkit.util.on('#evt_sectionList', 'moved', function(e) {
            // This code will run after an item is moved within the sortable container
            let items = e.target.querySelectorAll('.card-box');
            let array = [];
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                let id = element.getAttribute('data-id');
                let item = {};
                item.id = id;
                item.ordered = i + 1;
                array.push(item);
            };
            SectionManager.updateEventOrder(array);
            // Perform additional actions here
        });
        

        document.body.addEventListener('click', (e)=> {
            if ((e.target.closest('.evt-section-group-trigger') || e.target.closest('.evt-sec-cat-selector')) && !e.target.closest('.evt-cs-open')){
                if (document.querySelector('.evt-cs-open')){
                    // document.querySelector('.evt-cs-open').setAttribute('rows', 1);
                    document.querySelector('.evt-cs-open').classList.remove('evt-cs-open');
                    document.querySelector('.evt-s-selected').classList.remove('evt-s-selected');
                }
                
                let trig = e.target.closest('.evt-section-group-trigger');
                let input = trig.querySelector('.evt-sec-cat-selector');
                input.classList.add('evt-cs-open');
                let card = e.target.closest('.evt-section-card');
                let id = card.parentElement.id;
                card.classList.add('evt-s-selected');

                let strcats = '';
                for (let i = 0; i < section_container.length; i++) {
                    const element = section_container[i];
                    if (element.id == id){
                        strcats = element.categories;
                        break;
                    }
                }
                let catar = strcats.split(',');

                this.updateCategoryList(catar);
            } 
            // else
            // if (!e.target.closest('.evt-section-group-trigger') && !e.target.closest('.evt-sec-cat-selector') 
            // && !e.target.closest('.evt-cs-open')){
            //     // let modal = document.querySelector('.evt-cat-group-modal'); // Element to set position to
            //     // modal.classList.add('uk-hidden');
            //     if (document.querySelector('.evt-cs-open')){
            //         // document.querySelector('.evt-cs-open').setAttribute('rows', 1);
            //         document.querySelector('.evt-cs-open').classList.remove('evt-cs-open');
            //         document.querySelector('.evt-s-selected').classList.remove('evt-s-selected');
            //     }
            // }

            if (e.target.closest('.evt-section-editor-trigger')){
                this.changedItem = null;
                let box = e.target.closest('.card-box');
                let id = box.id;
                let obj = null;
                for (let i = 0; i < section_container.length; i++) {
                    const element = section_container[i];
                    if (element.id == id){
                        obj = element;
                        this.changedItem = obj;
                        break;
                    }
                }
                if (obj != null){
                    if (document.querySelector('#evt_section_subeditor') != null){
                        document.querySelector('#evt_section_subeditor').remove();
                    }
                    let subbox = EventorTemplate.sectionSubEditorForm(obj);
                    box.appendChild(subbox);
                
                    let input = box.querySelector('.evt-sec-cat-selector');
                    let strcats = '';
                    for (let i = 0; i < section_container.length; i++) {
                        const element = section_container[i];
                        if (element.id == id){
                            strcats = element.categories;
                            break;
                        }
                    }
                    let catar = strcats.split(',');
                    this.updateCategoryList(catar);
                }
            }

            if (e.target.closest('.evt-act-update-section')){
                let card = e.target.closest('.card-box');
                let id = card.id;
                card.classList.remove('evt-disabled');
                card.classList.remove('evt-archieved');
                // Iterate through selected options
                for (let i = 0; i < section_container.length; i++) {
                    const element = section_container[i];
                    if (element.id == id){
                        this.saveSection(element, id);
                        if (element.status == 0){
                            card.classList.add('evt-disabled');
                        }
                        if (element.status == 2){
                            card.classList.add('evt-archieved');
                        }
                        break;
                    }
                }


            }

            if (e.target.closest('#evt_act_deleteSection')){

                let id = document.querySelector('#evt_section_subeditor').getAttribute('data-id');
                this.tryToDeleteSection(id);
            }

            if (e.target.closest('#evt_closeSectionEditor')){
                let card = e.target.closest('.card-box');
                let id = card.id;
                for (let i = 0; i < section_container.length; i++) {
                    const element = section_container[i];
                    if (element.id == id){
                        section_container[i] = this.changedItem;
                        break;
                    }
                }
                document.querySelector('#evt_section_subeditor').remove();
            }
        });

        document.body.addEventListener('change', (e) => {
            if (e.target.closest('.evt-sec-cat-selector')){
                let card = e.target.closest('.card-box');
                let id = card.id;

                let civer = card.querySelector('.evt-cat-group-list');
                civer.innerHTML = '';

                const selectedOptions = Array.from(card.querySelector('.evt-sec-cat-selector').selectedOptions);
                // Iterate through selected options

                selectedOptions.forEach(function (option) {
                    // Push the value and text (name) of each selected option into the respective arrays
                    civer.appendChild(SectionManager.getBadge(option.value, option.textContent,
                         option.getAttribute('data-color')));
                });
                // Now you have the selected values and names for each multi-select
                
                let values = [];
                selectedOptions.forEach(function (option) {
                    // Push the value and text (name) of each selected option into the respective arrays
                    //civer.appendChild(SectionManager.getBadge(option.value, option.textContent, option.getAttribute('data-color')));
                    if (option.selected){

                        values.push(option.value);
                    }
                });
                let string = values.join(',');

                for (let i = 0; i < section_container.length; i++) {
                    const element = section_container[i];
                    if (element.id == id){
                        element.categories = string;
                        break;
                    }
                }
            }

            if (e.target.closest('.evt-sec-access-selector')){
                let card = e.target.closest('.card-box');
                let id = card.id;
                // Iterate through selected options
                let cv = card.querySelector('.evt-sec-access-selector').value;

                for (let i = 0; i < section_container.length; i++) {
                    const element = section_container[i];
                    if (element.id == id){
                        element.access = cv;
                        break;
                    }
                }
            }
            

            if (e.target.closest('.evt-section-content-in')){
                let card = e.target.closest('.card-box');
                let id = card.id;
                // Iterate through selected options
                let cv = card.querySelector('.evt-section-content-in').value;

                for (let i = 0; i < section_container.length; i++) {
                    const element = section_container[i];
                    if (element.id == id){
                        element.content = cv.replace(/[^\p{L}\p{N}\s]/gu, '');;
                        break;
                    }
                }
            }

            if (e.target.closest('.evt-sec-status-selector')){
                let card = e.target.closest('.card-box');
                let id = card.id;
                // Iterate through selected options
                let cv = card.querySelector('.evt-sec-status-selector').value;

                for (let i = 0; i < section_container.length; i++) {
                    const element = section_container[i];
                    if (element.id == id){
                        element.status = cv;
                        break;
                    }
                }
            }
        });


        // REMOVER IT!!!!
        document.body.addEventListener('focusout', (e) => {
            if (e.target.closest('.evt-cs-opend')){
                let card = e.target.closest('.evt-section-card').parentElement;
                let id = card.id;
                const selectedOptions = Array.from(e.target.closest('.evt-cs-open').selectedOptions);
                // Iterate through selected options
                let values = [];
                selectedOptions.forEach(function (option) {
                    // Push the value and text (name) of each selected option into the respective arrays
                    //civer.appendChild(SectionManager.getBadge(option.value, option.textContent, option.getAttribute('data-color')));
                    if (option.selected){

                        values.push(option.value);
                    }
                });
                let string = values.join(',');

                for (let i = 0; i < section_container.length; i++) {
                    const element = section_container[i];
                    if (element.id == id){
                        element.categories = string;
                        this.saveSection(element, id);
                        break;
                    }
                }
            };
        });
    }


    static getBadge(bid, name, color){
        // Create a container div element with class "evt-catgroup-s-item"
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('evt-catgroup-s-item');
        containerDiv.setAttribute('data-target', bid);
        containerDiv.style.border = '1px solid #' + color;

        // Create the first span element with class "catGroupName" and set its text content
        const span1 = document.createElement('span');
        span1.classList.add('catGroupName');
        span1.textContent = name + ' ';

        // Create the second span element with class "catGroupUnlink" and set its text content
        const span2 = document.createElement('span');
        span2.classList.add('catGroupUnlink');
        span2.textContent = '';
        // span2.style.backgroundColor = '#' + color;

        // Append the span elements to the container div
        containerDiv.appendChild(span1);
        containerDiv.appendChild(span2);
        return containerDiv;
    }

    updateCategoryList(selectedArray = []){
        let select = document.querySelector('.evt-sec-cat-selector');
        select.innerHTML="";
        for (let i = 0; i < category_container.length; i++) {
            const element = category_container[i];
            if (element.status == 1){
                let option = document.createElement("option");
                option.value = element.id;
                option.innerHTML = element.title;
               // option.style.backgroundColor = "#" + element.color;
               option.setAttribute('data-color', element.color);
                if (selectedArray.includes(element.id)){
                    option.selected = true;
                }
                select.appendChild(option);
            }
        }
    }


    renderSectionBody() {
        let result = "";
        result += `<div class='evt-modal-container-wrapper'>

        <div class="uk-container uk-container-small uk-position-relative evt-modal-container uk-padding-remove">

        <div class='uk-card-header flex-space uk-padding-remove uk-margin-left'>
            <span class='uk-text-lead'>Sections: </span>
        </div>

        <div class='uk-card-body' style='overflow: auto; padding: 12px;'>
        <div id='evt_sectionList'>
        List of sections
        </div>
        </div>
    <div class='uk-card-footer uk-text-right' style='border-top: 1px solid #d9d9d9;'>
    <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
    <button class="uk-button uk-button-primary" type="button" id='evt_createSectionBtn'>Create</button>
</div>
        </div>
    </div>
    
    <div class='evt-cat-group-modal uk-hidden'>
    <select multiple id='evt_catGroupSelector' size="1">
    </select>
    <button>Insert</button>
    </div>
    
    `;
    document.querySelector('#evt_sectionmanager_body').innerHTML = result;
    return result;
    }




    renderSectionList() {
        const sectionListContainer = document.querySelector('#evt_sectionList');
        const sortableDiv = document.createElement('div');
        sortableDiv.setAttribute('uk-sortable', 'group: sortable-group; handle: .uk-sortable-hand');
        // uk-sortable="group: sortable-group; handle: .uk-sortable-hand"
        sortableDiv.classList.add('uk-sortable');
        sortableDiv.id = 'evt_sections';
      
        for (let index = 0; index < section_container.length; index++) {
          const item = section_container[index];
          const sectionCard = SectionManager.getSectionCard(item, index);
          sortableDiv.appendChild(sectionCard);
        }
      
        sectionListContainer.innerHTML = ''; // Clear the existing content
        sectionListContainer.appendChild(sortableDiv);
    }


    static getSectionCard(item, index) {
        const content = item.content == null ? '' : item.content;
        const color = item.color == null ? '' : item.color;
      
        const cardBox = document.createElement('div');
        cardBox.classList.add('uk-margin-sm', 'card-box');
        cardBox.dataset.id = item.id;
        cardBox.id = item.id;
        cardBox.dataset.order = index;
        if (item.status == 0){
            cardBox.classList.add('evt-disabled');
        }
        if (item.status == 2){
            cardBox.classList.add('evt-archieved');
        }
        const ukCard = document.createElement('div');
        ukCard.classList.add(
          'uk-card',
          'uk-card-sm',
          'uk-padding-small',
          'uk-box-shadow-small',
          'uk-box-shadow-hover-medium',
          'uk-card-small',
          'evt-section-card'
        );
        ukCard.style.borderColor = `#${color}`;
      
        const evtGridHeader = document.createElement('div');
        evtGridHeader.classList.add('evt-grid-header');
      
        const moveIcon = document.createElement('span');
        moveIcon.classList.add('uk-icon-link', 'uk-sortable-hand', 'uk-icon');
        moveIcon.setAttribute('uk-icon', 'move');
        moveIcon.style.userSelect = 'none';
      
        const sectionNameInput = document.createElement('input');
        sectionNameInput.placeholder = 'Event name';
        sectionNameInput.classList.add('evt-section-name-in');
        sectionNameInput.maxLength = 60;
        sectionNameInput.type = 'text';
        sectionNameInput.value = item.title;

        const sectionEditorTrigger = document.createElement('span');
        sectionEditorTrigger.classList.add('evt-section-editor-trigger');
        sectionEditorTrigger.setAttribute('uk-icon', 'icon: cog; ratio: 1.2;');

    //     const sectionGroupTrigger = document.createElement('span');
    //     sectionGroupTrigger.classList.add('evt-section-group-trigger');
    //     sectionGroupTrigger.setAttribute('uk-icon', 'icon: list; ratio: 1.2;');
      
    //     const catSelector = document.createElement('select');
    //     catSelector.classList.add('evt-sec-cat-selector');
    //     catSelector.multiple = true;
    //     catSelector.size = 1;
    //   sectionGroupTrigger.appendChild(catSelector);
        // You can add options to catSelector here
      
        const colorPickerInput = document.createElement('input');
        colorPickerInput.classList.add('evt-section-colorpicker');
        colorPickerInput.type = 'color';
        colorPickerInput.value = `#${color}`;
      
        // Continue creating the rest of your elements
      
        // Append elements to their respective parents
        
        let div1 = document.createElement('div');
        div1.appendChild(moveIcon);
        div1.appendChild(sectionNameInput);
        
        evtGridHeader.appendChild(div1);

        let div2 = document.createElement('div');
        div2.classList.add('evt-grid-icons');
        div2.appendChild(sectionEditorTrigger);
       // div2.appendChild(sectionGroupTrigger);
        div2.appendChild(colorPickerInput);
        
        evtGridHeader.appendChild(div2);
        // Continue appending elements as needed

        ukCard.appendChild(evtGridHeader);



        let divcontent = document.createElement('div');
        divcontent.classList.add('evt-sect-card-content');
        ukCard.appendChild(divcontent);

        let divcat = document.createElement('div');
        divcat.classList.add('evt-cat-group-list');

        let categories = item.categories.split(',');
        if (categories.length > 0)
        {
            for (let i = 0; i < categories.length; i++) {
                const catid = categories[i].trim();
                for (let y = 0; y < category_container.length; y++) {
                    if (category_container[y].id == catid){
                        let itemci = this.getBadge(category_container[y].id, category_container[y].title, category_container[y].color);
                        divcat.appendChild(itemci);
                        break;
                    };
                }
            }
        }

        ukCard.appendChild(divcat);
        cardBox.appendChild(ukCard);
        return cardBox;
      }    
    
    


    static getCatItem(name){
        let result = `
            <div class='evt-catgroup-s-item'>
            <span class='catGroupName'>${name}</span> 
            <span class='catGroupUnlink'>X</span>
            </div>
        `;
        return result;
    }


    saveSection(formdata, section_id = "") {
        let counter = 0;
        if (section_id == ""){
            formdata.trans_id = (Math.random() + 1).toString(36).substring(15);
        } else {
            formdata.id = section_id;
        }
        if (formdata.title.length == 0 && formdata.content.length == 0) {
            alert("Empty form!");
            return;
        } else {
            formdata.id = section_id;
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    alert("You are not registered!");
                    return 0;
                };
                console.log(this.responseText);
                console.log(JSON.parse(this.responseText));
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Section") {
                        //console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                            if (section_id == ""){
                                section_container.push(item2);
                                let card = SectionManager.getSectionCard(item2, section_container.length);
                                document.querySelector('#evt_sections').appendChild(card);
                            } else {
                                let card = document.querySelector('#' + section_id.replace('.', `\\.`));
                                //console.log(card);
                                if (card != null){
                                    //card.remove();
                                }

                                for (let i = 0; i < section_container.length; i++){
                                    let el = section_container[i];
                                    if (el.id == section_id){
                                        section_container[i] == item2;
                                        break;
                                    }
                                }
                            }
                        });

                    };
                });
                let smenu2 = EventorNav.buildMenu();
                // GLOBAL SIDEMENU
                sideMenu = new SidebarMenu(smenu2);
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

        const where = {
            column: "user",
            value: me,
        };

        let taskArray = [];
        let task = EventorTypes.GetNewTask();
        task.objects.push(formdata);
        task.user = me;
        if (section_id == ""){
            task.action = 3;

        } else {
            task.action = 5;
        }
        task.type = "section";
        task.where.push(where);
        taskArray.push(task);
        console.log(taskArray);
        xhttp.send(JSON.stringify(taskArray));

        if (document.querySelector('#evt_section_subeditor') != null){
            document.querySelector('#evt_section_subeditor').remove();
        }
    }



    static updateEventOrder(sections) {
        if (document.querySelector('#evt_section_subeditor') != null){
            document.querySelector('#evt_section_subeditor').remove();
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    alert("You are not registered!");
                    return 0;
                };
                console.log(this.responseText);
                console.log(JSON.parse(this.responseText));
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Section") {
                        console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                                for (let i = 0; i < section_container.length; i++){
                                    let el = section_container[i];
                                    if (el.id == item2.id){
                                        section_container[i].ordered == item2.ordered;
                                        break;
                                    }
                                }
                        });
                        section_container.sort(function(a, b) {
                            return b.ordered - a.ordered;
                          });
                    };
                });
                let smenu2 = EventorNav.buildMenu();
                // GLOBAL SIDEMENU
                sideMenu = new SidebarMenu(smenu2);
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

        const where = {
            column: "user",
            value: me,
        };

        let taskArray = [];
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            let task = EventorTypes.GetNewTask();
            task.objects.push(section);
            task.user = me;
            task.action = 6;
            task.type = "section";
            task.where.push(where);
            taskArray.push(task);
        }
        xhttp.send(JSON.stringify(taskArray));
    }


    tryToDeleteSection(section_id)
    {
        SectionManager.bindedTaskCount = 0;
            console.log('command :>> ', 'countEvents');

            let counter = 0;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == -1) {
                        console.log("You are not registered!");
                        return 0;
                    };
                    console.log(this.responseText);
                    //console.log(JSON.parse(this.responseText));
                    let result = JSON.parse(this.responseText);
                    Array.from(result.results).forEach((item) => {
                        if (item.type == "Event") {
                            if (item.results.length > 0){
                                SectionManager.bindedTaskCount = item.results[0];
                            }
                        };
                    });
    
                }
                else if (this.status > 200) {
                    if (counter < 1) {
                        if (me == "") {
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
    
            let taskArray = [];
    
                let task = EventorTypes.GetNewTask();
                task.user = me;
                task.action = 20;
                task.type = "event";
                const where = {
                    column: "user",
                    value: me,
                };
                task.where.push(where);
                const where2 = {
                    column: "section",
                    value: section_id
                };
                task.where.push(where2);
                
                console.log(task);
                taskArray.push(task);
            
            xhttp.send(JSON.stringify(taskArray));
            //console.log(JSON.stringify(taskArray));
            let removed = false;
        if (SectionManager.bindedTaskCount > 0){
            // TO MOVE
            console.log('SectionManager.bindedTaskCount :>> ', SectionManager.bindedTaskCount);
            // ('This section contains ' + SectionManager.bindedTaskCount + ' events, move events to other section before delete.');
            let result = confirm('This section contains ' + SectionManager.bindedTaskCount + ' events, Delete all events from section before?');
            if (result){
                this.deleteEvents(section_id);
                this.deleteSection(section_id);
                removed = true;
            } else {
                document.querySelector('#evt_act_deleteSection').setAttribute('disabled', 'disabled');
            }
        } else {
            console.log('NO :>> ');
            this.deleteSection(section_id);
            removed = true;
        }
        if (removed == true){
            let smenu2 = EventorNav.buildMenu();
            // GLOBAL SIDEMENU
            sideMenu = new SidebarMenu(smenu2);
        }
    }


    deleteEvents(section_id = "") {
        let counter = 0;
        if (section_id == "") {
            alert("OOPS! There is no event selected!");
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
                //console.log(JSON.parse(this.responseText));
                let result = JSON.parse(this.responseText);
                console.log('result :>> ', result);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Event") {
                        //console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                            console.log('item2 :>> ', item2);
                            if (item2.length == 0){
                                let newContainer = [];
                                event_container.forEach(evt => {
                                    if (evt.section == section_id){
                                        let div = document.querySelector('#' + evt.id.replace('.', `\\.`));
                                        if (div != null){
                                            div.remove();
                                        }
                                    } else {
                                        newContainer.push[evt];
                                    }

                                });
                                event_container = newContainer;
                            }
                            
                        });

                    };
                });
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
        const where2 = {
            column: "section",
            value: section_id,
        };

        let taskArray = [];
        let task = EventorTypes.GetNewTask();
        
        task.user = me;
        task.action = 11;
        task.type = "event";
        task.where.push(where);
        task.where.push(where2);
        taskArray.push(task);
        xhttp.send(JSON.stringify(taskArray));
    }

    deleteSection(section_id) {
        let counter = 0;
        let formdata = null;
        section_container.forEach(sect => {
              if (sect.id == section_id)
              {
                formdata = sect;
              };
        });

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
                        Array.from(item.results).forEach((item2) => {
                            console.log(item2);
                            let card = document.querySelector('#' + item2.id);
                            if (card != null) {
                                card.remove();
                            }

                            for (let i = 0; i < section_container.length; i++) {
                                let el = section_container[i];
                                if (el.id == item2.id) {
                                    section_container.splice(i, 1);
                                    break;
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
        task.action = 10;
        task.type = "section";
        task.where.push(where);
        taskArray.push(task);
        xhttp.send(JSON.stringify(taskArray));
    }
}