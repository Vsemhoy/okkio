@extends('public.template.template')

@section('page-styles')
<link rel="stylesheet" href="{{ asset('resources/css/apps/budget/template.css') }}">
@endsection


@section('content')
<style>
        body {
            font-family: sans-serif;
        }
        .cl-nav {
            display: flex;
            margin-right: auto;
            margin-left: auto;
            justify-content: center;
            font-family: monospace;
        }
        .cl-nav-button {
            padding: 6px;
            font-size: 1.2rem;
            min-width: 26px;
            text-align: center;
            cursor: pointer;
            font-weight: bold;
            border: 1px solid #ebebeb;
            border-left: 0px;
            border-right: 0px;
            background-color: #f3f3f3;
            color: dimgray;
            transition: all ease 0.3s;
        }
        .cl-nav-button:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            border-right: 1px solid #ebebeb;
        }
        .cl-nav-button:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
            border-left: 1px solid #ebebeb;
        }
        .cl-nav-button:hover {
            background-color: lightgray;
        }
        .cl-nav-button:active {
            background-color: rgb(180, 191, 204);
        }
        .cl-body {
            border: 1px solid #e3e3e3;
            border-radius: 12px;
        }
        .cl-row {
            display: grid;
            grid-template-columns: 110px auto;
            border-bottom: 1px solid gainsboro;
        }
        .cl-row:last-child {

            border-bottom: 0px;
        }
        @media screen and (max-width: 900px) {
            .cl-row {
            display: grid;
            grid-template-columns: auto;
            }
        }
        .cl-row > div > div, .cl-restrictor > div {
            padding: 6px;
        }
        .cl-restrictor {
            text-align: center;
            font-weight: bold;
        }
        .bud-colhead {
            padding: 6px;
            display: flex;
            justify-content: space-between;
        }
        .bud-colhead > span {
            color: gray;
        }
        .bud-acc-col {
            align-content: flex-start;
        }
        .uk-grid-small>.uk-grid-margin {
    margin-top: 0px;
}
.uk-grid-column-small, .uk-grid-small {
    margin-left: 0px;
}
    </style>

<button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #offcanvas-slide">Slide</button>


<button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #offcanvas-push">Push</button>

<button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #offcanvas-reveal">Reveal</button>

<button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #offcanvas-none">None</button>

<div id="calendar_nav">
        
</div>
<br>
<div id="calendar_body">
    
</div>
<br>
<div id="calendar_nav_down">
    
</div>

<div id="offcanvas-slide" uk-offcanvas="overlay: true; flip:true; overlay: false">
    <div class="uk-offcanvas-bar">

        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <div class="bud-droparea" id='bud_template_pool'>
            <h3>Title</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <br><br><br><br><br>
        </div>


    </div>
</div>

<div id="offcanvas-push" uk-offcanvas="mode: push; overlay: true; flip:true; overlay: false">
    <div class="uk-offcanvas-bar">

        <button class="uk-offcanvas-close" type="button" uk-close></button>

        <h3>Title</h3>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

    </div>
</div>

<div id="offcanvas-reveal" uk-offcanvas="mode: reveal; overlay: true; flip:true; overlay: false">
    <div class="uk-offcanvas-bar">

        <button class="uk-offcanvas-close" type="button" uk-close></button>

        <h3>Title</h3>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

    </div>
</div>

<div id="offcanvas-none" uk-offcanvas="mode: none; overlay: true; flip:true; overlay: false">
    <div class="uk-offcanvas-bar">

        <button class="uk-offcanvas-close" type="button" uk-close></button>

        <h3>Title</h3>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

    </div>
</div>

@endsection

@section('page-script')
<script>
    const DF = new DayFlow('#calendar_body');

    const navbutts = CalTemplate.navButtons(DF.endMonth.getShortDate());
    document.querySelector('#calendar_nav').appendChild(navbutts);

    const navbutts2 = CalTemplate.navButtons(DF.startMonth.getShortDate(), true);
    document.querySelector('#calendar_nav_down').appendChild(navbutts2);

    const BF  = new BudgetFlow();
    function callBackDemo(dayflow)
    {
        console.log('CallBack works!');
        BF.setRowsDropable();
    };

    DF.onMoved(callBackDemo);



    </script>
    @endsection

@section('page-scripts')
<script src="{{ asset('resources/js/apps/budget/dayFlow/caltemplate.js') }}"></script>
<script src="{{ asset('resources/js/apps/budget/dayFlow/shortdate.js') }}"></script>
<script src="{{ asset('resources/js/apps/budget/dayFlow/dayflow.js') }}"></script>

<script src="{{ asset('resources/js/apps/budget/page.js') }}"></script>
<script src="{{ asset('resources/js/apps/budget/sidemenu.js') }}"></script>
<script src="{{ asset('resources/js/apps/budget/templates.js') }}"></script>
<script src="{{ asset('resources/js/apps/budget/types.js') }}"></script>
<script src="{{ asset('resources/js/apps/budget/utils.js') }}"></script>
<script src="{{ asset('resources/js/apps/budget/budgetflow.js') }}"></script>
@endsection