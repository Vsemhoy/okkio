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
    var event_container = [];
    var section_container = [];
    var category_container = [];
    var activeSection = 'all';
    // DateUtils.changeAddressBar('page', 'bro');
    if (DateUtils.getParam('page') == null || DateUtils.getParam('page') == 'start' ){

        let nav = EventorNav.navButtons();
        let toptools = EventorNav.topTools();
        let epool = Page.eventPool();
        let modalE = new EventModal();
        let modalS = new SettingsModal();
        document.querySelector('#eventor_body').insertAdjacentHTML('afterbegin', nav);
        document.querySelector('#eventor_body').insertAdjacentHTML('beforeend', toptools);
        document.querySelector('#eventor_body').appendChild(epool);
        document.body.appendChild(modalE.get());
        document.querySelector('#eventor_body').insertAdjacentHTML('beforeend', modalS.get());
        //document.body.appendChild(modalE.get());
    }


</script>

<script>
  // startDate describes a month and year to start Month-calendar rendering



let pool = document.querySelector('#eventPool');


</script>

<script>

  var startDate = new Date();
  var endDate = new Date();
  let betParam = DateUtils.getParam('stm');
  let endParam = DateUtils.getParam('enm');
  if (betParam != null){
    startDate2 = new Date(betParam);
    startDate2 = DateUtils.getNextMonth(startDate2);
    startDate = startDate2;
  }

  let eventor = new DayFlow();


  if (startDate.getMonth() == endDate.getMonth()
      && startDate.getYear() == endDate.getYear()){
        DayFlow.dateArray.push(startDate);
      } else {
        //const urlParams = new URLSearchParams(window.location.search);
        const startDateParam = DateUtils.getParam('stm');
        const endDateParam = DateUtils.getParam('enm');
        const startDate2 = startDate;
        const endDate2 = endDate;
        const currentDate = new Date(startDate2);
        while (currentDate <= endDate2) {
          const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          DayFlow.dateArray.push(firstDayOfMonth); // You can format the date as needed
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      };

    if (me != ""){
        eventor.loadSectionsAndCategories();
    };


    let callParamsArray = [];
    for (let i = 0; i < DayFlow.dateArray.length; i++) {
      //console.log(eventor.dateArray[i]);
      callParamsArray.push( eventor.renderMonth(DayFlow.dateArray[i], true));
    };

let date = new ShortDate();
let date2 = new ShortDate();
date2.moveMonth(9);

function handleDateChange(shortDate) {
    console.log('Date changed:', shortDate.getShortDate());
}

// Register the callback function
date.onDateChanged(handleDateChange);


date.movePreviousMonth();

let arr = ShortDate.getDateRange(date, date2);

console.log(arr);

document.querySelector('#mainWrapper').insertAdjacentHTML('afterbegin', ShortDate.info());

</script>






@endsection

@section('page-scripts')
<script src="{{ asset('resources/js/apps/eventor/page.js') }}"></script>
<script src="{{ asset('resources/js/apps/eventor/sidemenu.js') }}"></script>
<script src="{{ asset('resources/js/apps/calendar_api/templates.js') }}"></script>
<script src="{{ asset('resources/js/apps/eventor/types.js') }}"></script>
<script src="{{ asset('resources/js/apps/calendar_api/dateutils.js') }}"></script>
<script src="{{ asset('resources/js/apps/eventor/nav.js') }}"></script>
<script src="{{ asset('resources/js/apps/eventor/modals.js') }}"></script>
<script src="{{ asset('resources/js/apps/calendar_api/dayflow.js') }}"></script>

<script src="{{ asset('resources/js/apps/eventor/categorymanager.js') }}"></script>
@endsection