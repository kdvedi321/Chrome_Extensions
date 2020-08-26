// console.log("Inside popup.js");
const button = document.querySelector(".btn");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
button.addEventListener("click", async function(){
    let toBeBlocked = input.value;
    if(toBeBlocked){
        await sendTobackground(input.value);
        addToList(toBeLocked)
        // send message to background
        input.value = "";
    }
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    //     console.log(tabs);
    //     chrome.tabs.sendMessage(tabs[0].id, "Message from popup");
    // })
})

function sendTobackground(message){
    return new Promise(function(resolve, reject){
        chrome.runtime.sendMessage(message, function(response){
            // console.log("Received from background.js")
            resolve(true);
        });
    })
}
// when you will click on popup
// init => populate popup with data from background
function populate(){
    let list = await sendTobackground("getlist");
    console.log(list);
    for(let i=0;i<list.length;i++){
        addToList(list[i].site);
    }
    // make request to background
    // populate the list
}
populate();
// reintialize => bg request => populate list
function addToList(toBeBlocked){
    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    li.innerHTML = `${toBeBlocked} <i class="fas fa-times"></i>`;
    ul.appendChild(li);
    let i = li.querySelector("i");
    i.addEventListener("click", function(){
        // let isRemoved = removefromdb(i.parentNode.textContent);
        // console.log();
        // if(isRemoved){

        // }
        i.parentNode.remove();
    })
}