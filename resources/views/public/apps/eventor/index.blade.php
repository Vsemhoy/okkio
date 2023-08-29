@extends('public.template.template')

@section('page-styles')
<link rel="stylesheet" href="{{ asset('resources/css/apps/eventor/template.css') }}">
@endsection


@section('content')
<div id='eventor_body' class='app-content'>
</div>

<div id="modal_sectionManager" class="uk-modal-full" uk-modal>
    <div class="uk-modal-dialog" uk-height-viewport style='background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);'>
        <button class="uk-modal-close-full" type="button" uk-close></button>
        <div class="" id='evt_sectionmanager_body'>
            
            <div class="uk-padding-large">
                <h1>Headline</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    </div>

    <div id="modal_categoryManager" class="uk-modal-full" uk-modal>
    <div class="uk-modal-dialog" uk-height-viewport style='background-image: linear-gradient(to right bottom, #f6efb4, #ffe2b4, #ffd6be, #ffcecc, #ffcada, #f8cde8, #ecd1f5, #ddd6ff, #c7dfff, #b3e7ff, #a8eefd, #abf2ee);'>
        <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
        <div class="">
            
            <div class="uk-padding-large">
                <h1>Headline</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    </div>

    <div id="modal_settingsManager" class="uk-modal-full" uk-modal>
    <div class="uk-modal-dialog" uk-height-viewport style='background-image: linear-gradient(to right bottom, #b4d7f6, #abe0f8, #a7e8f6, #a9efef, #b2f5e6, #baf7dd, #c4f8d4, #d1f8cb, #d8f5c2, #e0f2b9, #e9eeb1, #f2eaab);'>
        <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
        <div class="">
            
            <div class="uk-padding-large">
                <h1>Headline</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    </div>
@endsection

@section('page-script')
<script>
    var event_container = [];
    var section_container = [];
    var category_container = [];
    var activeSection = 'all';
    // EventorUtils.changeAddressBar('page', 'bro');
    if (EventorUtils.getParam('page') == null || EventorUtils.getParam('page') == 'start' ){

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
        //const urlParams = new URLSearchParams(window.location.search);
        const startDateParam = EventorUtils.getParam('stm');
        const endDateParam = EventorUtils.getParam('enm');
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
  item.color = sectim == null ? '' : sectim.color;

  if (sectim.id == getSection){
    item.active = true;
  };

  smenu.items.push(item);
  smenu.count++;
}

let setItem1 = SidebarMenu.getNewItem();
setItem1.name  = "Sections";
setItem1.ukicon = 'thumbnails';
setItem1.id = "djsfaks";
setItem1.ref='#modal_sectionManager';
setItem1.linkSingleAttribute = "uk-toggle";
smenu.setItems.push(setItem1);

let setItem2 = SidebarMenu.getNewItem();
setItem2.name  = "Categories";
setItem2.ukicon = 'social';
setItem2.id = "djsfaks";
setItem2.ref='#modal_categoryManager';
setItem2.linkSingleAttribute = "uk-toggle";
smenu.setItems.push(setItem2);

let setItem3 = SidebarMenu.getNewItem();
setItem3.name  = "Settings";
setItem3.ukicon = 'settings';
setItem3.id = "djsfaks";
setItem3.ref='#modal_settingsManager';
setItem3.linkSingleAttribute = "uk-toggle";
smenu.setItems.push(setItem3);

//console.log(smenu);
sideMenu = new SidebarMenu(smenu);
let menuHandler = new EventorNav();




let sectionManager = new SectionManager();

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
<script src="{{ asset('resources/js/apps/eventor/sectionmanager.js') }}"></script>
<script src="{{ asset('resources/js/apps/eventor/categorymanager.js') }}"></script>
@endsection