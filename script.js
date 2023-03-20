const gameContainer = document.getElementById("game");
let flippedCards = 0;
let card1 = null;
let card2 = null;
let allowClicks = true;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // Prevents more than 2 clicks
  if (!allowClicks) return;
  
  // Makes background colors of divs the color of their class
  let clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0];

  // Adds clicked class to cards that have been clicked
  clickedCard.classList.add("clicked");

  // Assigns first clicked card and increases the flippedCards count by 1
  if (flippedCards === 0) {
    card1 = clickedCard;
    card1.removeEventListener("click", handleCardClick);
    flippedCards++;
  }

  // Assigns second clicked card and increases the flippedCards total to 2 
  else {
    card2 =  clickedCard;
    flippedCards++;
    allowClicks = false; // Does not allow for additional clicks
    checkedColorCard2 = card2.getAttribute("class");
    checkedColorCard1 = card1.getAttribute("class");
    
    // If two flipped cards are a match
    if (checkedColorCard1 === checkedColorCard2) {
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      flippedCards = 0;
      allowClicks = true;
    }

    // If two flipped cards are not a match 
    else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("clicked");
        card2.classList.remove("clicked");
        card1.addEventListener("click", handleCardClick);
        flippedCards = 0;
        allowClicks = true;
      }, 1000)
    }
  }
  
}

// when the DOM loads
createDivsForColors(shuffledColors);
