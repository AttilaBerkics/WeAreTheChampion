// fiebase database connection
import { initializeApp }   from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endrosement-8ba7b-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

// const elements connected to the DOM
const inputEl = document.getElementById("input-El")
const publishBtnEl = document.getElementById("publish-btn")
const listEl = document.getElementById("list-El")

// push
publishBtnEl.addEventListener ("click", function( ) {
    let inputValue = inputEl.value
    push (endorsementListInDB, inputValue)
    
    inputEl.value = ""
})

// onValue
onValue ( endorsementListInDB, function(snapshot){
     
    if (snapshot.exists()) {
        let listArr = Object.entries(snapshot.val())
         
        clearScreenList()
         
        for (let i = 0; i < listArr.length; i++ ){
        let currentItem = listArr[i] 
        let currentID = currentItem[0]
        let currentValue = currentItem[1]
       
        appendItemToEndorsementListEl(currentItem)
        } 
    } else {
      listEl.innerHTML = "No item in the list..."
      listEl.style = "color: grey;"  
    }
})

function appendItemToEndorsementListEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement ("li")
    
    newEl.textContent = itemValue  
    
    listEl.append(newEl)
    
    newEl.addEventListener("click" , function(){
        let exactLocationOfItemInDB = ref(database, `endorsementList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })  
}

function clearScreenList(){
    listEl.innerHTML = ""
}
