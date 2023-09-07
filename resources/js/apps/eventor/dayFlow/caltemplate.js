class CalTemplate
{
    static getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getUTCDay();   
        return isNaN(dayOfWeek) ? null : 
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
      }

      static getMonthName(date) {
        let month = new Date(date).getMonth();   
        //console.log(month, date); 
        return isNaN(month) ? null : 
        ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
      }


      static createMonthHeader(date) {
        const month = CalTemplate.getMonthName(date);
        const monum = new Date(date).getMonth();
        const year = new Date(date).getFullYear();
        const color = DateUtils.getMonthColor(monum);
    
        // Create the outer div
        const outerDiv = document.createElement('div');
        outerDiv.classList.add('evt-restrictor','uk-text-center','uk-background-muted');

        outerDiv.style.backgroundColor = color;
        outerDiv.style.boxShadow = 'inset 1px 1px 100px #ffffff6b';
        outerDiv.setAttribute('data-restrictor', `${month}-${year}`);

    
        // Create the card element
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('uk-text-bold');
        cardDiv.textContent = `${month} ${year}`;
    
        outerDiv.appendChild(cardDiv);
    
        return outerDiv;
    }


      static calRow(date, items = []){
        let row = document.createElement('div');
        row.id = 'row_' + date;
        row.classList.add('cl-row');
        row.setAttribute('data-date', date);
        row.classList.add('uk-text-center','uk-grid-collapse','start-collapse','uk-background-muted','event-section','uk-grid');

        let day = CalTemplate.getDayOfWeek(date);
        day = day.slice(0, 3);
        let dnum = new Date(date).getUTCDate();

        let todateId = DateUtils.isDateToday(date) ? "row_today" : "";
        let headdiv = document.createElement('div');
        headdiv.id = todateId;
        headdiv.classList.add('uk-width-auto@m','uk-text-left','th-padding-small','uk-first-column');

        let dnub = document.createElement('div');
        dnub.id = '';
        dnub.classList.add('uk-text-lead');
        dnub.innerHTML = `${day} '${dnum}`;
        
        let dnub2 = document.createElement('div');
        dnub2.id = '';
        dnub2.classList.add('uk-card','uk-text-small');
        dnub2.innerHTML = `${date}`;

        headdiv.appendChild(dnub);
        headdiv.appendChild(dnub2);

        let bodydiv = document.createElement('div');
        bodydiv.id = '';
        bodydiv.classList.add('uk-child-width-1-4@xl','uk-child-width-1-3@l','uk-child-width-1-2@m','uk-child-width-1-2@s','uk-grid-small','uk-grid-match','start-collapse','section-padding','uk-grid','uk-grid-stack','eventor-row-content');

        for (let index = 0; index < items.length; index++) {
          const element = items[index];
          bodydiv.appendChild(element);
        }
        if (items.length == 0){
          row.classList.add('eventor-hiddenrow');
        }

        if (todateId != ''){
          row.classList.add('eventor-today');
        }
        row.appendChild(headdiv);
        row.appendChild(bodydiv);
        
        return row;
      }


      static navButtons(curdate = '', moveDown = false)
      {
        let div = document.createElement('div');
        div.id = '';
        div.classList.add('cl-nav');
        if (moveDown){
          div.setAttribute('cl-move-down', moveDown);
        };
 
        let prevexbutton = document.createElement('div');
        prevexbutton.id = '';
        prevexbutton.classList.add('cl-com-prevexpand');
        prevexbutton.classList.add('cl-nav-button');
        prevexbutton.innerHTML = "<<";
        
        let prevbutton = document.createElement('div');
        prevbutton.id = '';
        prevbutton.classList.add('cl-com-prev');
        prevbutton.classList.add('cl-nav-button');
        prevbutton.innerHTML = "<";

        let calbutton = document.createElement('div');
        calbutton.id = '';
        calbutton.classList.add('cl-nav-button');
        
        let dateIn = document.createElement('input');
        dateIn.id = '';
        dateIn.classList.add('cl-nav-date-flash');
        dateIn.setAttribute('type', 'month');
        dateIn.setAttribute('name', 'flashdate');
        dateIn.setAttribute('value', curdate);
        calbutton.appendChild(dateIn);

        let nextbutton = document.createElement('div');
        nextbutton.id = '';
        nextbutton.classList.add('cl-com-next');
        nextbutton.classList.add('cl-nav-button');
        nextbutton.innerHTML = ">";

        let nextexbutton = document.createElement('div');
        nextexbutton.id = '';
        nextexbutton.classList.add('cl-com-nextexpand');
        nextexbutton.classList.add('cl-nav-button');
        nextexbutton.innerHTML = ">>";

        div.appendChild(prevbutton);
        div.appendChild(prevexbutton);
        div.appendChild(calbutton);
        div.appendChild(nextexbutton);
        div.appendChild(nextbutton);

        return div;
      }

}