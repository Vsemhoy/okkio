@extends('public.template.template')

@section('page-styles')
<link rel="stylesheet" href="{{ asset('resources/css/apps/eventor/template.css') }}">
@endsection


@section('content')
<div id='eventor_body' class='app-content'>
</div>
@endsection

@section('page-script')
<script>
    // EventorUtils.changeAddressBar('page', 'bro');
    if (EventorUtils.getParam('page') == null || EventorUtils.getParam('page') == 'start' ){

        let nav = Nav.navButtons();
        let toptools = Nav.topTools();
        let epool = Page.eventPool();
        let modalE = new EventModal();
        let modalS = new SettingsModal();
        document.querySelector('#eventor_body').insertAdjacentHTML('afterbegin', nav);
        document.querySelector('#eventor_body').insertAdjacentHTML('afterbegin', toptools);
    
        document.querySelector('#eventor_body').appendChild(epool);
    
        document.body.appendChild(modalE.get());
        document.querySelector('#eventor_body').insertAdjacentHTML('beforeend', modalS.get());
        //document.body.appendChild(modalE.get());
    }
</script>

<script>
  // beginDate describes a month and year to start Month-calendar rendering
  var beginDate = new Date();
  var endDate = new Date();



let evc = EventorTemplate.createEventCard("Title", "32245-44", "CAT", "THE BIG TEXT");
let row = EventorTemplate.createDayRow('2022-11-27');
let hdr  = EventorTemplate.createMonthHeader('2022-11-27');

let pool = document.querySelector('#eventPool');

 
class EventorFlow
{
  constructor()
  {
    this.pool = document.querySelector('#eventPool');
    //this.addEventTrigger = document.querySelectorAll(".eventor-act-addevent");
    this.expendTopTrigger = document.querySelector("#act_expandTop");
    this.expendBottomTrigger = document.querySelector("#act_expandBottom");

    this.expendTopTrigger.addEventListener('mousedown', (e)=>{
      e.preventDefault();
      this.renderMonth(EventorUtils.getNextMonth( endDate), true);
      console.log(EventorUtils.getLastDayOfMonth( endDate, true));
      console.log(EventorUtils.getFirstDayOfMonth( endDate, true));
    });
    
    this.expendBottomTrigger.addEventListener('mousedown', (e)=>{
      e.preventDefault();
      this.renderMonth(EventorUtils.getPrevMonth( beginDate));
      console.log(EventorUtils.getLastDayOfMonth( beginDate, true));
      console.log(EventorUtils.getFirstDayOfMonth( beginDate, true));
    });

    this.moveTopTrigger    = document.querySelector("#act_moveTop");
    this.moveBottomTrigger = document.querySelector("#act_moveBottom");

    this.moveTopTrigger.addEventListener('mousedown', (e)=>{
      e.preventDefault();
      this.pool.innerHTML = "";
      this.renderMonth(EventorUtils.getNextMonth(  endDate), true);
      beginDate = EventorUtils.getFirstDayOfMonth(endDate, false);
      EventorUtils.changeAddressBar("stm", EventorUtils.getFirstDayOfMonth(endDate, true));
      console.log(EventorUtils.getLastDayOfMonth(  endDate, true));
      console.log(EventorUtils.getFirstDayOfMonth( beginDate, true));
    });
    
    this.moveBottomTrigger.addEventListener('mousedown', (e)=>{
      e.preventDefault();
      this.pool.innerHTML = "";
      this.renderMonth(EventorUtils.getPrevMonth(  beginDate));
      console.log(EventorUtils.getLastDayOfMonth(  beginDate, true));
      console.log(EventorUtils.getFirstDayOfMonth( beginDate, true));
      endDate = EventorUtils.getLastDayOfMonth(beginDate, false, 1);
      EventorUtils.changeAddressBar("enm", EventorUtils.getLastDayOfMonth(beginDate, true));
    });

  }

  renderMonth(date, start = false)
  {
      // Get the month and year from the input date
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();

    // Create a new Date object for the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);

    // Create a new Date object for the last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    if (beginDate > firstDayOfMonth){
      beginDate = firstDayOfMonth;
    }
    if (endDate < lastDayOfMonth){
      endDate   = lastDayOfMonth;
    }
    EventorUtils.changeAddressBar("enm", EventorUtils.getLastDayOfMonth(endDate, true, 0));
    EventorUtils.changeAddressBar("stm", EventorUtils.getFirstDayOfMonth(beginDate, true, 0));

    let mhdr  = EventorTemplate.createMonthHeader(date);
    if (start == false){
            this.pool.insertAdjacentHTML('beforeend', mhdr);
      // Loop from the first day to the last day of the month
      for (let day = lastDayOfMonth; day >= firstDayOfMonth; day.setDate(day.getDate() - 1)) {
      // Get the date of the current day
        // Get the date of the current day
        const currentDate = day.getDate();
        
        // Format the date and log it to the console
        //console.log(`${year}-${(month + 1).toString().padStart(2, '0')}-${currentDate.toString().padStart(2, '0')}`);
        let mrow = EventorTemplate.createDayRow(`${year}-${(month + 1).toString().padStart(2, '0')}-${currentDate.toString().padStart(2, '0')}`);
        this.pool.insertAdjacentHTML('beforeend', mrow);
      }
    } else {
      // Loop from the first day to the last day of the month
      for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
        // Get the date of the current day
        // Get the date of the current day
        const currentDate = day.getDate();
        
        // Format the date and log it to the console
        //console.log(`${year}-${(month + 1).toString().padStart(2, '0')}-${currentDate.toString().padStart(2, '0')}`);
        let mrow = EventorTemplate.createDayRow(`${year}-${(month + 1).toString().padStart(2, '0')}-${currentDate.toString().padStart(2, '0')}`);
        this.pool.insertAdjacentHTML('afterbegin', mrow);
      }
      this.pool.insertAdjacentHTML('afterbegin', mhdr);
    }

  }
}

