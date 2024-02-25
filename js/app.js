// start with an empty array for each the player and dealer hands.

// need a startGame function that runs when the page loads. This function should include:
    // drawing 4 cards and append them to the respective div one at a time. First card goes to playerDiv, then to dealerDiv.

// drawCard function that draws a card from the new deck one at a time.

// THE GAME IS NOW SET UP AND READY TO INTERACT WITH

// Hit Me! function is tied to a button. Pressing it will exec the drawCard function and append to the player div.
    // if the player hand reaches a value of 21, "Winner winner chicken dinner"
    // if the player hand is > 21, exec bust function - player loses - 

// Stand function is tied to a button. Pressing it will exec the comTurn function which will start the computer's turn.
    // Computer will use the Hit Me! function when hand value is less than 17.
    // otherwise, the game's results are read after evaluation.

// Reset function is tied to a button. Pressing it will exec the returnCards function then the initDeal function.


// This function will generate a new deck for us to use.
// const newDeck = () => {
//     fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//     .then((data) => {
//         return data.json()
//     },
//     (err) => {
//         console.log(err)
//     })
//     .then((json) => {
//         console.log(json.deck_id)
//     },
//     (err) => {
//         console.log(err)
//     })
// }
// newDeck()
// DECK ID = 54k6bqumtyhy

let playerHand = []
let dealerHand = []

//MIGHT NOT NEED THIS AS THE returnCards FUNCTION ALSO SHUFFLES.
// const shuffleDeck = () => {
//     fetch(`https://www.deckofcardsapi.com/api/deck/54k6bqumtyhy/shuffle/?deck_count=1`)
//     .then((data) => {
//         return data.json()
//     },
//     (err) => {
//         console.log(err)
//     })
//     .then((json) => {
//         return json
//     },
//     (err) => {
//         console.log(err)
//     })
// }

const initDeal = () => {
    fetch('https://www.deckofcardsapi.com/api/deck/54k6bqumtyhy/draw/?count=4')
    .then((data) => {
        return data.json()
    },
    (err) => {
        console.log(err)
    }).then((json) => {
        console.log(json)
        playerHand.push(json.cards[0].image)
        dealerHand.push(json.cards[1].image)
        playerHand.push(json.cards[2].image)
        dealerHand.push(json.cards[3].image)

        let dealerCard1 = document.createElement('img')
        let dealerCard2 = document.createElement('img')
        let playerCard1 = document.createElement('img')
        let playerCard2 = document.createElement('img')
        let playerDiv = document.getElementById('player')
        let dealerDiv = document.getElementById('dealer')

        playerCard1.src = playerHand[0]
        playerCard2.src = playerHand[1]
        dealerCard1.src = 'https://www.deckofcardsapi.com/static/img/back.png'
        dealerCard2.src = dealerHand[1]

        playerDiv.appendChild(playerCard1)
        playerDiv.appendChild(playerCard2)
        dealerDiv.appendChild(dealerCard1)
        dealerDiv.appendChild(dealerCard2)
    },
    (err) => {
        console.log(err)
    })
}
// drawCard()

const returnCards = () => {
    fetch('https://www.deckofcardsapi.com/api/deck/54k6bqumtyhy/return/')
    alert('Cards returned and shuffled')
}

// returnCards()

const startGame = () => {
    if (playerHand.length === 0 && dealerHand.length === 0) {
        initDeal()
        console.log(playerHand, dealerHand)
    }
}

// startGame()