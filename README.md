# A Game of Blackjack

This is a game app design to allow the user to play a game of Blackjack against a computer controlled dealer.

## Description

What's really special about the design of this game is that it uses a virtual 52 card deck, sourced from DeckofCardsAPI. This means that each game feels unique and is very similar to playing with a real deck of cards.\ \
The game is user-friendly and simple to play, give it a go!

## Techniques

Although the creation of this game was fairly smooth, there were some difficulties along the way. By utilizing setTimout() functions I was able to make the dealer's moves take more time and seem more natural. There was also a scenario when I realized that the "value" given to face cards from the API were their actual names: "JACK", "QUEEN", "KING", "ACE". So that led to me having to write some logic that would convert those names to actual number values.

Another technique I'd like to point out here is the logic that the game uses to determine whether an Ace should be equal to 1 or 11. This had me stumped for a while until I decided to assign variables to track whether the player or the dealer had an ace in their hand. When an Ace is added to any hand, it is given a value of 11 and playerHasAce/dealerhasAce was set to true, respectively. 

Using the value of the playerHasAce and dealerHasAce variables I was able to add a conditional statement that checked if the hand value exceeded 21 AND the ace variable was true. If so, the hand's value would be reduced by 10, the variable would be set back to false (to avoid double dipping), and effectively making the Ace equal 1. Pretty proud of that.

## Getting Started

### Dependencies

* This app is compatible with Windows, MacOS, IOS, and Android.
* Using Google Chrome is highly recommended.

### Installing

* Head over to the link below and the game should begin running!
* 

## Help

If any errors or bugs occur, please use the RESET GAME button.