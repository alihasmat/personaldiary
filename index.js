
const simpleForm = document.querySelector("#simple-form")

//grabbing textarea and displying it
const textArea = document.querySelector("#text");

const displayItems = document.querySelector("#display-items")
const navButton = document.querySelector("#nav-button")

const submitButton = document.getElementById("submit-button")
function enableButton() {  
    submitButton.disabled = false;
    submitButton.style.backgroundColor = "#003049";
}

//localstorage
let count = 1, 
practiceDiaryApp = [];

load();
renderRows();

//clear the storage
const clearStorage = document.getElementById("refresh-icon")
clearStorage.addEventListener("click", function() {
    localStorage.clear();
})

function addToDom(e) {

    //it will prevent the form from being refershed every time we submit
    e.preventDefault();

    // //create a new button inside the section > div, append it with displayButton
    // displayButton = document.createElement("button");
    // displayButton.className = "display-button";
    // displayButton.innerText = count;
    // navButton.appendChild(displayButton);

    const textValue = textArea.value;

    renderRow(textValue);

    practiceDiaryApp.push(textValue);
    save();

    
}

function save() {
    let diaryApp = JSON.stringify(practiceDiaryApp)
    localStorage.setItem("practiceDiaryApp", diaryApp);
}

function load() {
    let retrievedData = localStorage.getItem("practiceDiaryApp")
    practiceDiaryApp = JSON.parse(retrievedData);

    if(practiceDiaryApp == null) {
        practiceDiaryApp = [];
    }
}

function renderRows() {
    practiceDiaryApp.forEach( diary => {
        renderRow(diary, null)
    })
}

function renderRow(textValue) {

    //create a new button inside the section > div, append it with displayButton
    let displayButton = document.createElement("button");
    displayButton.className = "display-button";
    displayButton.innerText = count;
    navButton.appendChild(displayButton);

    //create a new element, display what is typed in textarea and appending it with section element
    let displayText = document.createElement("div");
    displayText.className = "display-text";
    displayText.innerText = textValue;
    displayText.style.display = "none";
    displayButton.appendChild(displayText);

    //clear the value of input text
    textArea.value = "";
    
    //creating delete icon
    let deleteItem = document.createElement("i");
    deleteItem.className = "fa fa-trash";
    deleteItem.style.display = "none";
    displayButton.appendChild(deleteItem);
    
    //click the new button we created and display the text;
    displayButton.addEventListener("click", function() {
        const allEntries = document.querySelectorAll(".display-text");
        const allDeleteItems = document.querySelectorAll(".fa-trash");
    
        for(var i = 0; i < allDeleteItems.length; i++) {
            allDeleteItems[i].style.display = "none";
        }
        
        for(var i = 0; i < allEntries.length; i++) {
            allEntries[i].style.display = "none";
            allDeleteItems[i].addEventListener("click", function() {
                this.parentNode.remove();
            })
        }
        
        displayText.style.display = "block";
        deleteItem.style.display = "block";
        
    });
    count++;
}


simpleForm.addEventListener("submit", addToDom)
