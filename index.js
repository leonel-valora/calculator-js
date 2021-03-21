window.onload = () => {
/*------ Behavior of calculator ------*/

//HTML Elements
let operationField = document.getElementById("operation");
let resultField = document.getElementById("result");
//Add a number to the operation
let addNumber = (evt) => {
    let actualOperation = operationField.value;
    operationField.readOnly = false;
    operationField.value =  String(actualOperation +  evt.target.value);
    operationField.readOnly = true;
    /*
    let lastChar = charsOperation[index]
    if(['x', '/', '+', '-'].includes(lastChar)) {
        ++index;
    }
    number += evt.target.value;
    charsOperation[index] = number;
    operationField.value = charsOperation.join("");*/
}

//Add number to work with float numbers
let addDot = (evt) => {
    let actualOperation = operationField.value;
    operationField.value =  actualOperation +  evt.target.value;
    evt.target.disabled = true;
};
//Add arismetic simbol [*,/,+,-]
let addArithSign = (evt) => {
    let sign = evt.target.value;
    let actualOperation = operationField.value;
    let lastChar = actualOperation[actualOperation.length - 1];
    if(!isNaN(lastChar) || (sign == '-' && (lastChar != '.' && lastChar != '-'))) {
        operationField.value =  actualOperation +  sign;
        dotButton.disabled = false;
    } 
    /*
    let lastChar = charsOperation[index];
    let arithSign = evt.target.value;
    if(lastChar == arithSign) {
        return;
    }
    // si el ultimo caracter es un numero o ')' se puede agregar el signo de operacion
    if(!isNaN(lastChar) | lastChar == ')') {
        ++index;
        charsOperation.push(arithSign);
        number = "";
    }
    // de lo contrario se reemplaza
    else if(['x', '/', '+', '-'].includes(lastChar)) {
        charsOperation[index] = arithSign;
        number = "";        
    }
    operationField.value = charsOperation.join("");*/
}
//Change the value of the result multiply it by negative(-1)
let changeSign = () => {
    let result =  resultField.value;
    if(!isNaN(result) && result != 0) {
        result = - result;
        resultField.innerText = String(result);
    }
}
//Get all buttons to make operation string
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((btn) => {
    btn.addEventListener("click", addNumber);
});
//button dot to work with float numbers
let dotButton = document.getElementById("dot");
dotButton.addEventListener("click", addDot);
//buttons no numerics
let arithButtons = document.querySelectorAll(".arith-operator");
arithButtons.forEach((btn) => {
    btn.addEventListener("click", addArithSign);
});
//button to change sign a number
let signButton = document.getElementById("sign"); 
signButton.addEventListener("click", changeSign);


/* ------ result and clean area ------*/

//Supporting variables
let calculator = new Calculator();
//Clean result and operation
let clearFields = () => {
    operationField.value = "";
    resultField.innerHTML = "0";
    dotButton.disabled = false;
};
//Solve operation if input length >= 1
let runOperation = () => {
    let operation = operationField.value;
    if(operation.length > 0) {
        let result = calculator.run(operation);
        resultField.innerHTML = result;
    }
};
//
let deleteLastChar = () => {
    let actualOperation = operationField.value;
    if(actualOperation.length > 0) {
        actualOperation = actualOperation.slice(0, actualOperation.length - 1);
        operationField.value = actualOperation;
    }
}

//Get cleaner button and add event
let cleanButton = document.getElementById("clean");
cleanButton.addEventListener("click", clearFields);
//Get button to run calculate operation
let resultButton = document.getElementById("calculate-result");
resultButton.addEventListener("click", runOperation);
//
let deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", deleteLastChar);

};

