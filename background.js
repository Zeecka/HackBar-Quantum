var portFromCS;

function connected(p) {
  portFromCS = p;
  portFromCS.postMessage({msg: "Connected!"});
  portFromCS.onMessage.addListener(function(m) {
    console.log("Background receive:")
    console.log(m.msg);
  });
}

browser.runtime.onConnect.addListener(connected);


// portFromCS.postMessage({msg: "My Msg To Panel"});
