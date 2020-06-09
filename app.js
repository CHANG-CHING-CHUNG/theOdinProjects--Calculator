const body = document.body;
const displayTop = document.querySelector('.display-operation');
const displayBottom = document.querySelector('.display-numbers');
const btns = Array.from(document.querySelectorAll('.btn'));
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');

let num = 0;
let operator;
let isCalculationDone = false;

for(let btn of btns) {
    btn.addEventListener('click', (e) => {
        btnEvent(btn);
})}


clear.addEventListener('click', (e) => {
    clearData();
})


function btnEvent(btn) {
    if(!btn.id) {
        if(isCalculationDone) {
            clearData();
        }


        if(displayTop.textContent[0] === '0') {
            displayTop.textContent = displayTop.textContent.slice(1);
        }

        displayTop.textContent += btn.textContent


    } else if(checkOP(btn.id) === 'equals' && displayTop.textContent.length === 3) {
        
        num = Number(displayTop.textContent[0]);
        calculation(num,Number(displayTop.textContent[2]), displayTop.textContent[1]);
        displayBottom.textContent = num;
        isCalculationDone = true;

    } else if(checkOP(btn.id) != 'equals') {

        if(hasOp(displayTop.textContent)) {
            displayTop.textContent = displayTop.textContent.slice(0,displayTop.textContent.length - 1);
        }
        displayTop.textContent += operator;

        operator = '';

    }


}

function hasOp(str) {
    let result = displayTop.textContent;
    let currIdx = str.length - 1 ;
    if(result[currIdx] === '+') {
        return true
    } else if(result[currIdx] === '-') {
        return true
    } else if(result[currIdx] === '*') {
        return true
    } else if(result[currIdx] === '/') {
        return true
    } else {
        return false;
    }
}

function calculation(firstN,secondN,ope) {
    if(ope === '+') {
        num = firstN + secondN;
        console.log(num)

    } else if(ope === '-') {
        num = firstN - secondN;
        console.log(num)
    } else if(ope === '*') {
        num = firstN * secondN;
        console.log(num)
    } else if(ope === '/') {
        num = firstN / secondN;
        console.log(num)
    }
}

function parseStr(str) {
    
}

function checkOP(btnId) {
    if(btnId === 'divide') {
        console.log('/');
        operator = '/'
        return operator;
    } else if(btnId === 'times') {
        console.log('*');
        operator = '*'
        return operator;
    } else if(btnId === 'plus') {
        console.log('+');
        operator = '+'
        return operator;
    } else if(btnId === 'minus') {
        console.log('-');
        operator = '-'
        return operator;
    } else if(btnId === 'equals') {
        console.log('Calculation is done');
        operator = '';
        return 'equals';
    }
}

function clearData() {
    displayTop.textContent = '0';
    displayBottom.textContent = '';
    num = 0;
    isCalculationDone = false;
}