if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}


import { numberToText } from "./util.js";

const whiteSpace = document.querySelector(".whiteSpace");
const whiteRemainingTime = document.querySelector(".whiteRemainingTime")
const blackSpace = document.querySelector(".blackSpace");
const blackRemainingTime = document.querySelector(".blackRemainingTime")

let min = prompt("몇 분간 진행할 것인지 입력");

let isGameOver = false;
let whiteTimer;
let blackTimer;
let isWhiteTurn = true;
let isBlackTurn = false;
let whiteTimeLeft = min * 60; // 900 sec
let blackTimeLeft = min * 60;

whiteRemainingTime.innerHTML = numberToText(whiteTimeLeft);
blackRemainingTime.innerHTML = numberToText(blackTimeLeft);

function gameOver() {
  clearInterval(whiteTimer);
  clearInterval(blackTimer);

  isGameOver = true;
}

function turnChange() {
  isWhiteTurn = !isWhiteTurn;
  isBlackTurn = !isBlackTurn;
  
  if (whiteTimeLeft <= 30) {
    whiteTimeLeft = 30;
    whiteRemainingTime.innerHTML = numberToText(whiteTimeLeft);
  }
  if (blackTimeLeft <= 30) {
    blackTimeLeft = 30;
    blackRemainingTime.innerHTML = numberToText(blackTimeLeft)
  }
}

function timeAlert() {
  if(whiteTimeLeft <= 30) {
    whiteRemainingTime.style.color = "tomato";
  }

  if(blackTimeLeft <= 30) {
    blackRemainingTime.style.color = "tomato";
  }
}

whiteSpace.addEventListener("click", () => {

  if (!isWhiteTurn) return;

  if (whiteTimeLeft <= 30) {
    whiteTimeLeft = 30;
  }
  
  clearInterval(whiteTimer);
  turnChange();
  blackTimer = setInterval(() => {
    blackTimeLeft--;
    if(blackTimeLeft == 0) gameOver();
    timeAlert();
    blackRemainingTime.innerHTML = numberToText(blackTimeLeft);
  }, 1000)
})


blackSpace.addEventListener("click", () => {
  
  if (!isBlackTurn) return;
  
  clearInterval(blackTimer);
  turnChange();
  whiteTimer = setInterval(() => {
    whiteTimeLeft--;
    if(whiteTimeLeft == 0) gameOver();
    timeAlert();
    whiteRemainingTime.innerHTML = numberToText(whiteTimeLeft);
  }, 1000)
})