let cardsNumber = 0;
let plays = 0;
let pairs = 0;

const deck = [
  //back card images
  "images/pyro.png",
  "images/pyro.png",
  "images/hydro.png",
  "images/hydro.png",
  "images/anemo.png",
  "images/anemo.png",
  "images/electro.png",
  "images/electro.png",
  "images/dendro.png",
  "images/dendro.png",
  "images/cryo.png",
  "images/cryo.png",
  "images/geo.png",
  "images/geo.png",
  
];

function askCardsNumber() {
  //asks how many cards to show up
  cardsNumber = prompt(
    "Com quantas cartas deseja jogar? Escolha um nº par de 4 a 14"
  );

  while (cardsNumber % 2 !== 0 || cardsNumber < 4 || cardsNumber > 14) {
    //ask loop if input wrongly
    alert("Você precisa escolher um nº par de 4 a 14!");
    cardsNumber = prompt(
      "Com quantas cartas deseja jogar? Escolha um nº par de 4 a 14"
    );
  }
}
askCardsNumber();

let chosenQuantity = deck.slice(0, cardsNumber);
chosenQuantity.sort(comparator);

function comparator() {
  //randomize deck
  return Math.random() - 0.5;
}

function addCards() {
  // add cards to html inside ul tag
  let ul = document.querySelector("ul");
  for (let i = 0; i < chosenQuantity.length; i++) {
    ul.innerHTML += `
    <ul class="card" onClick="turnCard(this)">
    <li class="face"> 
    <img  src="images/front.png">
    </li>
    <li class="back-face back img">
    <img src="${chosenQuantity[i]}"></li>
    </ul>`;
  }
}
addCards();

function turnCard(element) {
  // turn card animation and game mechanics
  let turnFront = document.querySelector(".selectFront");
  let turnBack = document.querySelector(".selectBack");

  element.querySelector(".face").classList.add("selectFront");
  element.querySelector(".back-face").classList.add("selectBack");

  if (turnBack !== null) {
    if (element.querySelector(".back-face").innerHTML === turnBack.innerHTML) {
      element.querySelector(".face").classList.add("equalFront");
      element.querySelector(".back-face").classList.add("equalBack");
      turnFront.classList.add("equalFront");
      turnBack.classList.add("equalBack");
      pairs++;
    }
    setTimeout(function () {
      element.querySelector(".face").classList.remove("selectFront");
      element.querySelector(".back-face").classList.remove("selectBack");
      document.querySelector(".selectBack").classList.remove("selectBack");
      document.querySelector(".selectFront").classList.remove("selectFront");
    }, 1000);
  }
  plays++;

  if (pairs === cardsNumber / 2) {
    //win condition
    alert(`Você ganhou em ${plays} jogadas`);
  }
}
