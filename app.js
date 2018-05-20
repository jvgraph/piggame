"use strict";
(function() {
  let scores, roundScore, activePlayer, playing;
  let dice1 = document.getElementById("dice-1");
  let dice2 = document.getElementById("dice-2");
  init();

  var lastDice;

  document.querySelector(".btn-roll").addEventListener("click", () => {
    if (playing) {
      var roll1 = Math.floor(Math.random() * 6) + 1;
      var roll2 = Math.floor(Math.random() * 6) + 1;
      dice1.style.display = "block";
      dice2.style.display = "block";
      dice1.src = "dice-" + roll1 + ".png";
      dice2.src = "dice-" + roll2 + ".png";
      ////
      if (roll1 !== 1 && roll2 !== 1) {
        //Add score
        roundScore += roll1 + roll2;
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;
      } else if (roundScore > 2) {
        //Next player
        nextPlayer();
      }
    }
  });

  /////hold score
  document.querySelector(".btn-hold").addEventListener("click", function() {
    if (playing) {
      // Add CURRENT score to GLOBAL score
      scores[activePlayer] += roundScore;

      // Update the UI
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];

      var input = document.querySelector(".final-score").value;
      var winningScore;

      // Undefined, 0, null or "" are COERCED to false
      // Anything else is COERCED to true
      if (input) {
        winningScore = input;
      } else {
        winningScore = 100;
      }

      // Check if player won the game
      if (scores[activePlayer] >= winningScore) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        dice1.style.display = "none";
        dice2.style.display = "none";
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.add("winner");
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.remove("active");
        playing = false;
      } else {
        //Next player
        nextPlayer();
      }
    }
  });

  ///// set active player

  function nextPlayer() {
    //Next player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    dice1.style.display = "none";
    dice2.style.display = "none";
  }

  document.querySelector(".btn-new").addEventListener("click", init);

  ///initialize the game

  function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    playing = true;

    //display none the dice images
    dice1.style.display = "none";
    dice2.style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
  }
})();
