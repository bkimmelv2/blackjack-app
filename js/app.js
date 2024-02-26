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

let hiddenCard = ""

let playerValue = 0
let dealerValue = 0

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

const returnCards = () => {
    fetch('https://www.deckofcardsapi.com/api/deck/54k6bqumtyhy/return/')
    alert('Cards are shuffled and dealt...')
}

// returnCards()

const initDeal = () => {
    fetch('https://www.deckofcardsapi.com/api/deck/54k6bqumtyhy/draw/?count=4')
    .then((data) => {
        return data.json()
    },
    (err) => {
        console.log(err)
    }).then((json) => {
        console.log(json)
        // this will store the hidden card's actual image for later use.
        hiddenCard = json.cards[1].image
        console.log(hiddenCard)

        // creating img elements to store the card faces
        let dealerCard1 = document.getElementById('hiddenCard')
        let dealerCard2 = document.getElementById('dCard2')
        let playerCard1 = document.getElementById('pCard1')
        let playerCard2 = document.getElementById('pCard2')
        let playerDiv = document.getElementById('player')
        let dealerDiv = document.getElementById('dealer')

        // change img src to corresponding card face
        playerCard1.src = json.cards[0].image
        playerCard2.src = json.cards[2].image
        dealerCard1.src = 'https://www.deckofcardsapi.com/static/img/back.png' // Facedown card
        dealerCard2.src = json.cards[3].image

        // this will convert values if they are face cards
        for (let i in json.cards) {
            if (json.cards[i].value === 'JACK' || json.cards[i].value === 'QUEEN' || json.cards[i].value === 'KING') {
                json.cards[i].value = '10'
            } else if (json.cards[i].value === 'ACE') {
                json.cards[i].value = '11'
            }
        }

        // add the value data to the player and dealer variables to use in later logic
        playerValue = Number(json.cards[0].value) + Number(json.cards[2].value)
        dealerValue = Number(json.cards[1].value) + Number(json.cards[3].value)
        console.log(playerValue, dealerValue)

        // append to the corresponding divs
        playerDiv.appendChild(playerCard1)
        playerDiv.appendChild(playerCard2)
        dealerDiv.appendChild(dealerCard1)
        dealerDiv.appendChild(dealerCard2)

        // check for a natural blackjack, using a setTimeout so the cards appear on screen first.
        setTimeout(() => {
            if (playerValue === 21 && dealerValue === 21) {
            alert('It\'s a tie! Both dealer and player have been dealt Blackjack. Use the Reset Game button to play again!')
            dealerCard1.src = hiddenCard
            } else if (playerValue === 21) {
                alert('WINNER WINNER CHICKEN DINNER!!! Use the Reset Game button to play again!')
                dealerCard1.src = hiddenCard
            } else if (dealerValue === 21) {
                alert('Natural Dealer Blackjack detected... revealing cards. Use the Reset Game button to play again!')
                dealerCard1.src = hiddenCard
            }
        }, 750)
    },
    (err) => {
        console.log(err)
    })
}

const startGame = () => {
    alert('Welcome to Blackjack!')
    returnCards()
    initDeal()
}

startGame()

// Now we start writing functions for each button available to the user

const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', () => {
    history.go(0) // this will ensure any added elements are removed and the HTML resets to it's original layout
})

