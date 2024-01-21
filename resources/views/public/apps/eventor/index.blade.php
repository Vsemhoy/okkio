@extends('public.template.template')

@section('page-styles')
<link rel="stylesheet" href="{{ asset('resources/css/apps/eventor/template.css') }}">
<link rel="stylesheet" href="{{ asset('resources/vendors/Prism/prism.css') }}">
<!-- <link rel="stylesheet" href="{{ asset('resources/vendors/Prism/prism-okaidia.css') }}"> -->
<!-- <link rel="stylesheet" href="{{ asset('resources/vendors/Prism/prism-coy.css') }}"> -->
@endsection


@section('content')
<div id='eventor_body' class='app-content'>
  <div id="calendar_nav">
  </div>
  <div id="pre_eventor_content">
      
  </div>
  <div id="eventor_content">
      
  </div>
  <br>
  <div id="calendar_nav_down">
      
  </div>
  <div id="mini_nav" class='evt-mini-nav'>
    <div class="evt-mini-nav-buttons">
        <div class="evt-mini-nav-item cl-com-next">
        <span uk-icon="icon: chevron-up"></span>
        </div>
        <div class="evt-mini-nav-item cl-com-today">
        <span uk-icon="icon: reply"></span>
        </div>
        <div class="evt-mini-nav-item cl-com-prev">
        <span uk-icon="icon: chevron-down"></span>
        </div>
    </div>
</div>

  <div id="modal_searchManager" class="uk-modal-full" uk-modal>
    <div class="uk-modal-dialog" uk-height-viewport style='display: flex;    flex-direction: column;
    justify-content: space-between; 
    backdrop-filter: blur(70px);
    background: #ffffff36;'>

    <div class="uk-modal-header" style='display: grid;     grid-template-columns: auto 40px;
    justify-items: center;
    align-items: center;
    justify-content: center;'>
      <div style='display: grid; grid-template-columns: auto auto auto; justify-content: center;'>
            <input id='evt_search_text' class="uk-input" type="text" placeholder="100" aria-label="100" style='max-width:600px;'>
            <button class="uk-button uk-button-primary" id='evt_search_go' type="button">Search</button>
            <button class="uk-button uk-button-primary" type="button">More</button>
      </div>
            <button class="uk-modal-close-full" type="button" uk-close></button>
        </div>
<div class='uk-container uk-container-small uk-modal-body' style='min-height: calc(100vh - 200px);'>
  <div id='eventor_search_more' >
    <div class="uk-padding-small">

      <form class="uk-grid-small" uk-grid>
        <!-- <div class="uk-width-1-1">
            <input class="uk-input" type="text" placeholder="100" aria-label="100">
        </div> -->
        <div class="uk-width-1-4@s">
        <label for="evt_search_section">Section</label>
        <select class="uk-select" id="evt_search_section">
                    <option>Option 01</option>
                    <option>Option 02</option>
                </select>
        </div>
        <div class="uk-width-1-4@s">
        <label for="evt_search_group">Group</label>
        <select class="uk-select" id="evt_search_group">
                    <option>Option 01</option>
                    <option>Option 02</option>
                </select>
        </div>
        <div class="uk-width-1-4@s">
        <label for="evt_search_status">Status</label>
        <select class="uk-select" id="evt_search_status">
                    <option>Option 01</option>
                    <option>Option 02</option>
                </select>
        </div>
        <div class="uk-width-1-4@s">
          <label for="evt_search_access">Access</label>
        <select class="uk-select" id="evt_search_access">
                    <option>Option 01</option>
                    <option>Option 02</option>
                </select>
        </div>
        <!-- <div class="uk-width-1-2@s">
            <input class="uk-input" type="text" placeholder="50" aria-label="50">
        </div>
        <div class="uk-width-1-4@s">
            <input class="uk-input" type="text" placeholder="25" aria-label="25">
        </div>
        <div class="uk-width-1-2@s">
            <input class="uk-input" type="text" placeholder="50" aria-label="50">
        </div>
        <div class="uk-width-1-2@s">
            <input class="uk-input" type="text" placeholder="50" aria-label="50">
        </div> -->
    </form>
    </div>
  </div>
  <div id='eventor_search_content'>
    <p>Search...</p>
  </div>

  </div>

  <div class="uk-modal-footer">
    <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
    <button class="uk-button uk-button-primary" type="button">Save</button>
  </div>

