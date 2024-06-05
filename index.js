//Import firebase database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//Link to database in Firebase
const appSettings = {
    databaseURL: "https://shoutouts-81de7-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings) //Connects Firebase with individual project database under the appSettings variable
const database = getDatabase(app) //Feeds it the app variable
const shoutoutInDB = ref(database, "shoutout") //Create a reference. The database and name of reference. 

//Get element by ID for <ul> <button> <textarea> 

const textAreaEl = document.getElementById("text-area")
const submitButtonEl = document.getElementById("submit-button")
const shoutoutListEl = document.getElementById("shoutout-list")

//Submit button add event listener

submitButtonEl.addEventListener("click", function () {
    let inputValue = textAreaEl.value
    push(shoutoutInDB, inputValue)

    appendShoutoutToListEl(inputValue)

    clearTextAreaEl()
})

//Load items from Firebase

onValue(shoutoutInDB, function (snapshot) {
    if (snapshot.exists()) {
        let shoutoutArray = Object.entries(snapshot.val())

        for (let i = 0; i < shoutoutArray.length; i++) {
            let currentShoutout = shoutoutArray[i]

            appendShoutoutToListEl(currentShoutout)
        }
    } else {
        shoutoutListEl.innerHTML = "No shoutouts given yet"
    }

})

//Add shoutout to list 
function appendShoutoutToListEl(input) {
    let shoutoutID = input[0]
    let shoutoutValue = input[1]

    let newEl = document.createElement("li")
    newEl.textContent = shoutoutValue

    shoutoutListEl.append(newEl)

}


//Clear input field
function clearTextAreaEl() {
    textAreaEl.value = ""
}
