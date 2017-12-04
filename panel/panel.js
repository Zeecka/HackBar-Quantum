var myWindowId; // Current Windows ID



$( document ).ready(function() {
    
    $(".togglenav").click(function() {
        $(".togglenav").not(this).removeClass("active");
        $(this).toggleClass("active");
    });
    
    $('body').click(function(evt){
       if($(evt.target).closest('.togglenav').length)
            return;
       if($(evt.target).closest('.menu').length)
            return;
       if($(evt.target).closest('.menuitem').length)
            return;
        $(".togglenav").not(this).removeClass("active");
    });
    
    
    $('#checkBoxPost').change(function() {
        if (this.checked) {
            $("#section3").show();
        } else {
            $("#section3").hide();
        }
    });
    $('#checkBoxCookies').change(function() {
        if (this.checked) {
            $("#section4").show();
        } else {
            $("#section4").hide();
        }
    });
    $('#checkBoxReferrer').change(function() {
        if (this.checked) {
            $("#section5").show();
        } else {
            $("#section5").hide();
        }
    });
    
    
    /****************************/
    /* SAVING / UPDATING FIELDS */
    /****************************/
    
    var myWindowId = ""; // Current Windows
    
    // TODO: Debug --> 
    // https://developer.mozilla.org/fr/Add-ons/WebExtensions/extension_des_outils_de_developpement#Travailler_avec_les_scripts_de_contenus
    
    // When the user mouses out then save the currents values into browser
    window.addEventListener("mouseout", () => {
      browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
        contentToStore = {};
        save = {};
        save[0] = $("#GETAREA").val();
        save[1] = $("#POSTDATA").val();
        save[2] = $("#COOKIES").val();
        save[3] = $("#REFERER").val();
        contentToStore[tabs[0].url] = save; // Save Array: URL ==> Data
        browser.storage.local.set(contentToStore);
      });
    });
    
    
    
    
    // Update the Hackbar Content
    function updateContent(){
      browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
          return browser.storage.local.get(tabs[0].url); // Recover current Data
        })
        .then((storedInfo) => {
          if(storedInfo[Object.keys(storedInfo)[0]]) // If Data existed, Recover
          {
            $("#GETAREA").val(storedInfo[Object.keys(storedInfo)[0]][0]); 
            $("#POSTDATA").val(storedInfo[Object.keys(storedInfo)[0]][1]);
            $("#COOKIES").val(storedInfo[Object.keys(storedInfo)[0]][2]);
            $("#REFERER").val(storedInfo[Object.keys(storedInfo)[0]][3]);
          }
        });
    }
    
    
    
    
    // Update Content when updating the tab (i.e. new page)
    browser.tabs.onUpdated.addListener(updateContent);
    
    // Update Content when activating the tab
    browser.tabs.onActivated.addListener(updateContent);
    
    // On Start, setting current window and updating hackbar
    browser.windows.getCurrent({populate: true}).then((windowInfo) => {
        myWindowId = windowInfo.id;
        updateContent();
    });
    
    
    
    /***********/
    /* ACTIONS */
    /***********/
    
    
    
    // "Load URL"
    $("#loadurl").click(function(){
        browser.tabs.query({active:true,currentWindow:true}).then(function(tabs){
            currentUrl = tabs[0].url // Recover URL
            $("#GETAREA").val(currentUrl); // Updating URL in hackbar field
            // Trying to recover POST, COOKIES and REFERER Data
            storedInfo = browser.storage.local.get(currentUrl);
            if (storedInfo){
                $("#POSTDATA").val(storedInfo[Object.keys(storedInfo)[0]][1]);
                $("#COOKIES").val(storedInfo[Object.keys(storedInfo)[0]][2]);
                $("#REFERER").val(storedInfo[Object.keys(storedInfo)[0]][3]);
            } else { // Reset fields
                $("#POSTDATA").val("");
                $("#COOKIES").val("");
                $("#REFERER").val("");
            }
        });
    });
    
    
    
});
