class SidebarMenu
{
    constructor(objectMenu = {'count' : 0}){
        this.object = objectMenu;
        this.body     = document.querySelector('body');
        this.itemBox = document.querySelector('#th_sidenav_items');
        this.setItemBox = document.querySelector('#th_sidenav_settings');
        this.reset();
        
        this.fill(this.object);
    }

    fill(obj) {

        if (obj.count == 0) {
            return;
        }
        if (obj.items != null && Array.isArray(obj.items)) {
            for (let i = 0; i < obj.items.length; i++) {
                if (obj.items[i] != undefined && obj.items[i] != null) {
                    let objectItem = obj.items[i];
                    let listItem = this.makeItem(objectItem);
                    this.itemBox.appendChild(listItem);

                }
            }
        }
        if (obj.setItems != null && Array.isArray(obj.setItems)) {
            for (let i = 0; i < obj.setItems.length; i++) {
                if (obj.setItems[i] != undefined && obj.setItems[i] != null) {
                    let objectItem = obj.setItems[i];
                    let listItem = this.makeItem(objectItem);
                    this.setItemBox.appendChild(listItem);

                }
            }
        }
    }

    countItems(obj){
        let c = 0;
        if (obj.items != null && Array.isArray(obj.items)) {
            c += obj.items.length; 
        }
        if (obj.setItems != null && Array.isArray(obj.setItems)) {
            c += obj.setItems.length;
        }
        return c;
    }

    reset()
    {
        // this.itemBox.innerHTML = '';
        // this.setItemBox.innerHTML = '';
        while (this.itemBox.firstChild) {
            this.itemBox.removeChild(this.itemBox.firstChild);
        }

        while (this.setItemBox.firstChild) {
            this.setItemBox.removeChild(this.setItemBox.firstChild);
        }
        if (this.object.count < 1){
            this.body.classList.remove('th-sidenav-show');
        } else {
            this.body.classList.add('th-sidenav-show');
        }
    }

    makeItem(itemObj) {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    const iconArea = document.createElement('span');
    const text = document.createElement('div');
    const badge = document.createElement('span');

    listItem.className = `th-com-s-nav-item ${itemObj.class || ''} ${itemObj.active == '' ? 'th-active' : ''} ${itemObj.disabled ? 'th-disabled' : ''}`;
    if (itemObj.id) listItem.id = itemObj.id;
    if (itemObj.params.length > 1){
        listItem.setAttribute(itemObj.params[0], itemObj.params[1]);
    }
    link.className = 'nav-link active';
    link.href = itemObj.ref || '#';
    if (itemObj.linkSingleAttribute != ""){

        link.setAttribute(itemObj.linkSingleAttribute, "");
    }

    iconArea.className = 'th-sn-item-icon';
    if (itemObj.ukicon) {
        iconArea.innerHTML = `<span uk-icon="icon: ${itemObj.ukicon}"></span>`;
    } else if (itemObj.icon) {
        iconArea.textContent = itemObj.icon;
    } else {
        iconArea.textContent = itemObj.literals;
    }

    text.className = 'th-sn-item-text';
    text.textContent = itemObj.name;

    badge.setAttribute('data-feather', 'home');
    badge.className = 'align-text-bottom';
    badge.textContent = itemObj.badge || '';

    // Append the elements to build the structure
    link.appendChild(iconArea);
    link.appendChild(text);
    link.appendChild(badge);
    listItem.appendChild(link);

    return listItem;
    }

    addItem(item, area = 0, placetop = false) {
        let objectItem = {
            'icon': item.icon || '',
            'ref': item.ref || '',
            'ukicon': item.ukicon || '',
            'name': item.name || '',
            'literals': item.literals || '',
            'active': item.active || '',
            'disabled': item.disabled || '',
            'badge': item.badge || '',
            'class': item.class || '',
            'id': item.id || '',
            'params': item.params || ''
        };

        const listItem = this.makeItem(objectItem);

        if (area === 0) {
            if (placetop) {
                this.itemBox.insertBefore(listItem, this.itemBox.firstChild);
            } else {
                this.itemBox.appendChild(listItem);
            }
        } else if (area === 1) {
            if (placetop) {
                this.setItemBox.insertBefore(listItem, this.setItemBox.firstChild);
            } else {
                this.setItemBox.appendChild(listItem);
            }
        }
    }

    removeItem(tofind, area = 0, removeByName = false) {
        const targetList = area === 1 ? [this.setItemBox] : [this.itemBox, this.setItemBox];

        for (const list of targetList) {
            const items = list.getElementsByTagName('li');

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const textElements = item.querySelectorAll('.th-sn-item-text');
                let found = false;

                for (const element of textElements) {
                    if ((removeByName && element.textContent.trim() === tofind) ||
                        (!removeByName && item.id === tofind)) {
                        list.removeChild(item);
                        found = true;
                        break; // Exit the loop once we remove an item
                    }
                }

                if (found) {
                    return; // Exit the outer loop if we removed an item
                }
            }
        }
    }


    static getNewMenu(){
        const demoMenu = {
            'items'    : [
               
            ],
            'setItems' : [
               
            ],
            'color'    : "",
            'style'    : "",
            'css'      : "",
            'count'    : '0'
        };
        return demoMenu;
    }

    static getNewItem(){
        const itm = {
            'icon'     : '',
            'ref'      : '#',
            'ukicon'   : '',
            'name'     : 'Item',
            'literals' : 'FI',
            'active'   : '1',
            'disabled' : '',
            'badge'    : '',
            'class'    : '',
            'id'       : '',
            'params'   : [],
            'linkSingleAttribute': ''
        }
        return itm;
    };

    static getDemoMenuItems()
    {
        const demoMenu = {
            'items'    : [
                {
                    'icon'     : '',
                    'ref'      : '',
                    'ukicon'   : '',
                    'name'     : 'First item',
                    'literals' : 'FI',
                    'active'   : '1',
                    'disabled' : '',
                    'badge'    : '25',
                    'class'    : '',
                    'id'       : '',
                    'params'   : [],
                    'linkSingleAttribute': ''
                },
                {
                    'icon'     : '',
                    'ref'      : '',
                    'ukicon'   : '',
                    'name'     : 'Second item',
                    'literals' : 'SI',
                    'active'   : 'false',
                    'disabled' : 'false',
                    'badge'    : '',
                    'class'    : '',
                    'id'       : '',
                    'params'   : [],
                    'linkSingleAttribute': ''
                },
                {
                    'icon'     : '',
                    'ref'      : '',
                    'ukicon'   : '',
                    'name'     : 'Third item',
                    'literals' : 'TI',
                    'active'   : 'false',
                    'disabled' : 'false',
                    'badge'    : '',
                    'class'    : '',
                    'id'       : '',
                    'params'   : [],
                    'linkSingleAttribute': ''
                },
            ],
            'setItems' : [
                {
                    'icon'     : '',
                    'ref'      : '#modal-full',
                    'ukicon'   : 'cog',
                    'name'     : 'Settings',
                    'literals' : 'TI',
                    'active'   : 'false',
                    'disabled' : 'false',
                    'badge'    : '',
                    'class'    : '',
                    'id'       : '',
                    'params'   : [],
                    'linkSingleAttribute': 'uk-toggle'
                },
            ],
            'color'    : "",
            'style'    : "",
            'css'      : "",
            'count'    : '4'
        };
        return demoMenu;
    }

    static removeConsonants(str) {
        return str.replace(/[^aeiouаеёиоуыэюя]/gi, '');
      }

      static removeVowels(str) {
        return str.replace(/[aeiouаеёиоуыэюя]/gi, '');
      }
}