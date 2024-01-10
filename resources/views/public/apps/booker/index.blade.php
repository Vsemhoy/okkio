@extends('public.template.template')

@section('page-styles')
<link rel="stylesheet" href="{{ asset('resources/css/apps/budget/template.css') }}">
@endsection


@section('content')
<style>
    .uk-navbar-container:not(.uk-navbar-transparent) {
    background: #52d376;
    background-image: url(/storage/site/green-abstract-geometric.jpg);
    background-size: cover;
    background-position: center;
    background-attachment: scroll;
}
.th-navbar-item.active {
    background-color: #ffffffc4;
}
.th-navbar-item:hover {
    background-color: #ffffffc4;
}
.th-navbar-item:first-child:hover {
    cursor: context-menu; 
    background-color: #ffffff00 !important;
}

        body {
            font-family: sans-serif;
        }
        .boo-container {
        display: grid;
        grid-template-columns: 280px auto 280px;
        height: calc(100vh - 41px);

        }
        .boo-wrapper-main {
            min-height: calc(100vh - 42px);
        }
        .boo-nav-container {
            display: grid;
            grid-template-rows: auto 1fr;
        }
        .boo-nav-section {
            /* border-right: 1px solid silver; */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100vh - 189px);

        }
        .boo-mark-container {
        border-left: 1px solid silver;
        }

        .boo-nav-item {
        border: 1px solid transparent;
        margin-bottom: 1px;
        transition: border 0.3s;
        }
        .boo-nav-item.active {
            outline: 1px dashed gray;
            border-radius: 4px;
        }
        .boo-nav-content {
        display: flex;
        flex-direction: column;
            overflow-y: auto;
        padding: 12px;
        height: 100%;
    padding-bottom: 50%;
        }
        .boo-nav-footer {
        padding: 12px;
        }
        .boo-nav-title > span {
        padding: 3px;
        }
        .boo-nav-item-subs {
            padding-left: 1rem;
            transition: background-color 1.3s;
        }
        .boo-nav-top {
            transition: all ease 0.3s;
        }
        .boo-nav-top:hover {
            background: #d8f3dc;
        }
        .boo-nav-footer {
        display: flex;
        flex-direction: column;
        grid-gap: 3px;
        }
        .boo-nav-control {
        display: block;
        border: 1px solid #bbb;
        padding: 3px 12px;
        border-radius: 3px;
        }
        .boo-hov {
        margin-top: 22px;
        transition: all ease 0.0s;
        }
        .boo-hov > .boo-nav-item-subs {

        background: #d5d5d5;
        margin: 3px;
        width: inherit;
        }
        .boo-transparent {
        opacity: 0.5;
        }
        .boo-outlined {
            border: 1px solid #0000002b;
            border-radius: 6px;
        }
        .boo-current-book-selector {
            background-color: white;
    scale: 130%;
    border-radius: 6px;
    cursor: pointer;
        }
        @media screen and (max-width: 900px) {

        }
        .boo-nav-control-group {
            display: grid;
            grid-template-columns: 60px auto;
            padding: 6px;
            border-radius: 3px;
            background: #80808024;
        }
        .boo-nav-control-group > div {
            display: flex;
            justify-content: space-around;
        align-items: center;
        }
        .boo-nav-control-group > div > div {
            background: white;
        }
        .boo-maker {
            cursor:grab;
        }
        .boo-recycler  {
            cursor:no-drop;
            color: #E57373;
            border-color: #EF9A9A;
            align-items: center;
        }
        .boo-nav-control {
            transition: all ease 0.3s;
        }
        .boo-nav-control:hover {
            box-shadow: 1px 1px 6px gray;
        }

        .boo-nav-section .boo-active {
            display: flex;
        }
        .boo-hov > .boo-nav-item-subs {
            padding-top: 22px;
        }
        .boo-list-closed > .boo-nav-item-subs {
            display:  none;
        }
        .boo-nav-name {
            min-width: 100px;
        }
        .boo-puller {
            min-width: 20px;
            padding-right: 0px;
            padding-left: 0px;
        }
        .boo-sheet .boo-nav-item-subs {
            display:  none !important;
        }
        .boo-title-edit .boo-nav-name {
            color: #1976D2;
    outline: 1px solid;
        }
        .boo-main-top {
            display: grid;
            grid-template-columns: auto 30px;
        }
        .boo-tab-zone {
            padding: 3px;
            padding-bottom: 9px;
            overflow: auto;
        }
   .boo-tab {
        display: inline-block;
        padding: 0 10px;
        background: #eeeeee;
        line-height: 1.5;
        font-size: .875rem;
        color: #fff;
        vertical-align: middle;
        white-space: nowrap;
        border-radius: 2px;
        text-transform: uppercase;
        color: gray;
    }
    .boo-tab.active {
        background-color: #32d296;
        color: white;
    }
    .boo-nav-item {
        transition: background-color 0.2s;
    }
    .boo-nav-item:hover {
        background: rgb(0,0,0);
background: linear-gradient(0deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 70%, rgba(0,0,0,0.06) 100%);
    border-radius: 2px;
    }

    </style>

