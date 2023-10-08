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
                element.classList.add('bud-row-body');
                element.classList.add('uk-child-width-1-4@xl','uk-child-width-1-3@l','uk-child-width-1-2@m','uk-child-width-1-2@s','uk-grid-small','uk-grid-match');
                element.setAttribute('uk-grid', '');

                for (let y = 0; y < 3; y++) {
                    let col = document.createElement('div');
                    col.id = '';
                    col.style.backgroundColor = "#00ff9e17";
                    if (y == 1){
                        col.style.backgroundColor = "#00a4ff37";
                    }
                    if (y == 2){
                        col.style.backgroundColor = "#ffa4ff37";
                    }
                    col.classList.add('bud-acc-col');
                    col.classList.add('bud-droparea');
                    col.setAttribute('draggable', true);
                    col.addEventListener('dragstart', this.drag);
                    col.addEventListener('dragover', this.allowDrop);
                    col.addEventListener('drop', this.drop);
                    
                    let colhead = document.createElement('div');
                    colhead.classList.add('bud-colhead');
                    colhead.innerHTML = "<span>+" + i * y + "</span><span>423850</span>";
                    col.appendChild(colhead);
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
                    div.appendChild(card);
                    col.appendChild(div);
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