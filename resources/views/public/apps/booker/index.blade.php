@extends('public.template.template')

@section('page-styles')
<link rel="stylesheet" href="{{ asset('resources/css/apps/budget/template.css') }}">
@endsection


@section('content')
<style>
        body {
            font-family: sans-serif;
        }
        .boo-container {
        display: grid;
        grid-template-columns: 280px auto 280px;
        min-height: calc(100vh - 42px);
        }
        .boo-nav-container > div {
        border-right: 1px solid silver;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        height: calc(100vh - 42px);
        }
        .boo-mark-container {
        border-left: 1px solid silver;
        }

        .boo-nav-item {
        border: 1px solid transparent;
        margin-bottom: 1px;
        transition: border 0.3s;
        }
        .boo-nav-content {
        display: flex;
        flex-direction: column;
            overflow-y: auto;
        padding: 12px;
        }
        .boo-nav-footer {
        padding: 12px;
        }
        .boo-nav-title > span {
        padding: 6px;
        }
        .boo-nav-item-subs {
            padding-left: 1rem;
            transition: background-color 1.3s;
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
        .boo-nav-section {
            display: none;
        }
        .boo-nav-section .boo-active {
            display: flex;
        }
    </style>

<main class=" ms-sm-auto p-0" id="mainWrapper">
         
         <div class='boo-container'>
           
           <div class='boo-nav-container'>
             <div class="boo-nav-section boo-active">
             <div class="boo-nav-content" id='sortableList'>
               
             </div>
             <div class="boo-nav-footer">
                <div class="boo-nav-control-group">
                    <div><span uk-icon="plus"></span></div>
                    <div>
                        <div class="boo-nav-control boo-maker" title='Create sheet' data-make-type='1' draggable='true'>
                            <span uk-icon="file-text"></span>
                        </div>
                        <div class="boo-nav-control boo-maker" title='Create folder' data-make-type='2' draggable='true'>
                        <span uk-icon="folder"></span>
                        </div>
                        <div class="boo-nav-control boo-maker" title='Create group' data-make-type='3' draggable='true'>
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
             Hello document body
           </div>
           
           <div class='boo-mark-container'>
             Hello marbody
           </div>
           
         </div>
         
     </main>

@endsection

@section('page-script')
<script>

class BookerDef
 {
  static get TYPE_ITEM_SHEET() {
    return 1;
  }

  static get TYPE_FOLDER() {
    return 2;
  }

  static get TYPE_GROUP() {
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
  
  static getBookerNavItem(iden ,name, type, subitems = []) {
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


    // Create the <div class="boo-nav-title">
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("boo-nav-title");

    // Create the icon element
    const iconSpan = document.createElement("span");
    iconSpan.setAttribute("uk-icon", icon);

    // Create the name element
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("boo-nav-name");
    nameSpan.textContent = name;

    // Append the icon and name elements to the titleDiv
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

class BookerNavigator
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

    if (!BookerNavigator.makeHanlerSat){
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
        BookerNavigator.makeHanlerSat = true;
    }

  }

  // Event handler for when an item is dragged
  handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
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
  }

 // Event handler for when an item enters a drop zone
  handleDragEnter(event) {
    
    let bohs = document.querySelectorAll('.boo-hov');
    let id = '';
    if (event.target.closest('.boo-nav-item')){
    //console.log(event.target);
      event.target.closest('.boo-nav-item').classList.add("boo-hov");
      event.target.closest('.boo-nav-item').classList.add("boo-await");
      id = event.target.closest('.boo-nav-item').id;
    }
    let botle = this.container.querySelectorAll('.boo-nav-item');
    
      for (let i = 0; i < bohs.length; i++){
        if (bohs[i].id !== id && id != ''){
        bohs[i].classList.remove('boo-hov');
        console.log('I removed ' + id);
        } 
        bohs[i].classList.add('boo-outlined');
      }
      
    
     for (let i = 0; i < botle.length; i++){
        botle[i].classList.add('boo-outlined');
      }
    
    if (event.target.dataset.dropzone === "true") {
      event.target.classList.add("boo-hov"); // Add the "boo-hov" class
    }
  }

  // Event handler for when an item leaves a drop zone
  handleDragLeave(event) {
        if (event.target.closest('.boo-nav-item-subs')){
          // not worked
    console.log(event.target.id);
  
     // event.target.closest('.boo-nav-item').classList.remove("boo-hov");
  
    }
    if (event.target.dataset.dropzone === "true") {
      event.target.classList.remove("boo-hov"); // Remove the "boo-hov" class
    }
  }




  handleRemoveContainerDrop(event) {
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
                    event.target.closest('.boo-nav-item').querySelector('.dropzzone').appendChild(newItemToSend);
                } else {
                   console.log("you cannot insert an item into the page and you cannot insert folder into group"); 
                }
            } else {
                event.target.closest('.dropzzone').appendChild(newItemToSend);
            }
    }
    // Reset the styles
    event.target.classList.remove("drag-over");
    this.clearhovers();
  }

  // Event handler for when an item is finished dragging
  handleDragEnd(event) {
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
                
                const newSubElement = aim.cloneNode(true);
                subcontainer.appendChild(newSubElement);
                aim.remove();
                
                //botles[indexToMove].classList.remove("boo-hov");
                this.clearhovers();
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
}

clearhovers(){
    setTimeout(() => {
      let bohs = document.querySelectorAll('.boo-hov');
        for (let i = 0; i < bohs.length; i++){
            bohs[i].classList.remove('boo-hov');
            bohs[i].classList.remove('boo-await');
        }
  }, 150);
}
clearAwaiters(){
    setTimeout(() => {
      let bohs = document.querySelectorAll('.boo-outlined');
        for (let i = 0; i < bohs.length; i++){
            bohs[i].classList.remove('boo-await');
            bohs[i].classList.remove('boo-outlined');
        }
  }, 150);
}
  
}

let a = new BookerNavigator('sortableList');

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