<main class=" ms-sm-auto p-0" id="mainWrapper">

         <div class='boo-container'>
           
           <div class='boo-nav-container'>
            <div class="boo-nav-top uk-padding-small">
                <h4><span class='boo-current-book-selector' uk-icon="triangle-down"></span> <span>Super-book name test of long long name of the book...</span></h4>
            </div>

             <div class="boo-nav-section boo-active">
             <div class="boo-nav-content" id='sortableList'>
               
             </div>
             <div class="boo-nav-footer">
                <div class="boo-nav-control-group">
                    <div><span uk-icon="plus"></span></div>
                    <div>
                        <div class="boo-nav-control boo-maker" title='Create sheet' data-make-type='3' draggable='true'>
                            <span uk-icon="file-text"></span>
                        </div>
                        <div class="boo-nav-control boo-maker" title='Create folder' data-make-type='1' draggable='true'>
                        <span uk-icon="folder"></span>
                        </div>
                        <div class="boo-nav-control boo-maker" title='Create group' data-make-type='2' draggable='true'>
                        <span uk-icon="album"></span>
                        </div>
                    </div>
                </div>
               
               <div class="boo-nav-control boo-recycler dropzzone" title='Drop item here to remove'>
               <span uk-icon="trash"></span> Recycle Bin
               </div>
             </div>
               </div>
           </div>
           
            <div class='boo-main-container'>
                <div class="boo-main-top">
                    <div class="boo-tab-zone">
                    <div class="boo-tab"><span>success</span> <span uk-icon="close"></span></div>
                    <div class="boo-tab active"><span>A new book insidesu</span> <span uk-icon="close"></span></div>
                    <div class="boo-tab"><span>A new book insidesu</span> <span uk-icon="close"></span></div>
                    </div>
                    <div class="boo-tab-dropdown">
                        <span uk-icon="triangle-down"></span>
                    </div>
                </div>

             <!-- Place the first <script> tag in your HTML's <head> -->
                <script src="https://cdn.tiny.cloud/1/qgh5wm6ady2g3daf5a52xzdgehiut1cgawf40xpy65bnmeq3/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>

                <!-- Place the following <script> and <textarea> tags your HTML's <body> -->
                <script>
    tinymce.init({
        selector: '#tiny_place',
        advcode_inline: true,
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough code | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
    });

    // Function to get content from TinyMCE and place it in the textarea
    function getContentAndPlace() {
        var content = tinymce.get('tiny_place').getContent();
        document.getElementById('contenarea').value = content;
    }

    // Function to place content from the textarea into TinyMCE
    function placeContent() {
        var content = document.getElementById('contenarea').value;
        tinymce.get('tiny_place').setContent(content);
    }
</script>

<textarea id='tiny_place'>
    Welcome to TinyMCE!
</textarea>

<div class='uk-button uk-button-default' id='btn_getcontent' onclick='getContentAndPlace()'>Get content</div>
<div class='uk-button uk-button-default' id='btn_placecontent' onclick='placeContent()'>Place content</div>

