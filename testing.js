const TEXT_STORAGE_ITEM = "text";
const BOOL_STORAGE_ITEM = "checks";

const form = document.querySelector('form');
const list = document.querySelector('ul');
const log = document.getElementById('log');
const clear = document.getElementById('clear-button');
const display = document.getElementById('display-btn');

var data = JSON.parse(localStorage.getItem(TEXT_STORAGE_ITEM) || '[]');
var checks = JSON.parse(localStorage.getItem(BOOL_STORAGE_ITEM) || '[]');

var inc = 0;

function liMaker(text, check) {
	var li = document.createElement('li');
	var label = document.createElement('label');
	var input = document.createElement('input');

	label.classList = "form_control";

	input.type = "checkbox";
	input.name = "checkbox";
	input.checked = check;

	label.insertAdjacentHTML('afterend', 'text');

	label.appendChild(input);
	li.appendChild(label);
	list.appendChild(li);
}

function liMaker_v2(input, check) {
    var root = document.createElement('li');
    var check = document.createElement('input');
    var label = document.createElement('p');
	// Root
    root.id = "item_" + inc;
	root.classList = "item";
	// Check
	check.type = 'checkbox';
	check.checked = check;
	// Label
	label.innerHTML = input;
	//label.htmlFor = document.getElementById("item_" + inc);
	// Parenting
	root.appendChild(check);
	root.appendChild(label);
	list.appendChild(root);

	inc++;
}

function onPageLoad() {

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

function showData() {
	console.log(JSON.stringify(checks));
}

// On page load
document.addEventListener('DOMContentLoaded', function() {
    for (var i = 0; i < data.length; i++) {
		liMaker(data[i], checks[i]);
	}
});
// Submit form
form.addEventListener('submit', logSubmit);
// Clear lists
clear.addEventListener('click', function() {
    data = [];
    checks = [];
    localStorage.clear();
    list.innerHTML = "";
});
// Debug
display.addEventListener('click', showData);