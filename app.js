const body = document.body;
const displayTop = document.querySelector('.display-operation');
const displayBottom = document.querySelector('.display-numbers');
const btns = Array.from(document.querySelectorAll('.btn'));
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');


let num = 0;
let operator;
let isCal = false;
let isContinue = true;
let dotActive = false;
let strArr = []

for(let btn of btns) {
    btn.addEventListener('click', (e) => {

        if(checkId(btn.id)) {
            dotActive = false;
            if(isCal) {
                displayBottom.textContent =  operation(strArr,operator);
                displayTop.textContent = displayBottom.textContent;
                strArr[0] = displayBottom.textContent;
            }
            if(isOpes()) {
                displayTop.textContent =  displayTop.textContent.slice(0, displayTop.textContent.length - 1)
            }
            if(!isCal) {
                displayTop.textContent += operator;
                strArr = parseStr(displayTop.textContent, operator);
            }
            if(strArr.length === 2) {
                displayBottom.textContent =  operation(strArr,operator);
                displayTop.textContent = displayBottom.textContent;
                strArr[0] = displayBottom.textContent;
                isCal = false;
                isContinue = true;
            }
        } else if(btn.id != 'plus-minus' && btn.id != 'equals' && btn.id != 'backspace') {
            if(displayTop.textContent[0] === '0' && !displayTop.textContent[1]) {
                displayTop.textContent = '';
            }
            if(isCal && isContinue) {
                displayTop.textContent = '';
                isContinue = false;
            }
            if(dotActive && btn.textContent === '.') {
                return
            }
            if(!displayTop.textContent && btn.textContent === '.') {
                displayTop.textContent = '0';
                dotActive = true;
                if(displayTop.textContent[0] === '0' && btn.textContent === '.') {
                    displayTop.textContent += btn.textContent
                }
                return
            }
            displayTop.textContent += btn.textContent
            if(isCal) {
                strArr[0] = displayTop.textContent;
            }
            
        } else if(btn.id === 'equals') {
            if(!isCal) {
                strArr = parseStr(displayTop.textContent, operator);
            }
            if(strArr.length == 2) {

                displayBottom.textContent =  operation(strArr,operator);
                displayTop.textContent = displayBottom.textContent;
                strArr[0] = displayBottom.textContent;
                isCal = true;
           }
        }
    })
}

clear.addEventListener('click', (e) => {
    clearData();
})


function parseStr(str,ops) {
    if(ops != str[1]) {
        ops = str[1]
    }
    operator = ops;
    strArr = str.split(ops);
    strArr[1] = strArr[1].slice(0,1);
    if(!(strArr[strArr.length - 1]) ) {
        strArr.pop();
    }
    console.log(strArr);
    return strArr;
}

function operation(arr,ops) {
    num = Number(arr[1]);
    if(ops === '+') {
        return Number(arr[0]) + Number(arr[1]);
    } else if(ops === '-') {
        return Number(arr[0]) - Number(arr[1]);
    } else if(ops === '*') {
        return Number(arr[0]) * Number(arr[1]);
    } else if(ops === '/') {
        return Number(arr[0]) / Number(arr[1]);
    }
}

function isOpes() {
    if(displayTop.textContent[displayTop.textContent.length - 1] === '+') {
        return true;
    } else if(displayTop.textContent[displayTop.textContent.length - 1] === '-') {
        return true;
    } else if(displayTop.textContent[displayTop.textContent.length - 1] === '*') {
        return true;
    } else if(displayTop.textContent[displayTop.textContent.length - 1] === '/') {
        return true;
    }
    return false;
}


function checkId(btnId) {
    if(btnId === 'plus') {
        operator = '+'
        return true;
    } else if(btnId === 'minus') {
        operator = '-'
        return true;
    } else if(btnId === 'times') {
        operator = '*'
        return true;
    } else if(btnId === 'divide') {
        operator = '/'
        return true;
    }
    return false;
}


function clearData() {
    displayTop.textContent = '0';
    displayBottom.textContent = '';
    isCal = false;
    isContinue = true;
    dotActive = false;
    strArr = [];
    operator = '';
    num = 0;
}