</div>
</div>
</div>



<div id="modal_searchReader" uk-modal>
    <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
            <h2 class="uk-modal-title evt-reader-title">Headline</h2>
        </div>

        <div class="uk-modal-body evt-reader-body" uk-overflow-auto>

        </div>
        <div class="uk-modal-footer uk-text-right">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
            <a href="#modal_searchManager" class="uk-button uk-button-primary" uk-toggle>Return back</a>
        </div>
    </div>
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
        <div class=""  id='evt_categorymanager_body'>
            
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


    <div id="modal_eventReader" uk-modal class="uk-modal-container">
    <div class="uk-modal-dialog uk-margin-auto-vertical">

        <button class="uk-modal-close-default" type="button" uk-close></button>

        <div class="uk-modal-header">
            <h2 class="uk-modal-title evt-reader-title">Headline</h2>
        </div>

        <div class="uk-modal-body evt-reader-body">

        </div>

        <div class="uk-modal-footer uk-text-right">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
            <!-- <button class="uk-button uk-button-primary" type="button">Save</button> -->
        </div>

    </div>
</div>


@endsection

@section('page-script')
<script>
    var event_container    = [];
    var section_container  = [];
    var category_container = [];

    // EventorUtils.changeAddressBar('page', 'bro');


    if (EventorUtils.getParam('page') == null || EventorUtils.getParam('page') == 'start' ){


        let toptools = EventorNav.topTools();
        let epool = Page.eventPool();
        let modalE = new EventModal();
        let modalS = new SettingsModal();

        

        document.querySelector('#pre_eventor_content').replaceWith(toptools);
        document.body.appendChild(modalE.get());
        document.querySelector('#eventor_body').insertAdjacentHTML('beforeend', modalS.get());
        //document.body.appendChild(modalE.get());
    }


</script>

<script>
  // startDate describes a month and year to start Month-calendar rendering


</script>

<script>
  
  const eventor = new EventorFlow('#eventor_content');

    const navbutts = CalTemplate.navButtons(EventorFlow.dayFlow.endMonth.getShortDate());
    document.querySelector('#calendar_nav').appendChild(navbutts);

    const navbutts2 = CalTemplate.navButtons(EventorFlow.dayFlow.startMonth.getShortDate(), true);
    document.querySelector('#calendar_nav_down').appendChild(navbutts2);







   // startDate = EventorUtils.getPrevMonth(startDate);


    window.addEventListener('load', function () {
      let tod = document.getElementById("row_today");
      if (tod != null && me != ""){
        tod.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      };
});




// console.log('object :>> ', 'GEOLOCATION');
// if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//         // Use the geolocation data here
//         alert(position);
//     });
// } else {
//     // Geolocation not supported or denied
// }
</script>






@endsection

@section('page-scripts')
<script src="{{ asset('resources/vendors/Teftele/DayFlow/dayflow.js') }}"></script>

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/commonmark/0.29.3/commonmark.min.js"></script> -->

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/prism.min.js"></script> -->
<script src="{{ asset('resources/vendors/Commonmark/commonmark.js') }}"></script>
<script src="{{ asset('resources/vendors/Prism/prism.js') }}"></script>

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
<script src="{{ asset('resources/js/apps/eventor/searchmanager.js') }}"></script>

<script src="{{ asset('resources/vendors/Teftele/TeleInput/teleinput.js') }}"></script>

<script>
  document.addEventListener("DOMContentLoaded", function () {

  });
</script>
@endsection