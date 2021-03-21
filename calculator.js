class Calculator {

    constructor() {
        this.resolvePriority = this.resolvePriority.bind(this)
    }

    isValidSyntax(operation) {
        let pattern = /(^(-?[0-9]*\.?[0-9]+[x\/\+\-])+(-?[0-9]*\.?[0-9]+)$|^(-?[0-9]*\.?[0-9]+)$)/;
        return pattern.test(operation);
    }

    makeOperation(characters) {
        let result = 0;
        let validOperators = ['x', '/', '+', '-'];
        let simbols = validOperators.filter(simbol => characters.includes(simbol));
        simbols.forEach(simbol => {
            let index = characters.indexOf(simbol)
            let a = parseFloat(characters[index - 1]);
            let b = parseFloat(characters[index + 1]);
            if (simbol == 'x') {
                result = a * b;
            }
            else if(simbol == '/') {
                result = a / b;
            }
            else if(simbol == '+') {
                result = a + b;
            }
            else if(simbol == '-') {
                result = a - b;
            }
            characters.splice(index - 1, 3, result)
        });

        return result;
    }

    resolve(characters) {
        let operation = characters.join("");
        if(this.isValidSyntax(operation)) {
            if(characters.length == 1) {
                return characters[0]
            }
            return this.makeOperation(characters);
        }
        return "Error de Syntaxis";
    }

    resolvePriority(characters) {
        if (characters.includes('(') && characters.includes(')')) {
            let index1 = characters.lastIndexOf('(');
            let index2 = characters.indexOf(')');
            let subOperation = characters.slice(index1 + 1, index2);
            let result = this.resolve(subOperation);
            characters.splice(index1, (index2 - index1) + 1, result);
            return this.resolvePriority(characters)
        } 
        return characters;
    }

    convertToArray(operation) {
        let array = [];
        let number = "";
        for(let i = 0; i < operation.length; i++) {
            number += operation[i];
            if(i == operation.length - 1) {
                array.push(number);
                break;
            }
            else if(operation[i].match(/[x\/+-]/) && !isNaN(operation[i - 1])) {
                array.push(number);
                number = "";
            }
            else if(operation[i + 1].match(/[x\/+-]/)) {
                array.push(number);
                number = "";
            }
        }
        return array;
    }

    run(operation) {
        if(operation.length == 1 && !isNaN(operation)) {
            return operation;
        }
        if(!this.isValidSyntax(operation)) {
            return "Syntax Error";
        }
        let characters = this.convertToArray(operation);
        console.log(characters);
        characters = this.resolvePriority(characters);
        let result = this.resolve(characters);
        result = Number(result);
        return result.toFixed(2);
    }
}