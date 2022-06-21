'use strict';

let circles = document.querySelectorAll('.circle'); //This is array of circle; 
let buttonStart = document.querySelector('button-start'); // This is button to start game;
let sounds = ['one', 'two', 'tree', 'four']; //This is an array of sound names
let sequenceArray = []; //In this array will record sequence


//This function added the event on elements
function addEvenetClickOnElements(arr, func) {
	for (let elem of arr) {
		elem.addEventListener('click', func.bind(this, elem))
	}
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

function addClassElement(elem, addClass) {
	elem.classList.add(addClass);
}

function removeClassElement(elem, removeClass) {
	elem.classList.remove(removeClass);
}

function showSequence(arr) {
	let counter = 0;
		do {
			let circle = document.querySelector(`[data-number="${arr[counter]}"]`);
			setInterval(function() {
				addSound(circle);
				addClassElement(circle, 'circle_active');
			}, 1000)

			counter++;
			removeClassElement(circle, 'circle_active');
		} while (counter <= arr.length - 1);
}




showSequence(sounds);

addEvenetClickOnElements(circles, addSound);

