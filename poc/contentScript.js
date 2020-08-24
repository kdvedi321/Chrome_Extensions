// console.log("My first extension");
function replaceImg() {
    let imgPaths = [
        "images/img-1.jpg",
        "images/img-1.jpg",
        "images/img-1.jpg",
        "images/img-1.jpg",
        "images/img-1.jpeg",
    ];
    let aIP = document.querySelectorAll("img");
    for(let i=0;i<aIP.length;i++){
        let idx = Math.floor(Math.random()*imgPaths.length);
        let fullPath = chrome.extension.getURL(imgPaths[idx]);
        console.log(fullPath);
        aIP[i].src = fullPath;
        aIP[i].srcset = fullPath;
    }
}
let message = {greeting: "hello"};

chrome.runtime.sendMessage(message, function(response){
    console.log("Received from background.js");
    console.log(response);
});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(sender);
        // if(request.greeting=="hello"){
        //     console.log("Received from popup");
        // }
        replaceImg();
    }
)