class EventorEditor
{
  constructor() 
  {
    this.pool = document.querySelector('#eventPool');
    //this.addEventTrigger = document.querySelectorAll(".eventor-act-addevent");

    document.addEventListener("click", function(e){
      if (e.target.classList.contains("eventor-act-addevent")){
        e.preventDefault();
        const dateInput = document.querySelector("#evt_setdate");
        dateInput.value = EventorUtils.getCurrentDateAsString();

        const target = e.target.closest(".event-section"); // Or any other selector.
  
        if(target){
          let epool = target.querySelector(".eventor-row-content");
          let evc = EventorTemplate.createEventCard("Title", "2022-11-07", "CAT", "THE BIG TEXT");
          epool.insertAdjacentHTML('beforeend', evc);
        }
      }
    });

    document
      .querySelector("#eventor_act_saveEvent")
      .addEventListener("click", () => {
        //let obj = this.harvestModalData();
        //alert(JSON.stringify(obj)); // Display the object as a JSON string for debugging purposes
        this.saveEvent();
      });

      document.querySelector("#callCreateModal").addEventListener("click", function(e){
        const dateInput = document.querySelector("#evt_setdate");
        dateInput.value = EventorUtils.getCurrentDateAsString();
        EventorUtils.getLocation();
      });
  }

  harvestModalData(){
    const myObject = {
        title: document.querySelector('#evt_title').value,
        content: document.querySelector('#evt_content').value,
        format: parseInt(document.querySelector('#evt_format').value),
        section: document.querySelector('#evt_section').value,
        category: document.querySelector('#evt_category').value,
        locked: document.querySelector('#evt_locked').checked ? 1 : 0,
        access: document.querySelector('#evt_access').value,
        status: document.querySelector('#evt_status').value,
        starred: document.querySelector('#evt_starred').checked ? 1 : 0,
        pinned: document.querySelector('#evt_pinned').checked ? 1 : 0,
        setdate: document.querySelector('#evt_setdate').value,
        importance: document.querySelector('#evt_importance').value,
    };
    return myObject;
  }

  fillFormWithData(data) {
        document.querySelector('#evt_title').value = data.title;
        document.querySelector('#evt_content').value = data.content;
        document.querySelector('#evt_format').value = data.format.toString();
        document.querySelector('#evt_section').value = data.section;
        document.querySelector('#evt_category').value = data.category;
        document.querySelector('#evt_locked').checked = data.locked === 1;
        document.querySelector('#evt_access').value = data.access;
        document.querySelector('#evt_status').value = data.status;
        document.querySelector('#evt_starred').checked = data.starred === 1;
        document.querySelector('#evt_pinned').checked = data.pinned === 1;
        document.querySelector('#evt_setdate').value = data.setdate;
        document.querySelector('#evt_importance').value = data.importance;
    }


  saveEvent()
  {
  let counter = 0;
      let requestCode = 333;
      let outFormat = "number";
      let data = {};
      data.code = requestCode;
      let formdata = this.harvestModalData();
      if (formdata.title.length == 0 && formdata.content.length == 0){
        alert("Empty form!");
        return;
      }

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if (this.responseText == -1){ alert("You are not registered!");

            return 0;
          };
          console.log(this.responseText);
          // let result = JSON.parse(this.responseText);
          // console.log('рудзукы updated ' + this.responseText);
        }
        else if (this.status > 200)
        {
          if (counter < 1){
            alert("Oops! There is some problems with the server connection.");

            counter++;
          }
        }
      };
      xhttp.open("POST", "/eventor/postcall?code=" + requestCode, false);
      // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.setRequestHeader('X-CSRF-TOKEN', '<?php echo csrf_token(); ?>');

      //alert(JSON.stringify(data));

      const where = {
        column: "user",
        value: 7,
      };
      
      let taskArray = [];
      let task = EventorTypes.GetNewTask();
      task.objects.push(formdata);
      task.user = 9;
      task.action = 3;
      task.type = "event";
      task.where.push(where);
      taskArray.push(task);
      xhttp.send(JSON.stringify(taskArray));
  };
}


let evf = new EventorFlow();
let win = new EventorEditor();
//evf.renderMonth(EventorUtils.getDateMinusMonth( beginDate, 1));
evf.renderMonth(beginDate, true);
beginDate = EventorUtils.getPrevMonth( beginDate);
for (let i = 1; i < 3; i++){
  //evf.renderMonth(EventorUtils.getDatePlusMonth( beginDate, i), true);
}
window.addEventListener('load', function () {
  document.getElementById("row_today").scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  console.log( beginDate + " BEG - END " +  endDate );
});

</script>
@endsection

@section('page-scripts')
<script src="{{ asset('resources/js/apps/eventor/page.js') }}"></script>
<script src="{{ asset('resources/js/apps/eventor/sidemenu.js') }}"></script>
<script src="{{ asset('resources/js/apps/eventor/templates.js') }}"></script>
<script src="{{ asset('resources/js/apps/eventor/types.js') }}"></script>
<script src="{{ asset('resources/js/apps/eventor/utils.js') }}"></script>
<script src="{{ asset('resources/js/apps/eventor/nav.js') }}"></script>
<script src="{{ asset('resources/js/apps/eventor/modals.js') }}"></script>
@endsection