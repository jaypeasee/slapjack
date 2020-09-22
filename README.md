# SlapJack Solo Project

## Project Description

In this project, I built an application for a virtual card game of Slapjack from scratch. This game is built for exactly two players to compete on the same desktop device. They can play as many full games as they would like, and their win scores are saved to `localStorage` . The rules to this game and how the players can operate it, are explained in detail in both in the `Project Brief` and the deployed `Github Page` linked below.

- [Project Brief and Rubric](https://frontend.turing.io/projects/module-1/slapjack.html)
- [Deployed Github Page](https://jaypeasee.github.io/slapjack/)

## Learning Goals

Build my first <b>complete</b> game application based on a project brief and comp. Specific learning goals include:

- Practicing self-reliance to plan and build an advanced application independently from outside help.
- Using complex conditional logic to execute specific code.
- Working between multiple classes to operate the `Data Model` and separate it's actions from the `DOM`.
- Writing and refactoring to `DRY` code with an additional focus on `SRP`.
- Using `event delegation` to handle and listen for like-events and page elements.
- Using `localStorage`  to make data persist on page load.

## Functionality

- When it's their turn, players deal cards from their hand to a middle pile by keying `[q]` and `[p]`.
- Players can "slap" the middle pile using the `[f]` and `[j]` keys with several outcomes: Jacks, Doubles, Sandwiches, and Bad Slaps.
- Player turns are dependent on the following:
   	1. If the other player does not have any cards left.
   	2. If the other player just slapped the middle pile.
   	3. Or if it was not their turn previously.
![gif of a normal round](https://media.giphy.com/media/xpdEnetLg8xyj0iQjd/source.mp4)
- The cards are shuffled in three instances:
  1. At the start of a new game - before the cards have been dealt to either player.
  2. After a player successfully slaps and adds the pile to their existing hand.
  3. After the player with cards has dealt all of theirs to the middle and before the cards are handed back to that player.
- When a player runs out of cards they have a chance to get back into the game by slapping a Jack as the other player continues to deal their cards. It is in this round where they can also be eliminated.
- When a player has won, the win score is updated to the `Data Model` and `localStorage`
- The `DOM` displays all of the data representing this game as events happen, to allow the users an experience of a real card game.

## Programming Languages Used

- HTML in `index.html`
- CSS in `styles.css`
- Vanilla JavaScript in `main.js`, `game.js` and `player.js`

## Planning

This project was assigned mid-day on 9/17/20 and turned in on 9/22/20 in the evening with 4.5 days to complete it. Because it was a solo project, there was no `DTR`, but I did use a [Kanban Project Board](https://github.com/jaypeasee/slapjack/projects/1) on Github to outline and track the project progression.

While it was an independent project, I did reach out to peers to discuss high level ideas when I was stuck. That said, the only people who reviewed this project or suggested specific code implementation were my mentor for a code review and my project manager who graded it and provided feedback.

### Challenges

- Shuffling the different card deck arrays. I needed to create a function that would completely randomize the order of arrays when I called it. This took some research to find a method and to understand it. I settled on the `Fisher Yates Shuffle`, which runs a reverse loop through the array and replaces each index with another as it iterates. It was my first time using a reverse loop in anything other than just practice.
- Writing DRY code for conditional logic that: handles how user's take their turns, handles all of the different slap outcomes, handles the rules for a survival round, and determines a winner.
- Tracking and manipulating various arrays of card objects in the `Data Model`.
- Utilizing `localStorage` for multiple keys with different values. I had not managed storage for more than one piece of data previously.

### Wins

- Building the complete game free of bugs (as far as I am aware of). This required manual testing and console logging to debug. It also required moving slowly and intentionally through each planned step and refactoring before introducing new features.
- Reusing multiple functions for `DRY` code. Some examples are the `shuffleDeck()` and `playHand()` methods in `game.js` as well as the `startNewGame()` and `resetPlayerDecks()` functions in `main.js`.
- Completely separating the `DOM` and `Data Model` responsibilites. All data is manipulated in either `player.js` or `main.js`. All global variables, `DOM` manipulation, and event handlers occur in `main.js`.
- Combining `DOM` manipulation, `event delegation` and elegant `CSS` implementation to create a user experience that makes the game actually fun to play.
- Solving all main blockers explained in the `Challenges` section independently of outside help.

## Setup Instructions

1. Fork [this Github repository](https://github.com/jaypeasee/slapjack) and clone it down to your local machine using the `git clone` command in your Terminal.
2. Move into that directory with `cd slapjack` in your Terminal.
3. Run `open index.html` in your Terminal to run the application locally.
4. To see the code itself locally, run `<your text editor> .` in your Terminal.

## Contributors

* [JP Carey](https://github.com/jaypeasee) - Application/game creator
* [David Becker](https://github.com/davidbecker6081) - Code Reviewer and JP's Mentor
* [Will Mitchell](https://github.com/wvmitchell) - Project Manager
