'use strict';

let circles = document.querySelectorAll('.circle'); //This is array of circle; 
let buttonStart = document.querySelector('.button-start'); // This is button to start game;
let sounds = ['one', 'two', 'three', 'four']; //This is an array of sound names
let sequenceArray = []; //In this array will record sequence
let streak = document.querySelector('.streak'); //This variable displays the vin streak

//This function added the event on elements
function addEvenetClickOnElements(arr, func) {
	for (let elem of arr) {
		elem.addEventListener('click', func.bind(this, elem));
	}
}

//Start game
buttonStart.addEventListener('click', playGame);

function playGame() {
	let elem = getRandomElementOnArray(sounds);

	recordElementOnArray(elem, sequenceArray);
	showSequence(sequenceArray);
	checkTheEnteredSequence(playGame);
	// Здесь функция которая проверяет введенную последовательность
}

function checkTheEnteredSequence(func) {
	let arr = cloneArray(sequenceArray);
	console.log(arr)
	circles.forEach(elem => {
		elem.addEventListener('click', function() {
			let attributeElem = getAttributeDatasetNumberElement(elem);
			if (comparesElements(attributeElem, arr[0])) {
				arr.shift(arr[0]);
				console.log(arr)
				if (arr.length < 1) {
					streak.innerHTML =  streak.innerHTML.slice(0, -1)
					 + (Number(streak.innerHTML[streak.innerHTML.length - 1]) + 1);
					func();
				}
			} else {
				sequenceArray = [];
				console.log('game over');
			}
		});
	});
}





//This function clone array
function cloneArray(arr) {
	let result = [];
	arr.forEach(elem => result.push(elem));
	return result;
}



// This function added sound on elem
function addSound(elem) {
	let audio = new Audio(`../sounds/${elem.dataset.number}.mp3`);
	audio.play();
}


///This function returns a random element from the given array
function getRandomElementOnArray(arr) {
	let i = getRandom(0, arr.length - 1);
	return arr[i];
}

//This function returns a number in the given range
function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

//This function records the passed element to the passed array
function recordElementOnArray(elem, arr) {
	arr.push(elem);
}

//This function showed a sequence
function showSequence(arr) {
	let counter = 0;
	let previousElement = null;
	let timerId = setInterval(function() {
		if (counter < arr.length) {
			//check if the previous element exists
			if(previousElement !== null) removeClassElement(previousElement, 'circle_active');
			//create an element
			let circle = document.querySelector(`[data-number="${arr[counter]}"]`);

			addSound(circle);
			addClassElement(circle, 'circle_active');
			previousElement = circle;
			//This condition performs a delay before executing the function
			setTimeout(function() {
					removeClassElement(circle, 'circle_active')
				}, 500)
			counter++;
		} else {
			clearInterval(timerId)
		}
	}, 1000);
}


function addClassElement(elem, addClass) {
	elem.classList.add(addClass);
}

function removeClassElement(elem, removeClass) {
	elem.classList.remove(removeClass);
}


//This function compares two elements
function comparesElements(elem1, elem2) {
		return elem1 === elem2;
}


function getAttributeDatasetNumberElement(elem) {
	return elem.dataset.number;
}

