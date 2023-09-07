class BudgetFlow
{
    constructor()
    {
        this.setRowsDropable();
    }

    setRowsDropable() {
        console.log('Hahah :>> ');
        let rows = document.querySelectorAll('.cl-row-body');
        for (let i = 0; i < rows.length; i++) {
            const element = rows[i];
            if (!element.classList.contains('bud-row-body')) {
                element.classList.add('bud-row-body');
                element.classList.add('bud-droparea');
                element.classList.add('uk-child-width-1-4@xl','uk-child-width-1-3@l','uk-child-width-1-2@m','uk-child-width-1-2@s','uk-grid-small','uk-grid-match');
                element.setAttribute('uk-grid', '');
                // Add drag and drop event listeners
                element.setAttribute('draggable', true);
                element.addEventListener('dragstart', this.drag);
                element.addEventListener('dragover', this.allowDrop);
                element.addEventListener('drop', this.drop);

                let div = document.createElement('div');
                div.id = 'h_' + i;
                div.classList.add('bud-card-wrapper');
                div.setAttribute('draggable', true);
                
                let card = document.createElement('div');
                card.id = '';
                card.textContent = "Super card " + i ;
                card.classList.add('uk-card');
                card.classList.add('uk-card-secondary');
                div.appendChild(card);
                
                element.appendChild(div);
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