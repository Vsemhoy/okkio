@extends('public.template.template')

@section('page-styles')
<link rel="stylesheet" href="{{ asset('resources/css/apps/budget/template.css') }}">
@endsection


@section('content')
<div id='budget_body' class='app-content'>

<h1>budget page</h1>
</div>
@endsection


@section('page-scripts')
<script src="{{ asset('resources/js/apps/budget/page.js') }}"></script>
<script src="{{ asset('resources/js/apps/budget/sidemenu.js') }}"></script>
<script src="{{ asset('resources/js/apps/budget/templates.js') }}"></script>
<script src="{{ asset('resources/js/apps/budget/types.js') }}"></script>
<script src="{{ asset('resources/js/apps/budget/utils.js') }}"></script>
@endsection