<textarea name="content" id="contenarea" cols="30" rows="10"></textarea>
           </div>
           
           <div class='boo-mark-container'>
             Hello marbody
           </div>
           
         </div>
         
     </main>

@endsection

@section('page-script')
<script>
class BookerFlow
{
    constructor()
    {
        // Add menu items to header
        const centralMenu = document.querySelector('.th-central-menu');
        centralMenu.innerHTML = "";
        let bookerLogo = document.createElement('div');
        bookerLogo.innerHTML = 'BꝎ₭ΞR';
        bookerLogo.classList.add('th-navbar-item');
        centralMenu.appendChild(bookerLogo);

        let viewType = document.createElement('div');
        viewType.innerHTML = 'Tree';
        viewType.classList.add('th-navbar-item', 'active');
        centralMenu.appendChild(viewType);

        let viewType2 = document.createElement('div');
        viewType2.innerHTML = 'Flow';
        viewType2.classList.add('th-navbar-item');
        centralMenu.appendChild(viewType2);
    }
}

class BookerDef
 {
     
    static get TYPE_FOLDER() {
        return 1;
    }
    
    static get TYPE_GROUP() {
        return 2;
    }
    static get TYPE_ITEM_SHEET() {
        return 3;
    }
 }

class BookerTemplates
{
  static getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
  static getBookerNavItem(iden ,name, type, subitems = [], opened = true) {
    let icon = "folder";
    switch (type) {
      case BookerDef.TYPE_ITEM_SHEET:
        icon = "file-text";
        break;
      case BookerDef.TYPE_FOLDER:
        icon = "folder";
        break;
      case BookerDef.TYPE_GROUP:
        icon = "album";
        break;
    }

    // Create the main <div class="boo-nav-item">
    const mainDiv = document.createElement("div");
    mainDiv.setAttribute('data-type', type);
    mainDiv.classList.add("boo-nav-item");
    mainDiv.setAttribute('draggable', true);
    if (iden == ""){
        mainDiv.id = BookerTemplates.getRandomInt(333,99999567);
    } else {
        mainDiv.id = iden;
    }
    if (!opened){
        mainDiv.classList.add('boo-list-closed');
    }

    // Create the <div class="boo-nav-title">
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("boo-nav-title");

    let puller = document.createElement('span');
    puller.id = '';
    puller.classList.add('boo-puller');
    if (subitems.length > 0){
        if (opened){
            puller.setAttribute('uk-icon', 'chevron-up');
        } else {
            puller.setAttribute('uk-icon', 'chevron-down');
        }
    }
    
    // Create the icon element
    const iconSpan = document.createElement("span");
    iconSpan.setAttribute("uk-icon", icon);

    // Create the name element
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("boo-nav-name");
    nameSpan.textContent = name;

    // Append the icon and name elements to the titleDiv
    titleDiv.appendChild(puller);
    titleDiv.appendChild(iconSpan);
    titleDiv.appendChild(nameSpan);

    // Append the titleDiv to the mainDiv
    mainDiv.appendChild(titleDiv);

    // Create the <div class="boo-nav-item-subs">
    const subsDiv = document.createElement("div");
    subsDiv.classList.add("boo-nav-item-subs", "dropzzone");

    // Loop through subitems and append them using recursion
    subitems.forEach(subitem => {
      const subitemDiv = this.getBookerNavItem("", subitem.name, subitem.type, subitem.subitems);
      subsDiv.appendChild(subitemDiv);
    });

    // Append the subsDiv to the mainDiv
    mainDiv.appendChild(subsDiv);

    return mainDiv;
  }
}

