const body = document.body;
const displayTop = document.querySelector('.display-operation');
const displayBottom = document.querySelector('.display-numbers');
const btns = Array.from(document.querySelectorAll('.btn'));
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');

let num1 = '';
let num2 = ''
let operator = '';
let displayOnScreen = '';
let displayResult;
let isResult = false;
let isOperator = false;
let isNum1 = false;
let enter = false;
let isEqual = false;


for(let btn of btns) {
    if(!btn.id) {
        btn.addEventListener('click', (e)=> {
            enter = false;
            if(displayBottom.textContent === '0' || isResult || isOperator) {
                displayBottom.textContent = '';
                isResult = false;
                isOperator = false
            } else if(isEqual) {
                displayBottom.textContent = '';
            }
            displayBottom.textContent += btn.textContent;
            if(!isNum1) {
                displayOnScreen += btn.textContent;
                num1 = Number(displayBottom.textContent);
            } else {
                displayOnScreen += btn.textContent;
                num2 = Number(displayBottom.textContent);
            }
        })
    } else if(btn.id === 'divide') {
        btn.addEventListener('click', (e) => {
            const ops = displayOnScreen[displayOnScreen.length - 2];
            if(ops === '*' || ops === '+' || ops === '-') {
                operations(displayOnScreen[displayOnScreen.length - 2]);
                return
						}
            operator = '/';
            isOperator = true;
            isNum1 = true;
            if(!enter && num2) {
                operate(num1,num2,operator)
                displayTop.textContent = displayOnScreen;
                displayBottom.textContent = displayResult;
                num1 = displayResult;
                num2 = '';
                enter = true;
            } else if(displayOnScreen.length > 3 && !enter && num2) {
                operate(num1,num2,operator)
                displayTop.textContent = displayOnScreen;
                displayBottom.textContent = displayResult;
                num1 = displayResult;
                num2 = '';
                enter = true;
            }
            if(!isNotNumber(displayOnScreen)) {
                displayOnScreen += '÷';
                displayTop.textContent = displayOnScreen;
            }
        })
    }  else if(btn.id === 'times') {
        btn.addEventListener('click', (e) => {
					const ops = displayOnScreen[displayOnScreen.length - 2];
            if(ops === '÷' || ops === '+' || ops === '-') {
                operations(displayOnScreen[displayOnScreen.length - 2]);
                return
						}
            operator = '*';
            isOperator = true;
            isNum1 = true;
        
            if(!enter && num2) {
                operate(num1,num2,operator)
                displayTop.textContent = displayOnScreen;
                displayBottom.textContent = displayResult;
                num1 = displayResult;
                num2 = '';
                enter = true;
            } else if(displayOnScreen.length > 3 && !enter && num2) {
                operate(num1,num2,operator)
                displayTop.textContent = displayOnScreen;
                displayBottom.textContent = displayResult;
                num1 = displayResult;
                num2 = '';
                enter = true;
            }
            if(!isNotNumber(displayOnScreen)) {
                displayOnScreen += '*';
                displayTop.textContent = displayOnScreen;
            }
        })
    }  else if(btn.id === 'plus') {
        btn.addEventListener('click', (e) => {
					const ops = displayOnScreen[displayOnScreen.length - 2];
            if(ops === '÷' || ops === '*' || ops === '-') {
                operations(displayOnScreen[displayOnScreen.length - 2]);
                return
						}
            operator = '+';
            isOperator = true;
            isNum1 = true;
            if(!enter && num2) {
                operate(num1,num2,operator)
                displayTop.textContent = displayOnScreen;
                displayBottom.textContent = displayResult;
                num1 = displayResult;
                num2 = '';
                enter = true;
            } else if(displayOnScreen.length > 3 && !enter&& num2) {
                operate(num1,num2,operator)
                displayTop.textContent = displayOnScreen;
                displayBottom.textContent = displayResult;
                num1 = displayResult;
                num2 = '';
                enter = true;
            }
            if(!isNotNumber(displayOnScreen)) {
                displayOnScreen += '+';
                displayTop.textContent = displayOnScreen;
            }
        })
    }  else if(btn.id === 'minus') {
        btn.addEventListener('click', (e) => {
					const ops = displayOnScreen[displayOnScreen.length - 2];
            if(ops === '÷' || ops === '+' || ops === '*') {
                operations(displayOnScreen[displayOnScreen.length - 2]);
                return
						}
            operator = '-';
            isOperator = true;
            isNum1 = true;
            if(!enter && num2) {
                operate(num1,num2,operator)
                displayTop.textContent = displayOnScreen;
                displayBottom.textContent = displayResult;
                num1 = displayResult;
                num2 = '';
                enter = true;
            } else if(displayOnScreen.length > 3 && !enter&& num2) {
                operate(num1,num2,operator)
                displayTop.textContent = displayOnScreen;
                displayBottom.textContent = displayResult;
                num1 = displayResult;
                num2 = '';
                enter = true;
            }
            if(!isNotNumber(displayOnScreen)) {
                displayOnScreen += '-';
                displayTop.textContent = displayOnScreen;
            }
        })
    } else if(btn.id === 'equals') {
        btn.addEventListener('click', (e) => {
            if(operator) {
								const ops = displayOnScreen[displayOnScreen.length - 2];
							if(ops === '÷' || ops === '+' || ops === '*') {
									operations(displayOnScreen[displayOnScreen.length - 2]);
									return
							}
							isResult = true;
							if(!num2) {
									num2 = num1;
									displayOnScreen += String(num2);
									operate(num1,num2, operator)
							} else {
									operate(num1,num2, operator)
							}
							console.log(`equal ${displayOnScreen}`)
							clearAll();
							displayTop.textContent = displayOnScreen;
							displayBottom.textContent = displayResult;
							displayOnScreen = '';
							isEqual = true;
            }
        })
    }
}


