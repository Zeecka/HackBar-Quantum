
    /****************************/
    /* SAVING / UPDATING FIELDS */
    /****************************/
    
    var myWindowId = ""; // Current Windows
    
    // TODO: Debug --> 
    // https://developer.mozilla.org/fr/Add-ons/WebExtensions/extension_des_outils_de_developpement#Travailler_avec_les_scripts_de_contenus
    // https://stackoverflow.com/questions/40996014/typeerror-api-is-undefined-in-content-script-or-why-cant-i-do-this-in-a-cont
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
    
    