class TreeNav
{
    static makeHanlerSat = false;
    constructor(containerId)
  {
    this.container = document.querySelector("#" + containerId);
    this.container.classList.add('dropzzone');
    let ctor = document.querySelector(".boo-nav-content");
    for (let i = 0 ; i < 15; i++ )
      {
        ctor.appendChild(BookerTemplates.getBookerNavItem("", "Super name " + i, BookerDef.TYPE_ITEM_SHEET));
      }
    
    
    const booNavContent = this.container;
    booNavContent.addEventListener("dragstart", this.handleDragStart.bind(this));
    booNavContent.addEventListener("dragover", this.handleDragOver.bind(this));
    booNavContent.addEventListener("dragenter", this.handleDragEnter.bind(this));
    booNavContent.addEventListener("dragleave", this.handleDragLeave.bind(this));
    booNavContent.addEventListener("drop", this.handleDrop.bind(this));
    booNavContent.addEventListener("dragend", this.handleDragEnd.bind(this));

    const draggableButtons = document.querySelectorAll(".boo-maker");
    Array.from(draggableButtons).forEach(button => {
    button.addEventListener("dragstart", this.handleDragStart.bind(this));
    });
    const recycler = document.querySelector('.boo-recycler');
    // recycler.addEventListener("dragend", this.handleDragEnd.bind(this));
    recycler.addEventListener("dragover", this.handleDragOver);
    recycler.addEventListener("drop", this.handleRemoveContainerDrop);

    if (!TreeNav.makeHanlerSat){
            let boomakers = document.querySelectorAll('.boo-maker');
        Array.from(boomakers).forEach((boom) => {
            boom.addEventListener('dblclick', (e)=>{
                let makeType = boom.getAttribute('data-make-type');
                let newItemToSend = null;
                if (makeType == BookerDef.TYPE_ITEM_SHEET){
                    newItemToSend = BookerTemplates.getBookerNavItem("", "New sheet", BookerDef.TYPE_ITEM_SHEET);
                }
                if (makeType == BookerDef.TYPE_GROUP){
                    newItemToSend = BookerTemplates.getBookerNavItem("", "New group/class", BookerDef.TYPE_GROUP);
                }
                if (makeType == BookerDef.TYPE_FOLDER){
                    newItemToSend = BookerTemplates.getBookerNavItem("", "New folder", BookerDef.TYPE_FOLDER);
                }
                let wrp = document.querySelector('.boo-nav-section.boo-active');
                wrp.querySelector(".boo-nav-content").appendChild(newItemToSend);
            });
        });
        TreeNav.makeHanlerSat = true;
    }

    this.container.addEventListener('click', (e)=> {
        if (e.target.closest('.boo-puller')){
            // Pull expand or shrink item
            let childcontainer = e.target.closest('.boo-nav-item').querySelector('.boo-nav-item-subs');
            let boches = childcontainer.querySelectorAll('.boo-nav-item');
            if (boches.length > 0){
                if (e.target.closest('.boo-nav-item').classList.contains('boo-list-closed'))
                {
                        console.log('CLODDDD :>> ', 5234523);
                        e.target.closest('.boo-nav-item').classList.remove('boo-list-closed');
                        // e.target.closest('.boo-nav-item').querySelector('.boo-puller').innerText = '';
                        e.target.closest('.boo-nav-item').querySelector('.boo-puller').setAttribute('uk-icon', 'chevron-up');
                    } else {
                        console.log('CLO :>> ', 5234523);
                        e.target.closest('.boo-nav-item').classList.add('boo-list-closed');
                        //e.target.closest('.boo-nav-item').querySelector('.boo-puller').innerText = '';
                        e.target.closest('.boo-nav-item').querySelector('.boo-puller').setAttribute('uk-icon', 'chevron-down');
                    }
                } else {
                    e.target.closest('.boo-nav-item').querySelector('.boo-puller').innerText = '';
                    e.target.closest('.boo-nav-item').querySelector('.boo-puller').setAttribute('uk-icon', '');
                    e.target.closest('.boo-nav-item').classList.remove('boo-list-closed');
                }
            }

            if (e.target.closest('.boo-nav-title')){
                let item = e.target.closest('.boo-nav-item');
                let type = item.getAttribute('data-type');
                let id = item.id;
                this.itemTriggerClicked(id, type);
                switch (type) {
                    case 1:
                        // Folder

                    break;
                    case 2:
                        // Group

                    break;
                    case 3:
                        // Item

                    break;

                    default:
                        break;
                }
            }
        });



        this.container.addEventListener('dblclick', (e)=> {
        if (e.target.closest('.boo-nav-title')){


            e.target.closest('.boo-nav-title').classList.add('boo-title-edit');
            let block = e.target.closest('.boo-nav-name');
            let name = block.innerText;
            block.setAttribute('contenteditable', true);
        };
        });

        document.addEventListener('click', (e)=>{
            if (!e.target.classList.contains('boo-nav-name')){
                if (document.querySelector('.boo-title-edit') != null){
                    e.preventDefault();
                    let id = document.querySelector('.boo-title-edit').closest('.boo-nav-item').id;
                    let name = document.querySelector('.boo-title-edit').querySelector('.boo-nav-name').innerText;
                    if (name == ''){
                        name = 'Item';
                        document.querySelector('.boo-title-edit').querySelector('.boo-nav-name').innerText = name;
                    }
                    document.querySelector('.boo-title-edit').querySelector('.boo-nav-name').removeAttribute("contenteditable");
                    document.querySelector('.boo-title-edit').classList.remove('boo-title-edit');
                    this.triggerNameChanged(id, name);
                };
            };

            if (e.target.closest('.boo-nav-item'))
            {
                let itm = e.target.closest('.boo-nav-item');
                if (itm.getAttribute('data-type') != BookerDef.TYPE_FOLDER){
                    
                    this.triggerItemClicked(itm.id, itm.querySelector('.boo-nav-name').innerText, itm.getAttribute('data-type'));
                }
            }
        });
    }



