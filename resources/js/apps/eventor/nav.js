class Nav {


    static navButtons(containerId = "", position = "") {
        let goBottom = "";
        if (position === "bottom") {
          goBottom = "#" + containerId;
        }
        let result = "";
        result += `<div class='uk-section uk-padding'><div class='uk-flex uk-flex-center'>
        <div class="uk-container" id="${containerId}">
        <div class="uk-button-group evt-navigation">`;
      
        result += `<a type="uk-button" class="uk-button uk-button-default" id="act_moveBottom">
        <span uk-icon="chevron-left"></span></a>`;
        result += `<a type="button" class="uk-button uk-button-default" id="act_expandBottom">
        <span uk-icon="chevron-double-left"></span>
        </a>`;
        result += `<button type="button" id="f_showEmptyRows" class="uk-button uk-button-default uk-hidden" title="HIDEEMPTY">
        <span uk-icon="more"></span>
        </button>`;
        result += `<button type="button" id="f_showTotalCols" class="uk-button uk-button-default uk-hidden" title="HIDETOTALS">
        <span uk-icon="more-vertical"></span>
        </button>`;
      
        result += `<button type="button" href="#modal-container" class="uk-button uk-button-default" uk-toggle title="Navigator">
        <span uk-icon="server"></span>
        </button>`;
        result += `<button type="button" onclick="tf_create(1, 0);" class="uk-button uk-button-default uk-hidden" title="NEWEVENT">
        <span uk-icon="file-text"></span>
        </button>`;
        result += `<a type="button" class="uk-button uk-button-default" id="act_expandTop">
        <span uk-icon="chevron-double-right"></span>
        </a>`;
        result += `<a type="button" class="uk-button uk-button-default" id="act_moveTop">
        <span uk-icon="chevron-right"></span>
        </a>`;
        result += `</div>
        </div>
        </div>
        </div>
        <br>`;
      
        return result;
      }


      static topTools() {
        let result = `
        <div class="uk-card uk-card-default flex-space">
          <div class="uk-text-bold uk-padding-small uk-text-large">Section: All</div>
          <div class="uk-padding-small">
            <div class="uk-margin" uk-margin="">
              <div uk-form-custom="target: true" class="uk-form-custom uk-first-column">
                <input class="uk-input uk-form-width-auto" type="text" placeholder="Select file" aria-label="Custom controls">
              </div>
              <button class="uk-button uk-button-default">Search</button>
            </div> 
          </div>
          <div class="uk-padding-small">
            <button class="uk-button uk-button-default">Filter</button>
            <a class="uk-button uk-button-default" id="callCreateModal" href="#modalHtmlEditor" uk-toggle="" aria-expanded="false">Add Event</a>
          </div>
        </div>
        `;
        return result;
      }
}