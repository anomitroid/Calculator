const body = document.querySelector ('body');
const main = document.createElement ('div');
main.classList.add ('calculator'); // creating space in body
body.appendChild (main);
const container = document.createElement ('div');
container.classList.add ('container'); // creating body of calculator
main.appendChild (container);

const display = document.createElement ('div');
display.classList.add ('display'); // creating div where results will be displayed
container.appendChild (display);

/* 
    creating buttons for numbers and operators
    AC   +/-   %   /
    9    8     7   *
    6    5     4   -
    3    2     1   +
      0        .   =
*/

// ROW 1
const AC = document.createElement ('button');
AC.classList.add ('clear');
AC.textContent = 'AC'
container.appendChild (AC);
const neg = document.createElement ('button');
neg.classList.add ('sign');
neg.textContent = '+/-'
container.appendChild (neg);
const percent = document.createElement ('button');
percent.classList.add ('percent');
percent.textContent = '%'
container.appendChild (percent);
const divide = document.createElement ('button');
divide.classList.add ('/');
divide.textContent = '/'
container.appendChild (divide);

// ROW 2
const nine = document.createElement ('button');
nine.classList.add ('9');
nine.textContent = '9'
container.appendChild (nine);
const eight = document.createElement ('button');
eight.classList.add ('8');
eight.textContent = '8'
container.appendChild (eight);
const seven = document.createElement ('button');
seven.classList.add ('7');
seven.textContent = '7'
container.appendChild (seven);
const multiply = document.createElement ('button');
multiply.classList.add ('*');
multiply.textContent = '*'
container.appendChild (multiply);

// ROW 3
const six = document.createElement ('button');
six.classList.add ('6');
six.textContent = '6'
container.appendChild (six);
const five = document.createElement ('button');
five.classList.add ('5');
five.textContent = '5'
container.appendChild (five);
const four = document.createElement ('button');
four.classList.add ('4');
four.textContent = '4'
container.appendChild (four);
const minus = document.createElement ('button');
minus.classList.add ('-');
minus.textContent = '-'
container.appendChild (minus);

// ROW 4
const three = document.createElement ('button');
three.classList.add ('3');
three.textContent = '3'
container.appendChild (three);
const two = document.createElement ('button');
two.classList.add ('2');
two.textContent = '2'
container.appendChild (two);
const one = document.createElement ('button');
one.classList.add ('1');
one.textContent = '1'
container.appendChild (one);
const add = document.createElement ('button');
add.classList.add ('+');
add.textContent = '+'
container.appendChild (add);

// ROW 5
const zero = document.createElement ('button');
zero.classList.add ('zero');
zero.textContent = '0'
container.appendChild (zero);
const point = document.createElement ('button');
point.classList.add ('.');
point.textContent = '.'
container.appendChild (point);
const equal = document.createElement ('button');
equal.classList.add ('=');
equal.textContent = '='
container.appendChild (equal);

// classes for similar buttons
divide.classList.add ('operator');
multiply.classList.add ('operator');
minus.classList.add ('operator');
add.classList.add ('operator');
equal.classList.add ('equals');

nine.classList.add ('number');
eight.classList.add ('number');
seven.classList.add ('number');
six.classList.add ('number');
five.classList.add ('number');
four.classList.add ('number');
three.classList.add ('number');
two.classList.add ('number');
one.classList.add ('number');
zero.classList.add ('number');
point.classList.add ('number');

// Adding key data reference to numbers
zero.dataset.key = '0';
one.dataset.key = '1';
two.dataset.key = '2';
three.dataset.key = '3';
four.dataset.key = '4';
five.dataset.key = '5';
six.dataset.key = '6';
seven.dataset.key = '7';
eight.dataset.key = '8';
nine.dataset.key = '9';
point.dataset.key = '.';
add.dataset.key = '+';
minus.dataset.key = '-';
multiply.dataset.key = '*';
divide.dataset.key = '/';
equal.dataset.key = 'Enter';
AC.dataset.key = ' ';
neg.dataset.key = 'n';
percent.dataset.key = '%';

// JAVASCRIPT FOR CALCULATOR

let displayValue = '0'; // initial display value. This variable will be responsible for all results which will be ultimately displayed
const buttons = document.querySelectorAll ('button'); // returns nodelist of all elements with tag = button
let firstInput = null; // this checks if the inputted number is the very first after loading page
let operatorsInput = 0; // this checks if the last inputted button is an operator or not, if an operator has already been inputted, we cannot input another.
let newOperation = 0; // this checks if the inputted number is the very first after resetting the calculator
let firstOperator = 0; // this checks if the operator being inputted is the first operator or multiple operators are being used wihout pressing '='