    triggerNameChanged(id, name) {
        if (typeof this.nameChanged === 'function') {
            this.nameChanged(id, name);
        }
    }
    onChangedName(callback) {
        this.nameChanged = callback;
    }


    triggerItemCreated(id, name, type, order) {
        if (typeof this.nameChanged === 'function') {
            this.itemCreated(id, name, type, order);
        }
    }
    onCreatedItem(callback) {
        this.itemCreated = callback;
    }

    triggerItemRemoved(id, name, type) {
        if (typeof this.nameRemoved === 'function') {
            this.itemRemoved(id, name, type);
        }
    }
    onRemovedItem(callback) {
        this.itemRemoved = callback;
    }

    triggerOrderChanged(id, name, type) {
        if (typeof this.orderChanged === 'function') {
            this.orderChanged(id, name, type);
        }
    }
    onChangedOrder(callback) {
        this.orderChanged = callback;
    }

    triggerItemClicked(id, type) {
        if (typeof this.itemClicked === 'function') {
            this.itemClicked(id, type);
        }
    }
    onClickItem(callback) {
        this.itemClicked = callback;
    }


  // Event handler for when an item is dragged
  handleDragStart(event) {
    console.log('Dragstart :>> ', event.target.id);
    event.dataTransfer.setData("text/plain", event.target.id);
    this.draggedType = event.target.getAttribute('data-type');
    if (!event.target.closest(".boo-maker")){

        event.target.classList.add("dragging");
        event.target.classList.add("boo-transparent");
    }
    if (event.target.dataset.makeType < 10){
        event.dataTransfer.setData("text/plain",  event.target.dataset.makeType);
    }
  }

  // Event handler for when an item is dragged over a drop zone
  handleDragOver(event) {
    event.preventDefault();
    console.log('dragovere :>> ', 1);
  }

