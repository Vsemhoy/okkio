class SectionManager
{
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

        document.body.addEventListener('change', (e) => {
            const targetClass = 'evt-section-content-in';
        
            if (e.target.classList.contains(targetClass)) {
                const card = e.target.closest('.card-box'); // Replace with the actual class name of your card
                if (card) {
                    let id = card.getAttribute('data-id');
                    let value = card.querySelector('.evt-section-content-in').value;
                    for (let i = 0; i < section_container.length; i++) {
                        let element = section_container[i];
                        if (element.id == id){
                            element.content = value.replace(/[^\p{L}\p{N}\s]/gu, '');
                            this.saveSection(element, element.id);
                            console.log("call to update content");
                            break;
                        }
                    }
                }
            }
        });

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
    }


    renderSectionBody() {
        let result = "";
        result += `<div class='evt-modal-container-wrapper'>

        <div class="uk-container uk-container-small uk-position-relative evt-modal-container uk-padding-remove">

        <div class='uk-card-header flex-space uk-padding-small'>
        <span class='uk-text-lead'>Sections: </span>
        <button class="uk-button uk-button-small uk-button-primary" type="button" id='evt_createSectionBtn'>
        <span class='uk-text-large' uk-icon='icon: plus-circle' ></span> add</button>
        </div>

        <div class='uk-card-body' style='overflow: auto; padding: 12px;'>
        <div id='evt_sectionList'>
        List of sections
        </div>
        </div>
<div class='uk-card-footer uk-text-right' style='border-top: 1px solid #d9d9d9;'>
            <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
            <button class="uk-button uk-button-primary" type="button">Save</button>
</div>
        </div>
    </div>
    
    <div class='evt-cat-group-modal uk-hidden'>
    <select multiple size="1">
    <option>Чебурашка</option>
    <option>Крокодил Гена</option>
    <option>Шапокляк</option>
    <option>Крыса Лариса</option>
    <option>Чебурашка</option>
    <option>Крокодил Гена</option>
    <option>Шапокляк</option>
    <option>Крыса Лариса</option>
    </select>
    <button>Insert</button>
    </div>
    
    `;
    document.querySelector('#evt_sectionmanager_body').innerHTML = result;
    return result;
    }

    renderSectionList(){
        let result = "";
        result += `
        <div uk-sortable="group: sortable-group; handle: .uk-sortable-hand" class="uk-sortable" id='evt_sections'>`;
        for (let index = 0; index < section_container.length; index++) {
            const item = section_container[index];
            console.log(item);
            let cats = ['Super', 'New category', 'alpha bond', 'hero'];
            result += SectionManager.getSectionCard(item, index, cats);
        };

        result += `</div>`;

        document.querySelector('#evt_sectionList').innerHTML = result;
        return result;
    }


    static getSectionCard(item, index, catgroups = []){
        let content = item.content == null ? '' : item.content;
        let color = item.color == null ? '' : item.color;
        let result =`  
            <div class="uk-margin-sm card-box" data-id='${item.id}' id="sec_${item.id}" data-order="${index}">
        <div class="uk-card uk-card-sm uk-padding-small uk-box-shadow-small uk-box-shadow-hover-medium uk-card-small
        evt-section-card" style='border-color: #${color}'>
        <div class='evt-grid-header'>
        <div>
        <span class="uk-icon-link uk-sortable-hand uk-icon" uk-icon="move" style="user-select: none;">
        </span>  
        <input placeholder='Event name' class='evt-section-name-in' maxlength='60' type='text' value='${item.title}'/>
        </div>
        <div>
        <span uk-icon='icon: social' class='evt-section-group-trigger'></span>
        <input class='evt-section-colorpicker' type='color' value='#${item.color}' />
        </div>
        </div>


            <div class='evt-sect-card-content'>
            <textarea class='evt-section-content-in' placeholder='Event description'>${content}
            </textarea>
            </div>

        <div class='evt-cat-group-list'>`;
        for (let i = 0; i < catgroups.length; i++) {
            const cgr = catgroups[i];
            result += SectionManager.getCatItem(cgr);
        }
        result += `</div>
        
        </div>
        </div>`;
        return result;
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
                                document.querySelector('#evt_sections').insertAdjacentHTML('beforeend', card);
                            } else {
                                let card = document.querySelector('#' + section_id.replace('.', `\\.`));
                                //console.log(card);
                                if (card != null){
                                    card.remove();
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
    }
}