const form = document.querySelector('form');
const list = document.querySelector('ul');
const clear = document.getElementById('clear-button');
const log = document.getElementById('log');

const data = JSON.parse(localStorage.getItem("items") || '[]');

function liMaker(input) {
	var item = document.createElement('li');
	var text = document.createElement('p');

	item.id = "item";
	text.innerHTML = input;
	
	item.appendChild(text);
	list.appendChild(item);
}

function onPageLoad() {
	for (var i = 0; i < data.length; i++) {
		liMaker(data[i]);
	}

}

function logSubmit(event) {
	event.preventDefault();

	var input = document.getElementById('text-input').value;

	log.textContent = "Form Submitted! Time stamp : " + event.timeStamp;

	data.push(input);
	localStorage.setItem("items", JSON.stringify(data));
	
	liMaker(input);
}

function clearData() {
	localStorage.clear();
	list.innerHTML = "";
}

function showData() {
	console.log(JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', onPageLoad);
form.addEventListener('submit', logSubmit);
clear.addEventListener('click', clearData);