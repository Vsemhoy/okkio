class CategoryManager
{
    constructor()
    {
        this.rendercategoryBody();
        this.renderCategoryList();

        document.querySelector('#evt_createcategoryBtn').addEventListener('click', (e) => {
            let item = {};
            item.id = '';
            item.title = 'New category';
            item.content ='';
            item.color = 'ffffff';
            item.user = me;
            item.ordered = category_container.length + 1;
            this.savecategory(item);

        });


        document.body.addEventListener('input', (e) => {
            const colorPickerClass = 'evt-category-colorpicker';
        
            if (e.target.classList.contains(colorPickerClass)) {
                const card = e.target.closest('.evt-category-card'); // Replace with the actual class name of your card
                if (card) {
                    // Handle color change within the card
                    const color = e.target.value; // Get the selected color from the color picker
                    card.style.borderLeftColor = color;
                    
                }
            }
        });

        document.body.addEventListener('change', (e) => {
            const targetClass = 'evt-category-colorpicker';
        
            if (e.target.classList.contains(targetClass)) {
                const card = e.target.closest('.card-box'); // Replace with the actual class name of your card
                if (card) {
                    let id = card.getAttribute('data-id');
                    let value = card.querySelector('.evt-category-colorpicker').value;
                    // console.log(value, id, category_container.length);
                    for (let i = 0; i < category_container.length; i++) {
                        let element = category_container[i];
                        if (element.id == id){
                            element.color = value.replace('#', '');
                            element.content = element.content == null ? '' : element.content;
                            this.savecategory(element, element.id);
                            break;
                        }
                    }
                }
            }
        });

        document.body.addEventListener('change', (e) => {
            const targetClass = 'evt-category-name-in';
        
            if (e.target.classList.contains(targetClass)) {
                const card = e.target.closest('.card-box'); // Replace with the actual class name of your card
                if (card) {
                    let id = card.getAttribute('data-id');
                    let value = card.querySelector('.evt-category-name-in').value;
                    for (let i = 0; i < category_container.length; i++) {
                        let element = category_container[i];
                        if (element.id == id){
                            element.title = value.replace(/[^\p{L}\p{N}\s]/gu, '');
                            element.content = element.content == null ? '' : element.content;
                            this.savecategory(element, element.id);
                            break;
                        }
                    }
                }
            }
        });

        document.body.addEventListener('change', (e) => {
            const targetClass = 'evt-category-content-in';
        
            if (e.target.classList.contains(targetClass)) {
                const card = e.target.closest('.card-box'); // Replace with the actual class name of your card
                if (card) {
                    let id = card.getAttribute('data-id');
                    let value = card.querySelector('.evt-category-content-in').value;
                    for (let i = 0; i < category_container.length; i++) {
                        let element = category_container[i];
                        if (element.id == id){
                            element.content = value.replace(/[^\p{L}\p{N}\s]/gu, '');
                            this.savecategory(element, element.id);
                            break;
                        }
                    }
                }
            }
        });


        UIkit.util.on('#evt_categorys', 'moved', function(e) {
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
            CategoryManager.updateEventOrder(array);
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
            } 
            
            
            if (e.target.closest('.evt-category-editor-trigger')){
                
                this.changedItem = null;
                let box = e.target.closest('.card-box');
                let id = box.id;
                let obj = null;
                for (let i = 0; i < category_container.length; i++) {
                    const element = category_container[i];
                    if (element.id == id){
                        obj = element;
                        this.changedItem = obj;
                        break;
                    }
                }
                if (obj != null){
                    if (document.querySelector('#evt_category_subeditor') != null){
                        document.querySelector('#evt_category_subeditor').remove();
                    }
                    let subbox = EventorTemplate.categorySubEditorForm(obj);
                    box.appendChild(subbox);
                
                    subbox.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
                }
            }

            if (e.target.closest('.evt-act-update-category')){
                let card = e.target.closest('.card-box');
                let id = card.id;
                card.classList.remove('evt-disabled');
                card.classList.remove('evt-archieved');
                // Iterate through selected options
                for (let i = 0; i < category_container.length; i++) {
                    const element = category_container[i];
                    if (element.id == id){
                        element.content = document.querySelector('.evt-category-content-in').value;
                        element.status  = document.querySelector('.evt-cat-status-selector').value;
                        this.savecategory(element, id);
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

            if (e.target.closest('#evt_act_deleteCategory')){

                let id = document.querySelector('#evt_category_subeditor').getAttribute('data-id');
                this.tryToDeleteSection(id);
            }

            if (e.target.closest('#evt_closeCategoryEditor')){
                let card = e.target.closest('.card-box');
                let id = card.id;
                for (let i = 0; i < section_container.length; i++) {
                    const element = section_container[i];
                    if (element.id == id){
                        section_container[i] = this.changedItem;
                        break;
                    }
                }
                document.querySelector('#evt_category_subeditor').remove();
            }
        });
        
    }


    tryToDeleteSection(catId)
    {
        CategoryManager.removeCategoryFromSections(catId);
        CategoryManager.updateEvents(catId, '');
        this.deleteCategory(catId);
    }


    rendercategoryBody() {
        let result = "";
        result += `<div class='evt-modal-container-wrapper'>
        <div class="uk-container uk-container-small uk-position-relative evt-modal-container uk-padding-remove">
        <div class='uk-card-header flex-space uk-padding-remove uk-margin-left'>
        <span class='uk-text-lead'>Categories: </span>
        </div>
        <div class='uk-card-body' style='overflow: auto; padding: 12px;'>
        <div id='evt_categoryList'>
        List of categorys
        </div>
        </div>
        <div class='uk-card-footer uk-text-right' style='border-top: 1px solid #d9d9d9;'>
        <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
        <button class="uk-button uk-button-primary" type="button" id='evt_createcategoryBtn'>Create</button>
            </div>
        </div>
    </div>
    `;
    document.querySelector('#evt_categorymanager_body').innerHTML = result;
    return result;
    }

    renderCategoryList(){
        let div = document.createElement('div');
        div.id = 'evt_categorys';
        div.classList.add('uk-sortable');
        div.setAttribute('uk-sortable', 'group: sortable-group; handle: .uk-sortable-hand');
        

        for (let index = 0; index < category_container.length; index++) {
            const item = category_container[index];
            div.appendChild(CategoryManager.getCategoryCard(item, index));

        };
        document.querySelector('#evt_categoryList').innerHTML = '';
        document.querySelector('#evt_categoryList').appendChild(div);
        return div;
    }


    static getCategoryCard(item, index, catgroups = []){
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
        sectionNameInput.classList.add('evt-category-name-in');
        sectionNameInput.maxLength = 60;
        sectionNameInput.type = 'text';
        sectionNameInput.value = item.title;

        const sectionEditorTrigger = document.createElement('span');
        sectionEditorTrigger.classList.add('evt-category-editor-trigger');
        sectionEditorTrigger.setAttribute('uk-icon', 'icon: cog; ratio: 1.2;');
      
        const colorPickerInput = document.createElement('input');
        colorPickerInput.classList.add('evt-category-colorpicker');
        colorPickerInput.type = 'color';
        colorPickerInput.value = `#${color}`;
        
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



        cardBox.appendChild(ukCard);
        return cardBox;


        ////
        // let content = item.content == null ? '' : item.content;
        // let color = item.color == null ? '' : item.color;
        let result =`  
            <div class="uk-margin-sm card-box" data-id='${item.id}' id="sec_${item.id}" data-order="${index}">
        <div class="uk-card uk-card-sm uk-padding-small uk-box-shadow-small uk-box-shadow-hover-medium uk-card-small
        evt-category-card" style='border-color: #${color}'>
        <div class='evt-grid-header'>
        <div>
        <span class="uk-icon-link uk-sortable-hand uk-icon" uk-icon="move" style="user-select: none;">
        </span>  
        <input placeholder='Event name' class='evt-category-name-in' maxlength='60' type='text' value='${item.title}'/>
        </div>
        <div>
        <span uk-icon='icon: social' class='evt-category-group-trigger'></span>
        <input class='evt-category-colorpicker' type='color' value='#${item.color}' />
        </div>
        </div>


            <div class='evt-sect-card-content'>
            <textarea class='evt-category-content-in' placeholder='Event description'>${content}</textarea>
            </div>

        <div class='evt-cat-group-list'>`;
        result += `</div>
        
        </div>
        </div>`;
        return result;
    }
    // for (let i = 0; i < catgroups.length; i++) {
    //     const cgr = catgroups[i];
    //     result += CategoryManager.getCatItem(cgr);
    // }

    static getCatItem(name){
        let result = `
            <div class='evt-catgroup-s-item'>
            <span class='catGroupName'>${name}</span> 
            <span class='catGroupUnlink'>X</span>
            </div>
        `;
        return result;
    }


    savecategory(formdata, category_id = "") {
        let counter = 0;
        if (category_id == ""){
            formdata.trans_id = (Math.random() + 1).toString(36).substring(15);
        } else {
            formdata.id = category_id;
        }
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
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Category") {
                        Array.from(item.results).forEach((item2) => {
                            if (category_id == ""){
                                // let sortableContainer = UIkit.sortable('#evt_categoryList');
                                let card = CategoryManager.getCategoryCard(item2, category_container.length);
                                document.querySelector('#evt_categorys').appendChild(card);
                                // Update the sortable container
                                // sortableContainer.update();
                                card.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
                            } else {
                                category_container.push(item2);

                                for (let i = 0; i < category_container.length; i++){
                                    let el = category_container[i];
                                    if (el.id == category_id){
                                        category_container[i] == item2;
                                        break;
                                    }
                                }
                            }
                        });

                    };
                });
            }
            else if (this.status > 200) {
                if (counter < 1) {
                    alert("Oops! There is some problems with the server connection, or you are not logged in.");

                    counter++;
                }
            }
        };
        xhttp.open("POST", "/eventor/postcall", true);
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
        if (category_id == ""){
            task.action = 3;
            
        } else {
            task.action = 5;
        }
        task.type = "Category";
        task.where.push(where);
        taskArray.push(task);
        xhttp.send(JSON.stringify(taskArray));
    }



    static updateEventOrder(categorys) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    alert("You are not registered!");
                    return 0;
                };
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "category") {
                        Array.from(item.results).forEach((item2) => {
                                for (let i = 0; i < category_container.length; i++){
                                    let el = category_container[i];
                                    if (el.id == item2.id){
                                        category_container[i].ordered == item2.ordered;
                                        break;
                                    }
                                }
                        });
                        category_container.sort(function(a, b) {
                            return b.ordered - a.ordered;
                          });
                    };
                });
            }
            else if (this.status > 200) {
                if (counter < 1) {
                    alert("Oops! There is some problems with the server connection, or you are not logged in.");

                    counter++;
                }
            }
        };
        xhttp.open("POST", "/eventor/postcall", true);
        // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);

        const where = {
            column: "user",
            value: me,
        };

        let taskArray = [];
        for (let i = 0; i < categorys.length; i++) {
            const category = categorys[i];
            let task = EventorTypes.GetNewTask();
            task.objects.push(category);
            task.user = me;
            task.action = 6;
            task.type = "category";
            task.where.push(where);
            taskArray.push(task);
        }
        xhttp.send(JSON.stringify(taskArray));
    }




    static removeCategoryFromSections(catId){
        let sectionsToUpdate = [];
        for (let i = 0; i < section_container.length; i++) {
            const element = section_container[i];
            let arr = element.categories.split(',');
            if (arr.includes(catId))
            {
                let indexToRemove = arr.indexOf(catId);
                if (indexToRemove > -1)
                {
                    arr.splice(indexToRemove, 1);
                    element.categories = arr.join(',');
                    sectionsToUpdate.push(element);
                }
            }
        }

        if (sectionsToUpdate.length == 0)
        {
            return 0;
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    alert("You are not registered!");
                    return 0;
                };
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Section") {
                        console.log(item.results);
                        
                    };
                });
            }
            else if (this.status > 200) {
                if (counter < 1) {
                    alert("Oops! There is some problems with the server connection, or you are not logged in.");

                    counter++;
                }
            }
        };
        xhttp.open("POST", "/eventor/postcall", true);
        // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);

        const where = {
            column: "user",
            value: me,
        };
        let taskArray = [];
        let task = EventorTypes.GetNewTask();
        task.objects = sectionsToUpdate;
        task.user = me;
        task.action = 5;
        task.type = "section";
        taskArray.push(task);
        xhttp.send(JSON.stringify(taskArray));
    }


    static updateEvents(fromCategory, toCategory = '') {
        console.log('saveEvents :>> ');
        

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == -1) {
                    alert("You are not registered!");
                    return 0;
                };
         
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Event") {
                                for (let i = 0; i < event_container.length; i++) {
                                    if (event_container[i].category == fromCategory){
                                        let card = document.querySelector('#' + event_container[i].id.replace('.', `\\.`));
                                        if (card != null) {
                                            card.remove();
                                        }

                                        event_container[i].category = toCategory;
                                    }
                                }
                    };
                });
                EventorFlow.refreshEvents();
            }
            else if (this.status > 200) {
                if (counter < 1) {
                    alert("Oops! There is some problems with the server connection, or you are not logged in.");

                    counter++;
                }
            }
        };
        xhttp.open("POST", "/eventor/postcall", true);
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
        let formdata = {
            category: toCategory
        };
        task.objects.push(formdata);
        task.user = me;
        task.action = 7;
        let where2 = {
            column: "category",
            value: fromCategory
        }

        task.type = "event";
        task.where.push(where);
        task.where.push(where2);
        taskArray.push(task);
        xhttp.send(JSON.stringify(taskArray));
    }



    deleteCategory(category_id) {
        let counter = 0;
        let formdata = null;
        category_container.forEach(sect => {
              if (sect.id == category_id)
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
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Category") {
                        Array.from(item.results).forEach((item2) => {
                            let card = document.querySelector('#' + item2.id);
                            if (card != null) {
                                card.remove();
                            }

                            for (let i = 0; i < category_container.length; i++) {
                                let el = category_container[i];
                                if (el.id == item2.id) {
                                    category_container.splice(i, 1);
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
        xhttp.open("POST", "/eventor/postcall", true);
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
        task.type = "category";
        task.where.push(where);
        taskArray.push(task);
        xhttp.send(JSON.stringify(taskArray));
    }
}