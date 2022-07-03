'use strict';

let circles = document.querySelectorAll('.circle'); //This is array of circle; 
let buttonStart = document.querySelector('.button-start'); // This is button to start game;
let sounds = ['one', 'two', 'three', 'four']; //This is an array of sound names
let sequenceArray = []; //In this array will record sequence
let streak = document.querySelector('.streak'); //This variable displays the vin streak
let newArray;

//This function added the event on elements
function addEvenetClickOnElements(arr, func) {
	for (let elem of arr) {
		elem.addEventListener('click', func.bind(this, elem));
	}
}


buttonStart.addEventListener('click', playGame);

function playGame() {
	buttonStart.innerHTML = 'Начать заного';


	let elem = getRandomElementOnArray(sounds);
	recordElementOnArray(elem, sequenceArray);
	showSequence(sequenceArray);
	checkTheEnteredSequence(playGame);
	buttonStart.removeEventListener('click', playGame);
}



function checkTheEnteredSequence(func) {
	let arr = cloneArray(sequenceArray);


	circles.forEach(elem => elem.addEventListener('click', function checkElement(e) {
		let attributeElement = getAttributeDatasetNumberElement(e.target);
		let rightElement = arr.shift();

		console.log(arr)
		switch (attributeElement === rightElement) {
			case true:
				addSound(elem)
				if (arr.length <= 0) {
					streak.innerHTML = streak.innerHTML.slice(0, -1) + (Number(streak.innerHTML[streak.innerHTML.length - 1]) + 1);
					elem.removeEventListener('click', checkElement);
					func();
				}
			break;
			case false:
				console.log('+')
				sequenceArray = [];
				streak.innerHTM = streak.innerHTML = 'Streak:  0';
				elem.removeEventListener('click', checkElement);
				buttonStart.addEventListener('click', playGame);
			break;
		}
	}));


}




//This function clone array
function cloneArray(arr) {
	return arr.map(elem => elem);
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



function getAttributeDatasetNumberElement(elem) {
	return elem.dataset.number;
}

