// DOM shit
const inputEl = document.getElementById("input")
const saveBtnEl = document.getElementById("save-btn")
const listEl = document.getElementsByTagName("ul")[0]
const deleteAllBtnEl = document.getElementById("deleteAll-btn")

// Get list from localStorage

let list = JSON.parse(localStorage.getItem("list"))

if (!list)
    list = []

// Event Listeners
saveBtnEl.addEventListener("click", save)
deleteAllBtnEl.addEventListener("click", () => {
    list = []
    localStorage.clear()
    localStorage.setItem("list", JSON.stringify([]))
    renderList()
})

inputEl.addEventListener("keypress", event => {
    if (event.key == "Enter"){
        saveBtnEl.click()
    }
})

function save(){
    input = inputEl.value.trim()
    if (input){ // if the form is filled
        list.push(input)
        inputEl.value = ""
    }
    else{ // save the current tab
        chrome.tabs.query({active: true, currentWindow: true}, tabs => list.push(tabs[0].url))
    }
    localStorage.setItem("list", JSON.stringify(list))
    renderList()
}

function renderList(){
    let tmpList = ""
    for (let i = 0; i < list.length; i++) {
        let link = list[i]
        if (list[i].slice(0, 4) != "http" && list[i].slice(0, 5) != "https")
            link = "https://" + list[i]

        tmpList += `<li id="list-${i}">
                        <a target="_blank" rel="noreferrer noopener" href="${link}">${list[i]}</a>
                        <input type="image" onclick="deleteItem(${i})" src="resources//remove.png" class="delete"/>
                    </li>`
    }

    listEl.innerHTML = tmpList
}

function deleteItem(index){
    toBeDeleted = document.getElementById("list-"+index)
    toBeDeleted.remove()
    delete list[index]
    list = list.join('').split('')
    localStorage.setItem("list", JSON.stringify(list))
    renderList()
}

renderList()