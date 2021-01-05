/*class Observer{
    constructor(){
        this.observers = [];
    }

    subscribe(obj){
        this.observers.push(obj);
    }

    unsubscribe(c){
        this.observers = this.observers.filter(observer => observer instanceof c !== true);
    }

    notify(model){
        this.observers.forEach(observer =>{
            observer.notify(model);
        })
    }
}

class OperationObserver extends Observer{
    constructor(){
        super();
        this.input = "";
    }

    notify(input){
        this.input += input;
        super.notify(this);
    }
}

class ShowOperationInput {
    notify(model) {
        document.getElementById("operation").value = model.input;
    }
}

let operationObserver =  new OperationObserver();
let operationInput = new ShowOperationInput();
operationObserver.subscribe(operationInput)*/
//document.getElementById("mitexto").addEventListener("input", (event)=> { operationObserver.notify(event.target.value) ;});
let charsOperation = [];
let number = "";
//index sirve para actualizar el valor de un numero, es el indice del numero actual
let index = 0;
let calculator = new Calculator();
let operationField = document.getElementById("operation");
let resultField = document.getElementById("result");


let updateInput = (evt) => {
    console.log(evt)
    charsOperation.push(evt.target.value)
    operationField.value = charsOperation.join("");
}

let clearFields = () => {
    operationField.value = "";
    resultField.innerHTML = "0";
    charsOperation = [];
    number = ""
}

let changeSign = () => {
    let lastChar = charsOperation[index]
    let result = parseInt(resultField.innerHTML)
    if(charsOperation.length == 0 &  result < 0 | result > 0) {
        result =  - result;
        resultField.innerHTML = result;
    }
    if(!isNaN(lastChar)) {
        number = - parseInt(lastChar)
        charsOperation[index] = String(number);
        operationField.value = charsOperation.join("");
    }
}

let addNumber = (evt) => {
    let lastChar = charsOperation[index]
    if(['x', '/', '+', '-'].includes(lastChar)) {
        ++index;
    }
    number += evt.target.value;
    charsOperation[index] = number;
    operationField.value = charsOperation.join("");
}

let addArithSign = (evt) => {
    let lastChar = charsOperation[index]
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
    operationField.value = charsOperation.join("");
}
//limpia la operacion y el resultado lo declara en 0
let cleanButton = document.getElementById("clean");
cleanButton.addEventListener("click", clearFields)

//agrega el numero a una valiable y la muestra en el campo
let buttons = document.querySelectorAll(".btn")
buttons.forEach((btn) => {
    btn.addEventListener("click", addNumber);
})

let arithButtons = document.querySelectorAll(".arith-opr");
arithButtons.forEach((btn) => {
    btn.addEventListener("click", addArithSign);
});

//ejecuta el calculo y asigna el resultado al parrafo correspondiente
let resultButton = document.getElementById("calculate-result");
resultButton.addEventListener("click", () => {
    if(charsOperation.length > 0) {
        let operationResult = calculator.run(charsOperation)
        resultField.innerHTML = operationResult;
    }
});

let signButton = document.getElementById("sign"); 
signButton.addEventListener("click", changeSign)