body.addEventListener('keyup', (e) => {
    const key = event.keyCode || event.which;
    let normalizeKeycode;
    if(isKeypad(key)) {
        if(key < 106) {
            normalizeKeycode = key - 48;
        } if(key >= 106) {
						normalizeKeycode = key - 64;
        }
        const keychar = String.fromCharCode(normalizeKeycode);
        if(normalizeKeycode >= 46 && normalizeKeycode <= 57) {
            displayBottom .textContent = keychar;
				}
		}

})


clear.addEventListener('click', (e) => {
    clearAll()
})


function operations(op) {
    if(op === '*') {
			operator = '*';
			isOperator = true;
			isNum1 = true;
			
			if(!enter && num2) {
					operate(num1,num2,operator)
					displayTop.textContent = displayOnScreen;
					displayBottom.textContent = displayResult;
					num1 = displayResult;
					num2 = '';
					enter = true;
			} else if(displayOnScreen.length > 3 && !enter && num2) {
					operate(num1,num2,operator)
					displayTop.textContent = displayOnScreen;
					displayBottom.textContent = displayResult;
					num1 = displayResult;
					num2 = '';
					enter = true;
			}
			if(!isNotNumber(displayOnScreen)) {
					displayOnScreen += '*';
					displayTop.textContent = displayOnScreen;
			}
    } else if(op === '÷') {
			operator = '/';
			isOperator = true;
			isNum1 = true;
			if(!enter && num2) {
					operate(num1,num2,operator)
					displayTop.textContent = displayOnScreen;
					displayBottom.textContent = displayResult;
					num1 = displayResult;
					num2 = '';
					enter = true;
			} else if(displayOnScreen.length > 3 && !enter && num2) {
					operate(num1,num2,operator)
					displayTop.textContent = displayOnScreen;
					displayBottom.textContent = displayResult;
					num1 = displayResult;
					num2 = '';
					enter = true;
			}
			if(!isNotNumber(displayOnScreen)) {
					displayOnScreen += '÷';
					displayTop.textContent = displayOnScreen;
			}

		} else if(op === '+') {
			operator = '+';
			isOperator = true;
			isNum1 = true;
			if(!enter && num2) {
					operate(num1,num2,operator)
					displayTop.textContent = displayOnScreen;
					displayBottom.textContent = displayResult;
					num1 = displayResult;
					num2 = '';
					enter = true;
			} else if(displayOnScreen.length > 3 && !enter&& num2) {
					operate(num1,num2,operator)
					displayTop.textContent = displayOnScreen;
					displayBottom.textContent = displayResult;
					num1 = displayResult;
					num2 = '';
					enter = true;
			}
			if(!isNotNumber(displayOnScreen)) {
					displayOnScreen += '+';
					displayTop.textContent = displayOnScreen;
			}
			
		} else if(op === '-') {
			operator = '-';
			isOperator = true;
			isNum1 = true;
			if(!enter && num2) {
					operate(num1,num2,operator)
					displayTop.textContent = displayOnScreen;
					displayBottom.textContent = displayResult;
					num1 = displayResult;
					num2 = '';
					enter = true;
			} else if(displayOnScreen.length > 3 && !enter&& num2) {
					operate(num1,num2,operator)
					displayTop.textContent = displayOnScreen;
					displayBottom.textContent = displayResult;
					num1 = displayResult;
					num2 = '';
					enter = true;
			}
			if(!isNotNumber(displayOnScreen)) {
					displayOnScreen += '-';
					displayTop.textContent = displayOnScreen;
			}
		}
}

function isNotNumber(str) {
    let notNumber = false;
    if(str[0] === '*' || str[0] === '+' || str[0] === '-' || str[0] === '÷') {
        notNumber = true;
    } else if(str[str.length - 1]) {
        if(str[str.length - 1] === '*' || str[str.length - 1] === '+' || str[str.length - 1] === '-' || str[str.length - 1] === '÷') {
            notNumber = true;
        }
    }
    return notNumber;
}

function clearAll() {
    displayTop.textContent =  '';
    displayBottom.textContent = '0';
    num1 = '';
    num2 = ''
    operator = '';
    if(!isResult) {
        displayOnScreen = '';
        isResult = false;
    }
    displayResult;
    isResult = false;
    isOperator = false;
    isNum1 = false;
    counter = 0;
}

backspace.addEventListener('click', (e) => {
    displayBottom.textContent = '0';
})

function isKeypad(keyCode) {
    if(keyCode >=96 && keyCode <= 111) {
        return true;
    } else {
        return false;
    }
}

function isDigit(keyCode) {
    if(keyCode >=48 && keyCode <=58) {
        return true;
    } else {
        return false;
    }
}


function operate(num1,num2,operator) {
    if(operator === '+') {
        add(num1,num2);
    } else if(operator === '-') {
        subtract(num1,num2)
    } else if(operator === '*') {
        multiply(num1,num2)
    } else if(operator === '/') {
        divide(num1,num2)
    } else {
        console.log('Wrong')
    }
}


function add(num1,num2) {
    displayResult = num1 + num2;
    console.log(num1 + num2);
}
function subtract(num1,num2) {
    displayResult = num1 - num2;
    console.log(num1 - num2);
}
function multiply(num1,num2) {
    displayResult = num1 * num2;
    console.log(num1 * num2);
}
function divide(num1,num2) {
    displayResult = num1 / num2;
    console.log(num1 / num2);
}

