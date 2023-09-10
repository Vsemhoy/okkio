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
                        // console.log(i);
                        let element = category_container[i];
                        if (element.id == id){
                            element.color = value.replace('#', '');
                            element.content = element.content == null ? '' : element.content;
                            this.savecategory(element, element.id);
                            console.log("call to update content");
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
                            console.log("call to update name");
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
                            console.log("call to update content");
                            break;
                        }
                    }
                }
            }
        });

        // document.body.addEventListener('click', (e) => {
        //     const targetClass = 'evt-category-group-trigger';
        //     let modal = document.querySelector('.evt-cat-group-modal');

        //     if (e.target.classList.contains(targetClass)) {
        //         const card = e.target.closest('.evt-category-card'); // Replace with the actual class name of your card
        //         if (card) {
        //             // Handle color change within the card
        //             modal.classList.toggle('uk-hidden');


        //         }
        //     }
        // });

        UIkit.util.on('#evt_categoryList', 'moved', function(e) {
            // This code will run after an item is moved within the sortable container
            let items = e.target.querySelectorAll('.card-box');
            let array = [];
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                let id = element.getAttribute('data-id');
                console.log(id, i + 1);
                let item = {};
                item.id = id;
                item.ordered = i + 1;
                array.push(item);
            };
            CategoryManager.updateEventOrder(array);
            // Perform additional actions here
        });
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
        <button class="uk-button uk-button-small uk-button-primary" type="button" id='evt_createcategoryBtn'>Create</button>
            </div>
        </div>
    </div>
    `;
    document.querySelector('#evt_categorymanager_body').innerHTML = result;
    return result;
    }

    renderCategoryList(){
        let result = "";
        result += `
        <div uk-sortable="group: sortable-group; handle: .uk-sortable-hand" class="uk-sortable" id='evt_categorys'>`;
        for (let index = 0; index < category_container.length; index++) {
            const item = category_container[index];
            // console.log(item);
            result += CategoryManager.getCategoryCard(item, index);
        };

        result += `</div>`;

        document.querySelector('#evt_categoryList').innerHTML = result;
        return result;
    }


    static getCategoryCard(item, index, catgroups = []){
        let content = item.content == null ? '' : item.content;
        let color = item.color == null ? '' : item.color;
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
                // console.log(this.responseText);
                // console.log(JSON.parse(this.responseText));
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "Category") {
                        // console.log(item.results);
                        Array.from(item.results).forEach((item2) => {
                            if (category_id == ""){
                                category_container.push(item2);
                                // let sortableContainer = UIkit.sortable('#evt_categoryList');
                                let card = CategoryManager.getCategoryCard(item2, category_container.length);
                                document.querySelector('#evt_categoryList').insertAdjacentHTML('beforeend', card);
                                // Update the sortable container
                                // sortableContainer.update();

                            } else {
                                let card = document.querySelector('#' + category_id.replace('.', `\\.`));
                                //console.log(card);
                                if (card != null){
                                    card.remove();
                                }

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
        if (category_id == ""){
            task.action = 3;
            
        } else {
            task.action = 5;
        }
        task.type = "Category";
        task.where.push(where);
        taskArray.push(task);
        // console.log(taskArray);
        // console.log(formdata);
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
                // console.log(this.responseText);
                // console.log(JSON.parse(this.responseText));
                let result = JSON.parse(this.responseText);
                Array.from(result.results).forEach((item) => {
                    if (item.type == "category") {
                        console.log(item.results);
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
        xhttp.open("POST", "/eventor/postcall", false);
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
}