
class EventorTemplate
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
        //console.log(event.section);
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
        let starredMark = "";
        if (event.starred == 1){
          starredMark = " evt-starred";
        }
        if (event.status == 0){
          starredMark += " evt-disabled";
          cutlength = 300;
        } else if (event.status == 2){
          starredMark += " evt-archieved";
          cutlength = 500;
        }
        let catBlock = "";
        let secBlock = "";
        let rootcolor = "";
        if (category != null){
          catBlock = `<span class='uk-badge evt-badge' style='background-color: #${category.color == null ? 'a9a9a9' : category.color };' data-cat='${category.id}'>${category.title}</span>`;
        };
        if (section != null){
          secBlock = `<small data-sec='${section.id}'>${section.title}</small>`;
          rootcolor = section.color == null ? "a9a9a9" : section.color;
        };
        let content = "";
        if (event.format == 0){
          content = event.content.substring(0, cutlength);
          if (event.content.length > cutlength){
            content = content.trim() + "...";
          }
          content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
        }
        let body = '';
        if (event.content != ''){
          body = `              <div class="uk-card-body evt-card-body">
            <p>${content}</p>
          </div>`;
        };
        return `
          <div id='${event.id}' class='evt-card-wrapper${starredMark}'>
            <div class="uk-card uk-box-shadow-small uk-box-shadow-hover-large 
            uk-card-small uk-card-default uk-text-left left-corrector event-card"
             style='border-color: #${rootcolor};'>
              <div class="uk-card-header">
                <div class="uk-width-expand">
                  <h3 class="evt-card-title uk-margin-remove-bottom">${event.title}</h3>
                  <div class="uk-text-meta uk-margin-remove-top flex-space"><time datetime="${time}">${time}</time> ${secBlock}</div>
                </div>
              </div>
              ${body}
              <div class="flex-space">
                <a href="#" class="uk-button uk-button-text evt-edit-button">Edit</a>
                ${catBlock}
              </div>
            </div>
          </div>`;
      }


      static makeEventSearchCard(event, searchWord) {
        let cutlength = 800;
        let category = null;
        let section = null;
        let time  = new Date( event.created_at).toLocaleTimeString();
        let date = event.setdate;
        const regex = new RegExp(searchWord, 'gi');
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
        //console.log(event.section);
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
        let starredMark = "";
        if (event.starred == 1){
          starredMark = " evt-starred";
        }
        if (event.status == 0){
          starredMark += " evt-disabled";
          cutlength = 300;
        } else if (event.status == 2){
          starredMark += " evt-archieved";
          cutlength = 500;
        }
        let catBlock = "";
        let secBlock = "";
        let rootcolor = "";
        if (category != null){
          catBlock = `<span class='uk-badge evt-badge' style='background-color: #${category.color == null ? 'a9a9a9' : category.color };' data-cat='${category.id}'>${category.title}</span>`;
        };
        if (section != null){
          secBlock = `<small data-sec='${section.id}'>${section.title}</small>`;
          rootcolor = section.color == null ? "a9a9a9" : section.color;
        };
        let content = "";
        if (event.format == 0){
          content = event.content.substring(0, cutlength);
          if (event.content.length > cutlength){
            content = content.trim() + "...";
          }
          content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
        }
        content = content.replace(regex, `<span class='evt-found'>$&</span>`);
        event.title = event.title.replace(regex, `<span class='evt-found'>$&</span>`);
        let body = '';
        if (event.content != ''){
          body = `              <div class="uk-card-body evt-card-body">
            <p>${content}</p>
          </div>`;
        };
        return `
          <div id='sr_${event.id}' class='evt-card-wrapper${starredMark}'>
            <div class="uk-card uk-box-shadow-small uk-box-shadow-hover-large 
            uk-card-small uk-card-default uk-text-left left-corrector event-card evt-search-card"
             style='border-color: #${rootcolor};'>
              <div class="uk-card-header">
                <div class="uk-width-expand">
                  <h3 class="evt-card-title uk-margin-remove-bottom">${event.title}</h3>
                  <div class="uk-text-meta uk-margin-remove-top flex-space"><time datetime="${time}">${date}</time> ${secBlock}</div>
                </div>
              </div>
              ${body}
              <div class="flex-space evt-goto" data-id='${event.id}'>
                <a href="#" class="uk-button uk-button-text uk-modal-close">View in Flow</a>
                ${catBlock}
              </div>
            </div>
          </div>`;
      }


      static makeEventSearchSeparator(setdate){
        console.log('setdate :>> ', setdate);
        let date = new Date(setdate);
        console.log('date :>> ', date);
        let day = EventorTemplate.getDayOfWeek(date);
        let monthname = EventorTemplate.getMonthName(date);
        let dnum = date.getUTCDate();
        let year = date.getFullYear();
        let result = `
        <div class='evt-search-separator'>
        <h4 class="uk-heading-line uk-text-right"><span>${dnum} ${monthname} ${year}</span></h4>
        </div>
        `;
        return result;
      }


      static createDayRow(date, cards = []){
        let content = "";
        for (let i = 0; i < cards.length; i++)
        {
            content += cards[i];
        }
        let todate = EventorUtils.isDateToday(date) ? "eventor-today" : "";

        let todateId = EventorUtils.isDateToday(date) ? "id='row_today'" : "";
        let noEventClass = cards.length == 0 ? "eventor-hiddenrow" : "";
        let day = EventorTemplate.getDayOfWeek(date);
        day = day.slice(0, 3);
        let dnum = new Date(date).getUTCDate();
        let result = `
        <div class="uk-text-center uk-grid-collapse start-collapse uk-background-muted event-section uk-grid 
        ${noEventClass} ${todate}" uk-grid=""
        id='row_${date}' data-date='${date}'>
            <div class="uk-width-auto@m uk-text-left th-padding-small uk-first-column eventor-act-addevent" ${todateId}>
            <div class="uk-text-lead">${day} '${dnum}</div>
                <div class="uk-card ">${date}</div>

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
        let result = `<div class="evt-restrictor uk-text-center uk-grid-collapse uk-background-muted uk-grid uk-grid-stack" uk-grid=""
        style='background-color: ${color}; box-shadow: inset 1px 1px 100px #ffffff6b;' data-restrictor='${month} ${year}'>
            <div class="uk-width-1-1 uk-first-column">
                <div class="uk-card  uk-text-bold uk-padding-small uk-text-lead">${month} ${year}</div>
            </div>
        </div>`;
        return result;
      }


      static createOfficialEventCard(object)
      {
        let content = document.createElement('div');
        let divs = EventorTemplate.wrapTextToHtmlView(object.content);
        let time  = new Date( object.created_at).toLocaleTimeString();
        let date = new Date( object.created_at).toDateString(); 
        for (let i = 0; i < divs.length; i++) {
          content.appendChild(divs[i]);
        }
        let template = `
        <div>
        <div class="uk-card uk-card-default uk-card-hover uk-card-body th-user-evt-card">
          <div class="evt-card-header">
            <div class="uk-width-expand">
              <h3 class="evt-card-title uk-margin-remove-bottom">${object.title}</h3>
              <div class="uk-text-meta uk-margin-remove-top flex-space">
              <time datetime="${time}">${date}</time> 
              <span class='evt-section-name-badge' data-sat=false data-id='${object.section}'></span></div>
            </div>
        </div>
            <div class='evt-off-reader-body'>
            ${ content.innerHTML}
            </div>
          <div class="th-user-evt-card-footer uk-hidden">
            <div>
            <div><span uk-icon="eye"></span></div>
            <div><span uk-icon="heart"></span></div>
            <div><span uk-icon="comments"></span></div>
            <div><span uk-icon="commenting"></span></div>
            <div><span uk-icon="comments"></span></div>
            </div>
            <div><span class='th-user-evt-card-badge'>Category badge</span></div>
            
     
            
          </div>
        </div>
    </div>`;
    return template;
  }

  static createOfficiaUserEventsWrapper(user, objects = []){
     let template = `
     <div class="uk-container uk-container-small uk-margin-top" id='usr_${user.id}'>
           
     <div class='th-user-container'>
       <div class="th-user-container-header">
         <span class='uk-text-lead'><span uk-icon="star"></span> ${user.name}</span>
         
       </div>
       <div class="th-user-container-body">
         <div class="uk-child-width-1-1@s uk-grid-match" uk-grid>`;
    for (let i = 0; i < objects.length; i++) {
      const element = objects[i];
      template += EventorTemplate.createOfficialEventCard(element);
    };
    template += `
    </div></div></div>`;
    return template;
  }

  static wrapTextToHtmlView(text) {
    let lines = text.split('\n');
    let result = [];
  
    // Regular expression to find URLs starting with "http://" or "https://"
    const urlPattern = /https?:\/\/\S+/g;
  
    // Loop through the lines and create a div for each line
    lines.forEach(line => {
      const div = document.createElement('div'); // Create a new div element
  
      // Use regular expression to find and replace URLs with <a> tags
      const lineWithLinks = line.replace(urlPattern, (match) => {
        return `<a href="${match}" class='uk-link-text' target="_blank">${match}</a>`;
      });
  
      // Set the div's innerHTML to the line with links
      div.innerHTML = lineWithLinks;
  
      if (line.startsWith('- ')) {
        div.classList.add('evt-list-item');
        div.innerHTML = lineWithLinks.replace(/^-\s*/, '');
      }
  
      result.push(div);
    });
  
    return result;
  }


  static sectionSubEditorForm(object)
  {
    let subform = document.createElement('div');
    subform.id = 'evt_section_subeditor';
    subform.classList.add('evt-sec-subeditor');
    subform.setAttribute('data-id', object.id);
    subform.style.borderColor = "#" + object.color;
    let html = `
    <div class="uk-form-horizontal">

    <div class="uk-margin">
        <label class="uk-form-label" for="form-horizontal-text">Description of the section</label>
        <div class="uk-form-controls">
            <textarea class='evt-section-content-in uk-textarea' placeholder='Description...'>${object.content}</textarea>
        </div>
    </div>

    <div class="uk-margin">
        <label class="uk-form-label" for="form-horizontal-select">Show this category info for access level</label>
        <div class="uk-form-controls">
            <select class="uk-select evt-sec-access-selector" id="form-horizontal-select">`;
            (EventorTypes.getAccess()).forEach(element => {
              let active = "";
              if (object.access == element.value){
                active = "selected";
              }
              let option = "<option value='" + element.value + "' " + active + ">" + element.label + "</option>";
              html += option;
          });

            html +=`</select>
        </div>
    </div>



    <div class="uk-margin">
    <label class="uk-form-label" 
      for="form-horizontal4-select">Assigned categories</label>
        <div class="uk-form-controls">
            <select id='form-horizontal4-select' class='uk-select evt-sec-cat-selector evt-cs-open' multiple size='10'>

            </select>
        </div>
    </div>

    <div class="uk-margin">
      <label class="uk-form-label" 
      for="form-horizontal3-select">Status of the section (disabled and archieved not shown in menu)</label>
        <div class="uk-form-controls">
            <select class="uk-select evt-sec-status-selector" id="form-horizontal3-select">`;
            (EventorTypes.getStatus()).forEach(element => {
              let active = "";
              if (object.status == element.value){
                active = "selected";
              }
              let option = "<option value='" + element.value + "' " + active + ">" + element.label + "</option>";
              html += option;
          });

            html +=`</select>
            
        </div>
    </div>
    <br>


    <div class='uk-modal-footer uk-text-right'>
    <button class="uk-button uk-button-default" id='evt_closeSectionEditor'>CLOSE</button>
    <div>
    <button class="uk-button uk-button-danger" style='margin-right: 6px;' id='evt_act_deleteSection'>Delete</button>
    <button class="uk-button uk-button-primary evt-act-update-section">Update</button>
    </div>
    </div>
  </div>
    `;

    subform.innerHTML = html;
    return subform;
    
  }

}