 // Event handler for when an item enters a drop zone
handleDragEnter(event) {
    console.log('DragEnter :>> ');
    let bohs = document.querySelectorAll('.boo-hov');
    let id = '';
    
    console.log('MAKETYPE IS ' + this.draggedType);
    if (event.target.closest('.boo-nav-item')){
        let dt = event.target.closest('.boo-nav-item').getAttribute('data-type');
        if (dt == BookerDef.TYPE_ITEM_SHEET){
            console.log('dt :>> ', dt);
            event.target.closest('.boo-nav-item').classList.add("boo-sheet");
        } else {

        }
        event.target.closest('.boo-nav-item').classList.add("boo-hov");
        event.target.closest('.boo-nav-item').classList.add("boo-await");
      
      id = event.target.closest('.boo-nav-item').id;
    //   if (!event.target.parentElement.classList.contains('.boo-nav-item-subs')){
    //     console.log('HandleDragEnter navsubs :>> ', 100);
    //     //return;
    //     //id = '';
    //   }
    }
    let botle = this.container.querySelectorAll('.boo-nav-item');
    
      for (let i = 0; i < botle.length; i++){
        if (botle[i].id !== id && id != ''){
            botle[i].classList.remove('boo-hov');
        //console.log('I removed ' + id);
        } 
        botle[i].classList.add('boo-outlined');
      }
      
    
     for (let i = 0; i < botle.length; i++){
        botle[i].classList.add('boo-outlined');
      }
    
    // if (event.target.dataset.dropzone === "true") {
    //   event.target.classList.add("boo-hov"); // Add the "boo-hov" class
    // }
  }


  // Event handler for when an item leaves a drop zone
  handleDragLeave(event) {
    console.log('dragleave :>> ', 1);
        if (event.target.closest('.boo-nav-item-subs')){
          // not worked
          if (event.target != null && event.target.classList.contains(".boo-nav-item")){
            event.target.classList.add("boo-hov");
              console.log(event.target);
          }
  
     // event.target.closest('.boo-nav-item').classList.remove("boo-hov");
  
    }
    // if (event.target.dataset.dropzone === "true") {
    //   event.target.classList.remove("boo-hov"); // Remove the "boo-hov" class
    // }
  }




  handleRemoveContainerDrop(event) {
    console.log('RmoveContainerDropH :>> ');
  event.preventDefault();
  const makeType = event.dataTransfer.getData("text/plain");
    console.log(makeType);
    let el = document.getElementById(makeType);
    if (el != null) {
        el.remove();
    }
    let bohs = document.querySelectorAll('.boo-hov');
        for (let i = 0; i < bohs.length; i++){
            bohs[i].classList.remove('boo-hov');
            bohs[i].classList.remove('boo-await');
        }
  // Remove the dragged item (if it's a valid item)
  setTimeout(() => {
      let bohs = document.querySelectorAll('.boo-outlined');
        for (let i = 0; i < bohs.length; i++){
            bohs[i].classList.remove('boo-await');
            bohs[i].classList.remove('boo-outlined');
        }
  }, 150);
}


  // Event handler for when an item is dropped
  handleDrop(event) {
    event.preventDefault();
    console.log('HanleDrop :>> ');
    let bohs = document.querySelectorAll('.boo-hov');
    let botles = document.querySelectorAll('.boo-outlined')
    for (let i = 0; i < botles.length; i++){
        botles[i].classList.remove('boo-outlined');
        botles[i].classList.remove('boo-transparent');
    }
    


    const makeType = event.dataTransfer.getData("text/plain");
    console.log('DROPPED');
    if (makeType != undefined){
        console.log(makeType);
        console.log('maketype :>> ', event);
        let newItemToSend = null;
        if (makeType == BookerDef.TYPE_ITEM_SHEET){
            newItemToSend = BookerTemplates.getBookerNavItem("", "New sheet", BookerDef.TYPE_ITEM_SHEET);
        }
        if (makeType == BookerDef.TYPE_GROUP){
            newItemToSend = BookerTemplates.getBookerNavItem("", "New group/class", BookerDef.TYPE_GROUP);
        }
        if (makeType == BookerDef.TYPE_FOLDER){
            newItemToSend = BookerTemplates.getBookerNavItem("", "New folder", BookerDef.TYPE_FOLDER);
        }
            if (event.target.closest('.boo-nav-item')){
                if (event.target.closest('.boo-nav-item').getAttribute('data-type') 
                != BookerDef.TYPE_ITEM_SHEET &&
                !(event.target.closest('.boo-nav-item').getAttribute('data-type') == BookerDef.TYPE_GROUP
                && makeType == BookerDef.TYPE_FOLDER)
                ){
                    let etc = event.target.closest('.boo-nav-item').querySelector('.boo-nav-item-subs');
                    if (etc != null && newItemToSend != null){
                        console.log('newItemToSend :>> ', newItemToSend);
                        console.log('etc :>> ', etc);
                        etc.appendChild(newItemToSend);

                    }
                } else {
                   console.log("you cannot insert an item into the page and you cannot insert folder into group"); 
                }
            } else {
                let etc =  event.target.closest('.dropzzone');
                if (etc != null){

                    etc.appendChild(newItemToSend);
                }
            }
    }
    // Reset the styles
    event.target.classList.remove("drag-over");
    this.clearhovers();
  }

