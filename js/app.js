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

// Reset function is tied to a button. Pressing it will reset the page.


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

let dealerHasAce = false
let playerHasAce = false

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
    fetch('https://www.deckofcardsapi.com/api/deck/vx47mcd8gs0k/return/')
    alert('Cards are shuffled and dealt...')
}

// returnCards()

// INITAL DEAL WHEN THE PAGE LOADS //
const initDeal = () => {
    fetch('https://www.deckofcardsapi.com/api/deck/vx47mcd8gs0k/draw/?count=4')
    .then((data) => {
        return data.json()
    },
    (err) => {
        console.log(err)
    })
    .then((json) => {
        console.log(json)
        // this will store the hidden card's actual image for later use.
        hiddenCard = json.cards[1].image
        console.log(hiddenCard)

        // creating img elements to store the card faces
        const dealerCard1 = document.getElementById('hiddenCard')
        const dealerCard2 = document.getElementById('dCard2')
        const playerCard1 = document.getElementById('pCard1')
        const playerCard2 = document.getElementById('pCard2')
        const playerDiv = document.getElementById('player')
        const dealerDiv = document.getElementById('dealer')

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
                // added logic to track if player or dealer has an ace
                if (i % 2 === 0) {
                    playerHasAce = true
                    json.cards[i].value = '11'
                } else {
                    dealerHasAce = true
                    json.cards[i].value = '11'
                }
            }
        }

        console.log(playerHasAce, dealerHasAce)

        // add the value data to the player and dealer variables to use in later logic
        playerValue = Number(json.cards[0].value) + Number(json.cards[2].value)
        dealerValue = Number(json.cards[1].value) + Number(json.cards[3].value)
        // This covers the possibility of being dealt two Aces off the start
        if (playerValue > 21 && playerHasAce) {
            playerValue -= 10
        } else if (dealerValue > 21 && dealerHasAce) {
            dealerValue -= 10
        }
        console.log(playerValue, dealerValue)

        // append to the corresponding divs
        playerDiv.appendChild(playerCard1)
        playerDiv.appendChild(playerCard2)
        dealerDiv.appendChild(dealerCard1)
        dealerDiv.appendChild(dealerCard2)

        // check for a natural blackjack, using a setTimeout so the cards appear on screen first.
        setTimeout(() => {
            const status = document.getElementById('status')

            if (playerValue === 21 && dealerValue === 21) {
            status.innerText = 'It\'s a tie! Both dealer and player have been dealt Blackjack.'
            // alert('It\'s a tie! Both dealer and player have been dealt Blackjack.')
            dealerCard1.src = hiddenCard
            // making the next choice easier for the user by hiding all other buttons
            document.getElementById('hit').style.visibility = 'hidden'
            document.getElementById('stand').style.visibility = 'hidden'
            } else if (playerValue === 21) {
                status.innerText = 'WINNER WINNER CHICKEN DINNER!!!'
                // alert('WINNER WINNER CHICKEN DINNER!!!')
                dealerCard1.src = hiddenCard // reveal the hidden card
                document.getElementById('hit').style.visibility = 'hidden'
                document.getElementById('stand').style.visibility = 'hidden'
            } else if (dealerValue === 21) {
                status.innerText = 'Natural Dealer Blackjack detected... revealing cards. You lose!'
                // alert('Natural Dealer Blackjack detected... revealing cards. You lose!')
                dealerCard1.src = hiddenCard
                document.getElementById('hit').style.visibility = 'hidden'
                document.getElementById('stand').style.visibility = 'hidden'
            }
        }, 500)
    },
    (err) => {
        console.log(err)
    })
}
// // // // // //

// MANUALLY CALLED START FUNCTION //
const startGame = () => {
    returnCards()
    initDeal()
}

startGame()
// // // // // //

// Now we start writing functions for each button available to the user

// RESET BUTTON //
const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', () => {
    history.go(0) // this will ensure any added elements are removed and the HTML resets to it's original layout
})
// // // // // //

// HIT ME BUTTON //
const hitMeButton = document.getElementById('hit')
hitMeButton.addEventListener('click', () => {
    fetch('https://www.deckofcardsapi.com/api/deck/vx47mcd8gs0k/draw/?count=1')
    .then((data) => {
        return data.json()
    },
    (err) => {
        console.log(err)
    })
    .then((json) => {
        console.log(json)

        // this pulls the card image and adds it to player's hand
        const newCard = document.createElement('img')
        const playerDiv = document.getElementById('player')
        newCard.src = json.cards[0].image
        playerDiv.appendChild(newCard)

        // need to track the card's added value
        if (json.cards[0].value === 'JACK' || json.cards[0].value === 'QUEEN' || json.cards[0].value === 'KING') {
            json.cards[0].value = '10'
        } else if (json.cards[0].value === 'ACE') {
            playerHasAce = true
            json.cards[0].value = '11'
        }

        playerValue += Number(json.cards[0].value)
        console.log(playerValue)
        
        // now we need logic to detect if the playerValue should be reduced given playerHasAce is true.
        if (playerValue > 21 && playerHasAce) {
            playerHasAce = false
            playerValue -= 10
            console.log(playerValue)
        }

        const dealerCard1 = document.getElementById('hiddenCard')

        // need logic to check for bust or for blackjack win. Adding a delay so playerValue has time to update.
        setTimeout(() => {
            const status = document.getElementById('status')

            if (playerValue === 21) {
            status.innerText = 'WINNER WINNER CHICKEN DINNER!!!'
            // alert('WINNER WINNER CHICKEN DINNER!!!')
            dealerCard1.src = hiddenCard
            document.getElementById('hit').style.visibility = 'hidden'
            document.getElementById('stand').style.visibility = 'hidden'
            } else if (playerValue > 21) {
            status.innerText = 'BUST! You lose.'
            // alert('BUST! You lose.')
            dealerCard1.src = hiddenCard
            document.getElementById('hit').style.visibility = 'hidden'
            document.getElementById('stand').style.visibility = 'hidden'
            }
        }, 500)
    },
    (err) => {
        console.log(err)
    })
})
// // // // // //

