
class EventorTemplate
{
    static getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getUTCDay();   
        return isNaN(dayOfWeek) ? null : 
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
      }

      static getMonthName(date) {
        let month = new Date(date).getMonth();   
        console.log(month, date); 
        return isNaN(month) ? null : 
        ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
      }

    static createEventCard(title, date, category, description) {
        return `
          <div>
            <div class="uk-card uk-box-shadow-small uk-box-shadow-hover-large uk-card-small uk-card-default uk-text-left left-corrector event-card">
              <div class="uk-card-header">
                <div class="uk-width-expand">
                  <h3 class="uk-card-title uk-margin-remove-bottom">${title}</h3>
                  <div class="uk-text-meta uk-margin-remove-top flex-space"><time datetime="${date}">${date}</time> <small>${category}</small></div>
                </div>
              </div>
              <div class="uk-card-body">
                <p>${description}</p>
              </div>
              <div class="uk-card-footer flex-space">
                <a href="#" class="uk-button uk-button-text">Read more</a>
                <span class="uk-badge">${category}</span>
              </div>
            </div>
          </div>`;
      }


      static makeEventCard(event) {
        let cutlength = 800;
        let category = null;
        let section = null;
        let time  = new Date( event.created_at).toLocaleTimeString();
        if (event.category != null && event.category != "")
        {
          for (let i = 0; i < category_container.length; i++){
            let elem = category_container[i];
            if (elem.id == event.category){
              category = elem;
              break;
            }
          }
        };
        console.log(event.section);
        if (event.section != null && event.section != "")
        {
          for (let i = 0; i < section_container.length; i++){
            let elem = section_container[i];
            if (elem.id == event.section){
              section = elem;
              break;
            }
          }
        };
        let catBlock = "";
        let secBlock = "";
        let rootcolor = "";
        if (category != null){
          catBlock = `<span class='uk-badge' style='background-color: #${category.color == null ? 'a9a9a9' : category.color };' data-cat='${category.id}'>${category.title}</span>`;
        };
        if (section != null){
          secBlock = `<small data-sec='${section.id}'>${section.title}</small>`;
          rootcolor = section.color == null ? "a9a9a9" : section.color;
        };
        let content = "";
        if (event.format == 0){
          content = event.content.substring(0, cutlength);
          if (event.content.length > 300){
            content += " ...";
          }
          content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
        }
        return `
          <div id='${event.id}'>
            <div class="uk-card uk-box-shadow-small uk-box-shadow-hover-large 
            uk-card-small uk-card-default uk-text-left left-corrector event-card"
             style='border-color: #${rootcolor};'>
              <div class="uk-card-header">
                <div class="uk-width-expand">
                  <h3 class="uk-card-title uk-margin-remove-bottom">${event.title}</h3>
                  <div class="uk-text-meta uk-margin-remove-top flex-space"><time datetime="${time}">${time}</time> ${secBlock}</div>
                </div>
              </div>
              <div class="uk-card-body">
                <p>${content}</p>
              </div>
              <div class="uk-card-footer flex-space">
                <a href="#" class="uk-button uk-button-text">Edit</a>
                ${catBlock}
              </div>
            </div>
          </div>`;
      }


      static createDayRow(date, cards = []){
        let content = "";
        for (let i = 0; i < cards.length; i++)
        {
            content += cards[i];
        }
        const chd = new Date(date);
        let todate = EventorUtils.isDateToday(date) ? "eventor-today" : "";
        let todateId = EventorUtils.isDateToday(date) ? "id='row_today'" : "";
        let noEventClass = cards.length == 0 ? "eventor-hiddenrow" : "";
        let day = EventorTemplate.getDayOfWeek(date);
        let dnum = new Date(date).getUTCDate();
        let result = `
        <div class="uk-text-center uk-grid-collapse start-collapse uk-background-muted event-section uk-grid ${noEventClass} ${todate}" uk-grid=""
        id='row_${date}' data-date='${date}'>
            <div class="uk-width-auto@m uk-text-left th-padding-small uk-first-column" ${todateId}>
            <div class="uk-text-lead">${day} '${dnum}</div>
                <div class="uk-card ">${date}</div>
            <a href="#" class='eventor-act-addevent'>Add event</a>
            </div>

            <div class="uk-width-expand@m">
                <div class="uk-child-width-1-4@xl uk-child-width-1-3@l uk-child-width-1-2@m uk-child-width-1-2@s uk-grid-small 
                uk-grid-match start-collapse section-padding uk-grid uk-grid-stack eventor-row-content" uk-grid="">
                ${content}
                </div>
            </div>
        </div>`
        return result;
      }


      static createMonthHeader(date){
        let month = EventorTemplate.getMonthName(date);
        let monum = new Date(date).getMonth();
        let year = new Date(date).getFullYear();
        let color = EventorUtils.getMonthColor(monum);
        let result = `<div class="uk-text-center uk-grid-collapse uk-background-muted uk-grid uk-grid-stack" uk-grid=""
        style='background-color: ${color}; box-shadow: inset 1px 1px 100px #ffffff6b;'>
            <div class="uk-width-1-1 uk-first-column">
                <div class="uk-card  uk-text-bold uk-padding-small uk-text-lead">${month} ${year}</div>
            </div>
        </div>`;
        return result;
      }
}