  // Event handler for when an item is finished dragging
handleDragEnd(event) {
    console.log('HandleDragEnd :>> ');
    this.resort(event);
    this.clearhovers();
    event.target.classList.remove("dragging");
    console.log("etarget", event.target);

    if (event.target.classList.contains('.boo-recycler')){
        alert("recy");
    }
  }
    
resort(event) {
  const aim = event.target;
  console.log('Resort :>> ');
  let aimRect = aim.getBoundingClientRect();
   //alert(aim.id);
   // if (aim.closest('.boo-nav-item-subs')){
   //   alert('BOO!');
   // }
  let  mouseY = event.clientY + window.scrollY;
   mouseY += 44;
  const botles = this.container.querySelectorAll('.boo-nav-item');
   if (botles.length == 0){ return; }
  const marginHeight = 44; // Adjust this value based on your margin size
  let indexToMove = -1; // Initialize to -1, indicating no target index found

  for (let i = 0; i < botles.length; i++) {
    const currentItem = botles[i];
    const currentItemRect = currentItem.getBoundingClientRect();
    const itemTop = currentItemRect.top + window.scrollY;
    const itemBottom = itemTop + currentItemRect.height + marginHeight;
    // if (aimRect.top <  currentItemRect.top){
    //   mouseY += 44;
    // } else {
    //   mouseY += 44;
    // }
    
    if (mouseY >= itemTop && mouseY <= itemBottom) {
      if (mouseY < itemBottom && mouseY > itemTop + marginHeight){
        
          let subs = this.container.querySelectorAll('.boo-nav-item-subs');
        console.log(subs.length);
        for (let i = 0; i < subs.length; i++){
          let subcontainer = subs[i].getBoundingClientRect();
          if (mouseY - 44 < subcontainer.top + subcontainer.height && mouseY > subcontainer.top){
            console.log(itemBottom, " - ", mouseY, " - ",  itemTop);
            
            let subs = this.container.querySelectorAll('.boo-nav-item-subs');
            console.log(subs.length);
            for (let i = 0; i < subs.length; i++){
              let subcontainer = subs[i];
              if (subcontainer.closest('.boo-hov')){
                
                let makeType = aim.getAttribute('data-type');
                if (subcontainer.closest('.boo-nav-item')){
                    let dt = subcontainer.closest('.boo-nav-item').getAttribute('data-type');
                    console.log('dt :>> ', dt, makeType);

                if ( 
                (dt == BookerDef.TYPE_ITEM_SHEET &&
                (makeType == BookerDef.TYPE_GROUP
                 || makeType == BookerDef.TYPE_FOLDER))
                 || (dt == BookerDef.TYPE_ITEM_SHEET && makeType == BookerDef.TYPE_ITEM_SHEET)
                 || (dt == BookerDef.TYPE_GROUP && makeType == BookerDef.TYPE_FOLDER)
                ){
                    //event.target.closest('.boo-nav-item').querySelector('.dropzzone').appendChild(newItemToSend);
                    console.log("you cannot insert an item into the page and you cannot insert folder into group"); 

                } else {
                    console.log('YOU CAN :>> ');
                    const newSubElement = aim.cloneNode(true);
                    subcontainer.appendChild(newSubElement);
                    aim.remove();
                }

                } else {
                    const newSubElement = aim.cloneNode(true);
                    subcontainer.appendChild(newSubElement);
                    aim.remove();
                }

                
                //botles[indexToMove].classList.remove("boo-hov");
                this.clearhovers();
                this.refreshPullers();
                this.harvestStructure();
                return;
              }
            }
            
            return;
          }
        }
        //return;
      }
      indexToMove = i;
      //alert(i);
      break;
    }
  }

  if (indexToMove !== -1) {
    // Create a clone of the aim element
    const newElement = aim.cloneNode(true);
    // Remove the original aim element

    // Check if the element should be inserted before the found index
    if (aim !== botles[indexToMove]) {
      botles[indexToMove].parentNode.insertBefore(newElement, botles[indexToMove]);
      aim.remove();
    } else if (indexToMove < botles.length - 1) {
      if (indexToMove != 0){
        botles[indexToMove + 1].parentNode.insertBefore(newElement, botles[indexToMove]);
        aim.remove();
      }
    } else {
      botles[indexToMove].parentNode.appendChild(newElement); // Add it as the last element
      aim.remove();
    }

    // Reset any hover styles or classes
    botles[indexToMove].classList.remove("boo-hov");
  }
  this.clearhovers();
  this.refreshPullers();
  this.harvestStructure();
}


harvestStructure()
{
    //alert('halfjadskljf');
    let items = this.container.querySelectorAll('.boo-nav-item');
    console.log(items.length);
    let result = [];
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        let obj = {
            id : items[i].id,
            name : items[i].querySelector('.boo-nav-name').innerText,
            closed : items[i].classList.contains('boo-list-closed'),
            subitems : [],
            level : 1,
            parent : ''
        };
        let checker = items[i].parentElement.closest('.boo-nav-item');
        if (checker != null){
            obj.parent = checker.id;
        }
        while (checker != null){
            obj.level++;
            checker = checker.parentElement.closest('.boo-nav-item');
            if (obj.level == 100){
                break;
            }
        }
        result.push(obj);
    }
    console.log(result);
    return result;
}



