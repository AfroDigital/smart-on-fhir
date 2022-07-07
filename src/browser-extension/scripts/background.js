const loadApp =()=>{
console.log("injecting");
   browser.tabs.create({
     "url": "/pages/app-page.html"
   });
}




browser.browserAction.onClicked.addListener(loadApp);