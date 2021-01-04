class Observer{
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
        document.getElementById("operation").innerHTML = model.input;
    }
}

let operationObserver =  new OperationObserver();
let operationInput = new ShowOperationInput();
operationObserver.subscribe(operationInput)
//document.getElementById("mitexto").addEventListener("input", (event)=> { operationObserver.notify(event.target.value) ;});

let calculator = new Calculator();
//console.log(calculator.run("(5)"))

let updateInput = (evt) => {
    console.log(evt)
    operationObserver.notify(evt.target.value);
}

let buttons = document.querySelectorAll(".btn")
buttons.forEach((btn) => {
    btn.addEventListener("click", updateInput)
})
let resultButton = document.getElementById("calculate-result");
resultButton.addEventListener("click", (evt) => {
    let operation = document.getElementById("operation").innerHTML;
    let result = calculator.run(operation)
    document.getElementById("result").innerHTML = result;
});
console.log(buttons)