clearhovers(){
    console.log('Clearhovers :>> ');
    setTimeout(() => {
      let bohs = document.querySelectorAll('.boo-hov');
        for (let i = 0; i < bohs.length; i++){
            bohs[i].classList.remove('boo-hov');
            bohs[i].classList.remove('boo-await');
        }
  }, 150);
}
clearAwaiters(){
    console.log('clearAwaiters :>> ');
    setTimeout(() => {
      let bohs = document.querySelectorAll('.boo-outlined');
        for (let i = 0; i < bohs.length; i++){
            bohs[i].classList.remove('boo-await');
            bohs[i].classList.remove('boo-outlined');
        }
  }, 150);
}
  
refreshPullers(){
    let bohs = document.querySelectorAll(".boo-nav-item");
    console.log('bohs.length :>> ', bohs.length);
    for (let i = 0; i < bohs.length; i++){
        console.log('setIcons :>> ');
        let childcontainer = bohs[i].querySelector('.boo-nav-item-subs');
        let boches = childcontainer.querySelectorAll('.boo-nav-item');
        if (boches.length > 0){
            //bohs[i].querySelector('.boo-puller').innerText = '';
            if (bohs[i].classList.contains('boo-list-closed')){
                bohs[i].querySelector('.boo-puller').setAttribute('uk-icon', 'chevron-down');
                console.log("CASE CLOSED");
            } else {
                bohs[i].querySelector('.boo-puller').setAttribute('uk-icon', 'chevron-up');
                console.log("CASE OPENED");
            }
        } else {
            bohs[i].querySelector('.boo-puller').setAttribute('uk-icon', '');
        }
    }
}

}


function cb(id, name){
    alert( name);
};
let bf = new BookerFlow();
let a = new TreeNav('sortableList');
a.onChangedName(cb);
/*
  let subs = this.container.querySelectorAll('.boo-nav-item-subs');
        console.log(subs.length);
        for (let i = 0; i < subs.length; i++){
          let subcontainer = subs[i];
          if (subcontainer.closest('.boo-hov')){
            if (subcontain.getBoundingClientRect();)
            alert(i);
            botles[indexToMove].classList.remove("boo-hov");
            return;
          }
        }
        */

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