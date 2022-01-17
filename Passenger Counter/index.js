// document.getElementById("counter").innerText = 5

let counter = document.getElementById("counter")
let history = document.getElementById("history-num")
let saved = document.getElementById("total-num")
let count = 0

let savedCounter = 0

function inc(){
    count += 1
    counter.innerText = count
}

function total(count){
    savedCounter += count
    saved.innerText = savedCounter; 
}

function save(){
    history.innerText += " + "+ count
    total(count)
    count = 0
    counter.innerText = count
}