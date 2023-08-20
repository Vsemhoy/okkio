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
  // startDate describes a month and year to start Month-calendar rendering



let pool = document.querySelector('#eventPool');


</script>

<script>

  var startDate = new Date();
  var endDate = new Date();
  let betParam = EventorUtils.getParam('stm');
  let endParam = EventorUtils.getParam('enm');
  if (betParam != null){
    startDate2 = new Date(betParam);
    startDate2 = EventorUtils.getNextMonth(startDate2);
    startDate = startDate2;
  }

  let eventor = new EventorFlow();


  if (startDate.getMonth() == endDate.getMonth()
      && startDate.getYear() == endDate.getYear()){
        EventorFlow.dateArray.push(startDate);
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const startDateParam = urlParams.get('stm');
        const endDateParam = urlParams.get('enm');
        const startDate2 = startDate;
        const endDate2 = endDate;
        const currentDate = new Date(startDate2);
        while (currentDate <= endDate2) {
          const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          EventorFlow.dateArray.push(firstDayOfMonth); // You can format the date as needed
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      };

    if (me != ""){
        eventor.loadSectionsAndCategories();
    };


    
    for (let i = 0; i < EventorFlow.dateArray.length; i++) {
      //console.log(eventor.dateArray[i]);
      eventor.renderMonth(EventorFlow.dateArray[i], true);
    };

    startDate = EventorUtils.getPrevMonth(startDate);


    window.addEventListener('load', function () {
      let tod = document.getElementById("row_today");
      if (tod != null && me != ""){
        tod.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      }
});



let getSection = EventorUtils.getParam('sect');

let smenu = SidebarMenu.getNewMenu();
let fitem = SidebarMenu.getNewItem();
fitem.name  = "All sections";
fitem.literals = "ALL";
fitem.params = ["data-section", 'all'];
if (getSection == null || getSection == ""){
    fitem.active = true;
  };
smenu.items.push(fitem);

for (let i = 0 ; i < section_container.length; i++){
  let sectim = section_container[i];
  let item = SidebarMenu.getNewItem();
  item.name = sectim.title;
  item.active = false;
  let litar = item.name.split(' ');
  if (litar.length == 2){
    var ltr = litar[0].slice(0,1).toUpperCase() + litar[1].slice(0,1).toUpperCase();
    item.literals = ltr;
  } else if (litar.lenght > 2){
    var ltr = litar[0].slice(0,1).toUpperCase() + litar[1].slice(0,1).toUpperCase()+ litar[2].slice(0,1).toUpperCase();
    item.literals = ltr;
  } else {
    var ltr = SidebarMenu.removeVowels(item.name);
    ltr = (ltr).slice(0,2).toUpperCase();
    item.literals = ltr;
  }
  item.params = ["data-section", sectim.id];

  if (sectim.id == getSection){
    item.active = true;
  };

  smenu.items.push(item);
  smenu.count++;
}
console.log(smenu);
sideMenu = new SidebarMenu(smenu);

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
<script src="{{ asset('resources/js/apps/eventor/flow.js') }}"></script>
@endsection