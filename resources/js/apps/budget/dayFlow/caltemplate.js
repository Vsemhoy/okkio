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
        outerDiv.classList.add('cl-restrictor');
        // outerDiv.setAttribute('uk-grid', '');
        outerDiv.style.backgroundColor = color;
        outerDiv.style.boxShadow = 'inset 1px 1px 100px #ffffff6b';
        outerDiv.setAttribute('data-restrictor', `${month} ${year}`);
    
        // Create the card element
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('cl-restr-card');
        cardDiv.textContent = `${month} ${year}`;
    
        outerDiv.appendChild(cardDiv);
    
        return outerDiv;
    }


      static calRow(date, items = []){
        let row = document.createElement('div');
        row.id = 'row_' + date;
        row.classList.add('cl-row');
        row.setAttribute('cl-date', date);

        let todateId = DateUtils.isDateToday(date) ? "id='row_today'" : "";
        let headdiv = document.createElement('div');
        headdiv.id = todateId;
        headdiv.innerHTML = date;
        headdiv.classList.add('cl-row-head');

        let bodydiv = document.createElement('div');
        bodydiv.id = '';
        bodydiv.classList.add('cl-row-body');

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

        div.appendChild(prevexbutton);
        div.appendChild(prevbutton);
        div.appendChild(calbutton);
        div.appendChild(nextbutton);
        div.appendChild(nextexbutton);

        return div;
      }

}