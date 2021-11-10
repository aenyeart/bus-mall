'use strict'

let optionTotal = 3; // let optionTotal = parseInt(prompt("how many options?"));

let imgNamesArr = [
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "sweep",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass"
];
let imgPathsArr = [
  "img/boots.jpg",
  "img/breakfast.jpg",
  "img/bubblegum.jpg",
  "img/chair.jpg",
  "img/cthulhu.jpg",
  "img/dog-duck.jpg",
  "img/dragon.jpg",
  "img/pen.jpg",
  "img/pet-sweep.jpg",
  "img/scissors.jpg",
  "img/shark.jpg",
  "img/sweep.png",
  "img/tauntaun.jpg",
  "img/unicorn.jpg",
  "img/water-can.jpg",
  "img/wine-glass.jpg"
];

function ProductOption(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.displayCounter = 0;
  this.clickCounter = 0;
  ProductOption.all.push(this); // ADDS THIS INSTANCE TO ARRAY OF PRODUCTS
}

ProductOption.all = [];
ProductOption.option1 = null;
ProductOption.option2 = null; // TODO: make render a method of ProductOption to gain access to these
ProductOption.option3 = null;

ProductOption.prototype.renderImage = function (id) {
  let productElem = document.getElementById(id);
  productElem.src = this.imgPath;
  productElem.alt = this.name;

  this.displayCounter++;
}

function randomIndex(arrLength) { // generates random index from array.length
  return Math.floor(Math.random() * arrLength);
}


function renderProdOptions() { // TODO: make this function a method of Object, use this.all[] instead of imgNamesArr

  let optionGenArr = [...ProductOption.all]; // creates copy of imgName[] values so that original remains unchanged

  for (let i = 1; i <= optionTotal; i++) { // generates one option per pass

    let id = `product-${i}`;

    let newOptionIndex = randomIndex(optionGenArr.length);

    let newOption = optionGenArr[newOptionIndex];
    // let thisInstance = ProductOption.all[newOptionIndex];
    renderImage(id, newOption.imgPath, newOption.name); // RENDERS INDIVIDUAL IMAGE
    newOption.displayCounter++;
    optionGenArr.splice(newOptionIndex, 1); // REMOVES THIS ITEM FROM TEMP ARRAY TO PRECLUDE REPEATS when it loops back
  }
}

function instantiateProducts(namesArray, pathsArray) { // BUILDS PRODUCT instances (which get pushed to array )
  if (namesArray.length === pathsArray.length) {
    for (let i = 0; i < pathsArray.length; i++) {
      new ProductOption(namesArray[i], pathsArray[i]);
    }
  } else console.error("name and path arrays are different lengths")
}

attachEventListeners();
instantiateProducts(imgNamesArr, imgPathsArr);
renderProdOptions();

function handleClick(event) {

  console.log(event.target.classList.value); // "class" is offlimits in JS as a property name. Must use .classList to view token list

  if (event.target.classList.value === "product") {
    console.log(event.target.alt);
    // register click count for product and totalclicks
    renderProdOptions();
  } else console.log("That isn't an option")
}

function attachEventListeners() {
  const clickArea = document.querySelector('main');
  clickArea.addEventListener('click', handleClick);
}

// associate id with product instance inside render function
// use id from click event to refer to product instance clickCounter