window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key = '${e.key}']`);
    key.click();
});


function showDisplay () {
	if (displayValue == "80085") display.innerText = "(.)(.)";
	else if (displayValue.length > 9) display.innerText = displayValue.substring (0, 9); // we need to limit the number of digits
	else display.innerText = displayValue; // initial display set to 0
}

showDisplay (); // displaying initial 0


function input () {
	for (let i = 0; i < buttons.length; i ++) {
		buttons[i].addEventListener ('click', function () { // adding event listener to clicks on th ebuttons
			if (buttons[i].classList.contains ('number') || buttons[i].classList.contains ('operator')) { // if the clicked buttons are number or operator, display them as a string
				inputOperation (buttons[i].innerText); // function to deal with inputs
				showDisplay ();
			}
			else if (buttons[i].classList.contains ('equals')) { // function to deal with results
				inputEquals ();
				showDisplay ();
			}
			else if (buttons[i].classList.contains ('clear')) { // function to reset all variables and restart display to 0
				inputClear ();
				showDisplay ();
			}
			else if (buttons[i].classList.contains ('sign')) { // function to deal with (-ve) unary operator
				inputSign ();
				showDisplay ();
			}
			else if (buttons[i].classList.contains ('percent')) { // function to deal with % unary operator
				inputPercentage ();
				showDisplay ();
			}
		})
	}
}

input ();

function inputOperation (token) {
	if (firstInput === null || newOperation == 1) { // When firstInput is null, page has been reloaded. 
		//When new operation is 1, we are starting a new calculation after pressing '='
		if (token >= 0 && token <= 9) { // input is a number
			displayValue = token;
			firstInput = token; // first input has been taken in new page, After this, keep appending
			newOperation = 0; // first input has been taken after pressing '=', After this, keep appeding
		}
		if (newOperation == 1 && ! (token >= 0 && token <= 9)) { // input is an operation and operator being inputted just after a calculation has been done without pressing '='
			if (firstOperator == 0) { // if only one operation is done in a stretch
				displayValue += token; // appending
				operatorsInput = 1;
				newOperation = 0;
			}
			else { // if multiple operations are done in a stretch
				inputEquals (); // calculate the first operation done 
				showDisplay (); // show the first operation done before taking next operator as input
				displayValue += token;
				operatorsInput = 1; // we cannot input another operator after this
				newOperation = 0;
			}
		}
	}
	else {
		if ((! (token >= 0 && token <= 9) && operatorsInput == 0)) { // input is an operator and this is the first operator being input after a number
			if (firstOperator == 0) { // if only one operation is done in a stretch
				displayValue += token;
				operatorsInput = 1;
				firstOperator = 1;
			}
			else {
				inputEquals ();
				showDisplay ();
				displayValue += token;
				operatorsInput = 1;
				firstOperator = 1;
				newOperation = 0;
			}
		}
		else if (token >= 0 && token <= 9) { // input is a number
			displayValue += token;
			operatorsInput = 0; // now, we can input operators
		} 
	}
}

function inputEquals () {
	const numbers = []; // this stores the numbers within the string
	const operations = []; // this stores the operators
	let i = 0; // left pointer
	let x = ""; // this stores the number which will be pushed into the numbers array
	while (i < displayValue.length) {
		while ((displayValue[i] >= 0 && displayValue[i] <= 9) || displayValue[i] == '.') { // if character is a number or '.', append it to x
			x += displayValue[i];
			i ++;
		}
		numbers.push (x); // pushing number into array of numbers
		operations.push (displayValue[i]); // pushing the operators in array of operators
		x = ""; // resetting the string which stores numbers
		i ++;
	}
	operations.pop (); // last value in operators array is undefined variable, so we remove it
	// console.log (numbers);
	// console.log (operations);
	for (let i = 0; i < numbers.length - 1; i ++) {
		let tempResult = operate (Number (numbers[i]), Number (numbers[i + 1]), operations[i]); // calculate the operation between adjacent elements of the numbers array using the operator present in operators array
		numbers[i + 1] = tempResult; // update the numbers array with the result of previous calculation so that the next operation is carried with this result as one of the operands
		console.log (numbers);
		displayValue = numbers[i + 1]; // keep updating display value in case user inputs multiple operations without pressing '='
	}
	//displayValue = numbers[numbers.length - 1];
	newOperation = 1;
}

function operate (a, b, op) { // calculates the results
	if (op == '+') return a + b;
	else if (op == '-') return a - b;
	else if (op == '*') return Number.isInteger(a * b) ? a * b : (a * b).toFixed(4);
	else if (op == '/') return b === 0 ? "gud mar" : Number.isInteger(a / b) ? a * b : (a / b).toFixed(4);
}

function inputClear () { // resets all variables to intial stage
	displayValue = 0;
	firstInput = null;
	operatorsInput = 0;
	newOperation = 0;
	firstOperator = 0;
}

function inputSign () { // changes sign of last input
	newOperation = 0;
	operatorsInput = 0;
	if (displayValue.includes('+') || displayValue.includes('*') || displayValue.includes('-') || displayValue.includes('/')) {
		inputEquals ();
		displayValue *= -1;
		showDisplay ();
	}
	else displayValue = displayValue * (-1);
}

function inputPercentage () { // changes last number input into a percentage
	let i;
	for (i = displayValue.length - 1; i >= 0; i --) {
		if (! ((displayValue[i] >= 0 && displayValue[i] <= 9) || displayValue[i] == '.')) break; // index of last number part of the display string
	}
	const displayArray = Array.from (displayValue); // make an array out of the string
	console.log (displayArray);
	let fractional = displayArray.splice (i + 1, displayValue.length - i).reduce ((number, value) => ((number) + (+value)), ''); // take out the fractional part fom the array
	console.log (displayArray);
	console.log(fractional);
	displayValue = displayArray.reduce ((number, value) => (number + ((value >= 0 && value <= 9) ? (+value) : value)), '') + (+(fractional / 100)); // rejoin the rest of the array with the fractional part
	console.log (displayValue);
}
