'use strict'

const optionTotal = 3; // let optionTotal = parseInt(prompt("how many options?"));
const maxRounds = 25;
let roundCounter = 0;
let imgNamesArray = [
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
let imgPathsArray = [
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
let votes = [];
let views = [];

function Product(name, imgPath, displayCounter = 0, clickCounter = 0) {
  this.name = name;
  this.imgPath = imgPath;
  this.displayCounter = displayCounter;
  this.clickCounter = clickCounter;
  Product.all.push(this); // ADDS THIS INSTANCE TO ARRAY OF PRODUCTS
}

Product.all = []; // Creates an array at broad scope so that product instances can be pushed to it or accessed from any function in this codebase.

/*** Explanation of following code structure ***
 * 
 * These placeholders below set us up to handle rendering and display/click counters: 
 * 1) From renderOptions(), we call the instance method `.renderImage()`, passing the id of the DOM element that the product image is to be rendered to. 
 * 2) SINCE `.renderImage` is a method of the instances themselves, and 
 * rendering has already happened before the user clicks, and 
 * the click event object provides the id of the DOM element that is clicked (via `event.target.id`),
 * THEN, 
 * 3) we can access the clicked instance's click counter by 
 * referring back to its prototype method `renderImage`,
 * and using the clicked id with some IF-THEN logic and comparison operators to decide whether to increment the .clickCounter of Product.option1, Product.option2, or Product.option3.
 **************/

Product.option1 = null;
Product.option2 = null;
Product.option3 = null;

Product.prototype.renderImage = function (id) {

  let productElem = document.getElementById(id);
  productElem.src = this.imgPath;
  productElem.alt = this.name;

  this.displayCounter++;
}

function renderOptions() {
  Product.option1.renderImage('option-1');
  Product.option2.renderImage('option-2');
  Product.option3.renderImage('option-3');
}

function randomProduct() {
  let arrLength = Product.all.length;
  let index = Math.floor(Math.random() * arrLength);
  return Product.all[index];
}

function generateOptions() {

  // Populated with instances from previous round so not repeated this round.
  const cannotUse = [
    Product.option1,
    Product.option2,
    Product.option3
  ];
  // if (localStorage.renderImage) { 
  //   Product.prototype.renderImage = JSON.parse(localStorage.renderImage);
  // } 
  for (let i = 0; i < optionTotal; i++) { // optionTotal defaults to 3
    let newOption = "option" + (i + 1); // concats key string 
    do {
      Product[newOption] = randomProduct();
    } while (cannotUse.includes(Product[newOption]));
    cannotUse.push(Product[newOption]); // adds newOption to cannotUse[] so it won't be duplicated on this pass
  }
}
function restoreProductData() {
  let storedData = JSON.parse(localStorage.productData);
  // console.log('storedData: ', storedData);
  storedData.forEach((prod) => {
    console.log(prod.name, prod.imgPath, prod.displayCounter, prod.clickCounter);
    new Product(prod.name, prod.imgPath, prod.displayCounter, prod.clickCounter);
  });
}
function instantiateProducts(namesArray, pathsArray) { // create PRODUCT instances (which get pushed to array )
  if (localStorage.productData) {
    restoreProductData();
  } else if (namesArray.length === pathsArray.length) {
    for (let i = 0; i < pathsArray.length; i++) {
      new Product(namesArray[i], pathsArray[i]);
    }
  } else console.error("name and path arrays are different lengths")
}

function storeProductData() {
  localStorage.productData = JSON.stringify(Product.all);
  // localStorage.renderImage = JSON.stringify(Product.prototype.renderImage);
}

function handleClick(event) {

  if (event.target.classList.value === "option") { // "class" is offlimits in JS as a property name. Must use .classList to view token list
    let usrChoiceId = event.target.id; //

    switch (usrChoiceId) { // Increments click counter of selected product
      case 'option-1':
        Product.option1.clickCounter++;
        break;
      case 'option-2':
        Product.option2.clickCounter++;
        break;
      case 'option-3':
        Product.option3.clickCounter++;
        break;
    }

    roundCounter++;

    if (roundCounter < maxRounds) {
      generateOptions();
      renderOptions();
    } else {
      removeEventListeners(); // remove click handler
      renderResultsButton();
      storeProductData();

    }
  } else console.log("That isn't an option")
}

function attachEventListeners() {
  const clickArea = document.querySelector('main');
  clickArea.addEventListener('click', handleClick);
}

function removeEventListeners() {
  const clickArea = document.querySelector('main');
  clickArea.removeEventListener('click', handleClick);
}

function renderChart() {
  const ctx = document.getElementById('results-chart').getContext('2d');
  const resultsChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: imgNamesArray,
      datasets: [{
        label: '# of clicks',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(96, 85, 112, 0.2)',
          'rgba(139, 52, 196, 0.2)',
          'rgba(7, 224, 110, 0.2)',
          'rgba(149, 20, 254, 0.2)',
          'rgba(16, 83, 90, 0.2)',
          'rgba(186, 166, 104, 0.2)',
          'rgba(158, 163, 5, 0.2)',
          'rgba(168, 81, 88, 0.2)',
          'rgba(11, 23, 67, 0.2)',
          'rgba(192, 48, 210, 0.2)'

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(96, 85, 112, 1)',
          'rgba(139, 52, 196, 1)',
          'rgba(7, 224, 110, 1)',
          'rgba(149, 20, 254, 1)',
          'rgba(16, 83, 90, 1)',
          'rgba(186, 166, 104, 1)',
          'rgba(158, 163, 5, 1)',
          'rgba(168, 81, 88, 1)',
          'rgba(11, 23, 67, 1)',
          'rgba(192, 48, 210, 1)'



        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function renderResults() {
  const resultsList = document.getElementById("results-list");

  // loops through array of instances, generates DOM element with data for each product, pushes to votes and views arrays
  for (let i = 0; i < Product.all.length; i++) {
    let productInstance = Product.all[i];

    views.push(productInstance.displayCounter); // prepares arrays for chart
    votes.push(productInstance.clickCounter);

    const newResultsListItem = document.createElement("li");
    resultsList.appendChild(newResultsListItem);
    newResultsListItem.id = productInstance.name;
    newResultsListItem.textContent = `${productInstance.name} Clicked: ${productInstance.clickCounter} | Displayed: ${productInstance.displayCounter}`
  }
  renderChart();
}

function renderResultsButton() {
  const resultsButton = document.getElementById("results-button");
  resultsButton.textContent = "DISPLAY RESULTS";
  resultsButton.hidden = false;
  resultsButton.addEventListener("click", () => {
    renderResults();
    resultsButton.hidden = true;
  })
}
attachEventListeners();
instantiateProducts(imgNamesArray, imgPathsArray);
generateOptions();
renderOptions();