// COMPARE SCORE FUNCTION //
const compareScore = () => {
    const status = document.getElementById('status')
    if (dealerValue >= 17 && dealerValue < 21) {
        // COMPARE VALUE FUNCTION
        alert('Dealer stands...')
        if (playerValue > dealerValue) {
            status.innerText = `Player has won! Player's hand of ${playerValue} beats dealer's hand of ${dealerValue}`
            // alert(`Player has won! Player's hand of ${playerValue} beats dealer's hand of ${dealerValue}`)
            document.getElementById('hit').style.visibility = 'hidden'
            document.getElementById('stand').style.visibility = 'hidden'
        } else if (playerValue < dealerValue) {
            status.innerText = `Dealer has won! Player's hand of ${playerValue} loses to dealer's hand of ${dealerValue}`
            // alert(`Dealer has won! Player's hand of ${playerValue} loses to dealer's hand of ${dealerValue}`)
            document.getElementById('hit').style.visibility = 'hidden'
            document.getElementById('stand').style.visibility = 'hidden'
        } else {
            status.innerText = `Player and dealer have tied, each with hands of ${playerValue}`
            // alert(`Player and dealer have tied, each with hands of ${playerValue}`)
            document.getElementById('hit').style.visibility = 'hidden'
            document.getElementById('stand').style.visibility = 'hidden'
        }
    // dealer wins on 21
    } else if (dealerValue === 21) {
        // DEALER WINS FUNCTION
        status.innerText = `Dealer has Blackjack! You lose.`
        // alert(`Dealer has Blackjack! You lose.`)
        document.getElementById('hit').style.visibility = 'hidden'
        document.getElementById('stand').style.visibility = 'hidden'
    // dealer busts if above 21
    } else {
        // DEALER BUSTS FUNCTION
        status.innerText = `Dealer has busted! Player wins with a hand of ${playerValue}`
        // alert(`Dealer has busted! Player wins with a hand of ${playerValue}`)
        document.getElementById('hit').style.visibility = 'hidden'
        document.getElementById('stand').style.visibility = 'hidden'
    }
}
// // // // // //

// STAND BUTTON (Computer's moves) //
const standButton = document.getElementById('stand')
standButton.addEventListener('click', () => {
    // first we need to reveal the dealer's hidden card
    const dealerCard1 = document.getElementById('hiddenCard')
    dealerCard1.src = hiddenCard
    const status = document.getElementById('status')
    status.innerText = 'Dealer is thinking...'

    // setting everything after the card reveal on a delay
    setTimeout(() => {
        // adding a delay between each loop iteration by using the for loop that runs below this task function
        const task = (i) => {
            setTimeout(() => {
                // dealer will hit until the hand is >= 17
                if (dealerValue < 17) {
                    fetch('https://www.deckofcardsapi.com/api/deck/vx47mcd8gs0k/draw/?count=1')
                    .then((data) => {
                        return data.json()
                    },
                    (err) => {
                        console.log(err)
                    })
                    .then((json) => {
                        console.log(json)

                        // this pulls the card image and adds it to dealer's hand
                        const newCard = document.createElement('img')
                        const dealerDiv = document.getElementById('dealer')
                        newCard.src = json.cards[0].image
                        dealerDiv.appendChild(newCard)

                        // now we track/update the dealerValue
                        if (json.cards[0].value === 'JACK' || json.cards[0].value === 'QUEEN' || json.cards[0].value === 'KING') {
                            json.cards[0].value = '10'
                        } else if (json.cards[0].value === 'ACE') {
                            dealerHasAce = true
                            json.cards[0].value = '11'
                        }

                        dealerValue += Number(json.cards[0].value)
                        console.log(dealerValue)

                        // Here is our Ace check from before, modded for dealer to use
                        if (dealerValue > 21 && dealerHasAce) {
                            dealerHasAce = false
                            dealerValue -= 10
                            console.log(dealerValue)
                        }
                        
                    },
                    (err) => {
                        console.log(err)
                    })
                }
            }, 1350 * i)
        }

        let loopHasRun = false
        // adding a loop that will run 5 times max. Average blackjack round deals 3-4 cards.
        for (let i = 0; i < 5; i++) {
            // loop will end early if dealer's initial cards are >= 17
            if (dealerValue >= 17){
                compareScore()
                break
            } else {
                task(i)
                loopHasRun = true
            }
        }

        setTimeout(() => {
            if (loopHasRun) {
            compareScore()
            }
        }, 3750)
    }, 1000)
})
// // // // // //