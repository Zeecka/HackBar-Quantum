var myWindowId; // Current Windows ID
    
// content-script.js

var myPort = browser.runtime.connect({name:"port-hackbar"});
myPort.postMessage({msg: "Connecting..."});

myPort.onMessage.addListener(function(m) {
  console.log("Panel receive: ");
  console.log(m.msg);
});


// myPort.postMessage({msg: "My Message To background"});



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
    
    
    
    /***********/
    /* ACTIONS */
    /***********/

    
    
    // "Load URL"
    $("#loadurl").click(function(){
        myPort.postMessage({msg: "they clicked the button!"});
    });
    
    
    
});
