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

function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.displayCounter = 0;
  this.clickCounter = 0;
  Product.all.push(this); // ADDS THIS INSTANCE TO ARRAY OF PRODUCTS
}

Product.all = [];
Product.option1 = null;
Product.option2 = null; // TODO: make render a method of Product to gain access to these
Product.option3 = null;

Product.prototype.renderImage = function (id) {
  let productElem = document.getElementById(id);
  productElem.src = this.imgPath;
  productElem.alt = this.name;

  this.displayCounter++;
}

function renderOptions() {
  Product.option1.renderImage('option-1'); // REFACTOR?
  Product.option2.renderImage('option-2');
  Product.option3.renderImage('option-3');
}

function randomProduct() {
  let arrLength = Product.all.length;
  let index = Math.floor(Math.random() * arrLength);
  return Product.all[index];
}

function generateOptions() {
  const cannotUse = [ 
    Product.option1,
    Product.option2,
    Product.option3
  ];

  for (let i = 0; i < optionTotal; i++) {

    let newOption = "option" + (i+1);

    do {
      Product[`${newOption}`] = randomProduct();
    } while (cannotUse.includes(Product[`${newOption}`]));

    cannotUse.push(Product[`${newOption}`]); // adds new option to array so it won't be duplicated
  }
}

function instantiateProducts(namesArray, pathsArray) { // BUILDS PRODUCT instances (which get pushed to array )
  if (namesArray.length === pathsArray.length) {
    for (let i = 0; i < pathsArray.length; i++) {
      new Product(namesArray[i], pathsArray[i]);
    }
  } else console.error("name and path arrays are different lengths")
}

attachEventListeners();
instantiateProducts(imgNamesArr, imgPathsArr);
generateOptions();
renderOptions();

function handleClick(event) {

  console.log(event.target.classList.value); // "class" is offlimits in JS as a property name. Must use .classList to view token list

  if (event.target.classList.value === "product") {
    console.log(event.target.alt);
    // register click count for product and totalclicks
    renderOptions();
  } else console.log("That isn't an option")
}

function attachEventListeners() {
  const clickArea = document.querySelector('main');
  clickArea.addEventListener('click', handleClick);
}

// associate id with product instance inside render function
// use id from click event to refer to product instance clickCounter






// from previous renderOptions()
// for (let i = 1; i <= optionTotal; i++) { // generates one option per pass

// let id = `option-${i}`;

// let newOptionIndex = randomIndex(optionGenArr.length);

// let newOption = optionGenArr[newOptionIndex];
// // let thisInstance = Product.all[newOptionIndex];
// renderImage(id, newOption.imgPath, newOption.name); // RENDERS INDIVIDUAL IMAGE
// newOption.displayCounter++;
// optionGenArr.splice(newOptionIndex, 1); // REMOVES THIS ITEM FROM TEMP ARRAY TO PRECLUDE REPEATS when it loops back
// }