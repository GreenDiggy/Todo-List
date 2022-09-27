const TEXT_STORAGE_ITEM = "text";
const BOOL_STORAGE_ITEM = "checks";

const form = document.querySelector('form');
const list = document.querySelector('ul');
const log = document.getElementById('log');
const clear = document.getElementById('clear-button');
const display = document.getElementById('display-btn');


const data = JSON.parse(localStorage.getItem(TEXT_STORAGE_ITEM) || '[]');
const checks = JSON.parse(localStorage.getItem(BOOL_STORAGE_ITEM) || '[]');

var inc = 0;

function liMaker(input, check) {
	var item = document.createElement('li');
	var paragraph = document.createElement('p');
	var checkbox = document.createElement('input');

	item.id = "item";
	paragraph.innerHTML = input;

	checkbox.id = "check_" + inc;
	checkbox.type = "checkbox";
	checkbox.checked = check;

	checkbox.addEventListener('change', checkEvent);
	
	item.appendChild(checkbox);
	item.appendChild(paragraph);
	list.appendChild(item);

	checks.push(check);

	inc++;
}

function onPageLoad() {
	for (var i = 0; i < data.length; i++) {
		liMaker(data[i], checks[i]);
	}

}

function logSubmit(event) {
	event.preventDefault();

	var input = document.getElementById('text-input').value;
	form.reset();

	log.textContent = "Form Submitted! Time stamp : " + event.timeStamp;

	data.push(input);
	saveData();
	
	liMaker(input, false);
}

function checkEvent(event) {

	console.log(event.target.id);
	saveData();
}

function saveData() {
	localStorage.setItem(TEXT_STORAGE_ITEM, JSON.stringify(data));
	localStorage.setItem(BOOL_STORAGE_ITEM, JSON.stringify(checks));
}

function clearData() {
	data = [];
	checks = [];
	localStorage.clear();
	list.innerHTML = "";
}

function showData() {
	console.log(JSON.stringify(checks));
}

document.addEventListener('DOMContentLoaded', onPageLoad);
form.addEventListener('submit', logSubmit);
clear.addEventListener('click', clearData);
display.addEventListener('click', showData);