class BudgetFlow
{
    constructor()
    {
        this.setRowsDropable();
        let templatec = document.querySelector('#bud_template_pool');
        templatec.setAttribute('draggable', true);
        templatec.addEventListener('dragstart', this.drag);
        templatec.addEventListener('dragover', this.allowDrop);
        templatec.addEventListener('drop', this.drop);
    }

    setRowsDropable() {
        console.log('Hahah :>> ');
        let rows = document.querySelectorAll('.cl-row-body');

        
        for (let i = 0; i < rows.length; i++) {
            const element = rows[i];
            if (!element.classList.contains('bud-row-body')) {
                //element.setAttribute("class", "");
                //element.classList.add('uk-grid');
               // element.classList.add('uk-child-width-1-4@xl','uk-child-width-1-3@l','uk-child-width-1-2@m','uk-child-width-1-2@s','uk-grid-small','uk-grid-match');
                element.setAttribute('uk-grid', '');

                
                for (let y = 0; y < 3; y++) {
                    let col = document.createElement('div');
                    col.id = '';
                    col.classList.add('bud-acc-col');
                    
                    let colin = document.createElement('div');
                    colin.classList.add('acc-col-in');
                    colin.style.backgroundColor = "#00ff9e17";
                    if (y == 1){
                        colin.style.backgroundColor = "#00a4ff37";
                    }
                    if (y == 2){
                        colin.style.backgroundColor = "#ffa4ff37";
                    }
                    colin.classList.add('bud-droparea');
                    colin.setAttribute('draggable', true);
                    colin.addEventListener('dragstart', this.drag);
                    colin.addEventListener('dragover', this.allowDrop);
                    colin.addEventListener('drop', this.drop);
                    
                    let colhead = document.createElement('div');
                    colhead.classList.add('bud-colhead');
                    colhead.innerHTML = "<span>+" + i * y + "</span><span>423850</span>";
                    colin.appendChild(colhead);
                    let div = document.createElement('div');
                    div.id = 'h_' + i + "_" + y;
                    div.classList.add('bud-card-wrapper');
                    div.setAttribute('draggable', true);
                    
                    let card = document.createElement('div');
                    card.id = '';
                    card.textContent = "Super card " + i ;
                    card.classList.add('uk-card');
                    card.classList.add('uk-card-default');
                    card.classList.add('uk-padding');
                    let randomNum = Math.floor(Math.random() * 4); 
                    if (randomNum > 1){

                        div.appendChild(card);
                    }
                    colin.appendChild(div);
                    col.appendChild(colin);
                    element.appendChild(col);
                }

                // Add drag and drop event listeners


                
            }
        }
    }

    allowDrop(event) {
        event.preventDefault();
    }

    drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text');
        // Handle the dropped data as needed

        if (event.shiftKey) {
            let newElem = document.getElementById(data).cloneNode(true);
            newElem.id = 'copied_' + data;
            event.target.closest('.bud-droparea').appendChild(newElem);
        } else {

            event.target.closest('.bud-droparea').appendChild(document.getElementById(data));
        }
    }

    drag(event) {
        event.dataTransfer.setData('text', event.target.id);

        // if (event.shiftKey) {
        //     console.log('event :>> ', event);
        //     const originalElement = document.getElementById(event.target.id);
        //     const copiedElement = originalElement.cloneNode(true);
        //     const newId = 'copied_' + originalElement.id;
        //     copiedElement.id = newId;
        //     event.target.parentElement.appendChild(copiedElement);
        //     event.dataTransfer.setData('text', newId);
        // }
    }
}