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
  // beginDate describes a month and year to start Month-calendar rendering
  var beginDate = new Date();
  var endDate = new Date();



let evc = EventorTemplate.createEventCard("Title", "32245-44", "CAT", "THE BIG TEXT");
let row = EventorTemplate.createDayRow('2022-11-27');
let hdr  = EventorTemplate.createMonthHeader('2022-11-27');

let pool = document.querySelector('#eventPool');

 





let eventor = new EventorFlow();

//evf.renderMonth(EventorUtils.getDateMinusMonth( beginDate, 1));


for (let i = 1; i < 3; i++){
  //evf.renderMonth(EventorUtils.getDatePlusMonth( beginDate, i), true);
}


</script>

<script>
    if (me != ""){
        eventor.loadSectionsAndCategories();
    }
    eventor.renderMonth(beginDate, true);
    beginDate = EventorUtils.getPrevMonth( beginDate);
    if (me != ""){
        //eventor.loadEvents(beginDate, endDate);
    }

    window.addEventListener('load', function () {
      let tod = document.getElementById("row_today");
      if (tod != null){
        tod.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      }
 // console.log( beginDate + " BEG - END " +  endDate );
});

let smenu = SidebarMenu.getNewMenu();
let fitem = SidebarMenu.getNewItem();
fitem.name  = "All sections";
fitem.literals = "ALL";
fitem.params = ["data-section", 'all'];
smenu.items.push(fitem);

for (let i = 0 ; i < section_container.length; i++){
  let sectim = section_container[i];
  let item = SidebarMenu.getNewItem();
  item.name = sectim.title;
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