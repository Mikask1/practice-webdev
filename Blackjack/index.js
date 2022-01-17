// DOM shit
// Text-element
let sumPlayerEl = document.getElementById("player-sum")
let sumDealerEl = document.getElementById("dealer-sum")
let cardsEl = document.getElementById("cards")
let messageEl = document.getElementById("message")
let chipsEl = document.getElementById("chips")
let remCardsEl = document.getElementById("rem-cards")

// Button-element
let startButtonEl = document.getElementById("start")
let newButtonEl = document.getElementById("new-card")
let standButtonEl = document.getElementById("stand")

const cost = 5
let player = {name: "Darren", chips: 200}

// deck of 52 cards
let deck = []
function generateNewDeck(){
    for (let i = 1; i <= 13; i++){
        deck.push(i)
        deck.push(i)
        deck.push(i)
        deck.push(i)
    }
}
generateNewDeck()

console.log(deck)
let playerCards = []
let dealerCards = []

let isAlive = true

let sumPlayer = 0
let sumDealer = 0

let message = ""

function sum(array){
    if (array.length == 1){
        return array[0]
    }
    let sumArray = 0
    for (let i = 0; i < array.length; i++){
        sumArray += array[i];
    }
    return sumArray
}

function generateRandomCard(){
    if (deck.length == 0) generateNewDeck()
    if (deck.length == 1) return deck.pop()
    let randomNumber = Math.floor(Math.random() * (deck.length-1)) + 1;
    let randomCard = deck[randomNumber]
    delete deck[randomNumber]
    deck = deck.filter(Number)
    remCardsEl.innerText = "Remaining Cards: " + deck.length
    return randomCard
}

function startGame(){
    // Restart graphics
    newButtonEl.style.display = "inline-flex"
    standButtonEl.style.display = "inline-flex"
    startButtonEl.style.display = "none"

    player.chips -= cost
    chipsEl.innerText = "Chips: "+player.chips

    // if player is bankrupt
    if (player.chips == 0){
        newButtonEl.style.display = "none"
        standButtonEl.style.display = "none"
        isAlive = false
        messageEl.innerText = "Game OVER. Start Again?"
        startButtonEl.innerText = "NEW GAME"
        player.chips = 200 + cost
        return
    }

    isAlive = true

    // generate a random number that is not an immediate lose (above 21)
    do {
        playerCards = [generateRandomCard(), generateRandomCard()]
    }while(sum(playerCards) > 21)
    
    dealerCards = [generateRandomCard()]

    messageEl.innerText = "Want to play a round?"

    renderGame()
}

function renderGame(){
    sumPlayer = sum(playerCards)
    sumDealer = sum(dealerCards)

    sumPlayerEl.innerText = "Player sum: "+sumPlayer
    sumDealerEl.innerText = "Dealer sum: "+sumDealer

    // Shows the cards taken
    cardsEl.innerText = "Cards: "
    for (let i = 0; i < playerCards.length; i+=1){
        if (i == 0){ // if it's the first one, don't add "  -  "
            cardsEl.innerText += "  "+playerCards[i]
            continue
        }
        cardsEl.innerText += "  -  " + playerCards[i]
    }

    if (isAlive){
        if (sumPlayer < 21){
            message = "Do you want to draw another card?"
        }
        else{ // immediate lose when taking a card
            message = "You lose"

            if (sumPlayer == 21){ // unless you get blackjack
                message = "You've got Blackjack"
                player.chips += cost*2
            }

            isAlive = false
            newButtonEl.style.display = "none"
            standButtonEl.style.display = "none"
            startButtonEl.style.display = "inline-flex"
        }
        startButtonEl.innerText = "START GAME"
    }
    else{ // if the player "stand"
        if (sumDealer > 21){
            message = "You win"
            player.chips += cost*2
        }
        else if (sumPlayer > sumDealer){
            message = "You win"
            player.chips += cost*2
        }
        else if (sumPlayer == sumDealer){
            message = "Push"
            player.chips += cost
        }
        else{
            message = "You lose"
        }

        newButtonEl.style.display = "none"
        standButtonEl.style.display = "none"
        startButtonEl.style.display = "inline-flex"
        startButtonEl.innerText = "START GAME"
    }

    messageEl.innerText = message
    chipsEl.innerText = "Chips: "+player.chips
}

function newCard(){
    if (!isAlive){
        return
    }
    playerCards.push(generateRandomCard())
    renderGame()
}

function stand(){
    if (!isAlive){
        return
    }

    do{
        dealerCards.push(generateRandomCard())
        sumDealer = sum(dealerCards)
    }while (sumDealer < 17)

    isAlive = false
    renderGame()
}
