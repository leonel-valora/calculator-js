class Calculator {

    constructor() {
        this.resolvePriority = this.resolvePriority.bind(this)
    }

    run(operation) {
        let characters = operation;
        characters = this.resolvePriority(characters);
        console.log("array after solve priority : " + characters)
        return this.resolve(characters)
    }

    isValidSyntax(operation) {
        let pattern = /(^(-?[0-9]*\.?[0-9]+[x\/\+\-])+(-?[0-9]*\.?[0-9]+)$|^(-?[0-9]*\.?[0-9]+)$)/;
        return pattern.test(operation);
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

    resolve(characters) {
        console.log("resolve() - parameter : " + characters)
        let operation = characters.join("");
        if(this.isValidSyntax(operation)) {
            if(characters.length == 1) {
                return characters[0]
            }
            return this.makeOperation(characters);
        }
        return "Error de Syntaxis";
    }
    // 5 + 5 - 2
    makeOperation(characters) {
        console.log("makeOperation() - parameter : "+characters)
        let result = 0;
        let validOperators = ['x', '/', '+', '-'];
        let simbols = validOperators.filter(simbol => characters.includes(simbol));
        simbols.forEach(simbol => {
            let index = characters.indexOf(simbol)
            let a = parseInt(characters[index - 1]);
            let b = parseInt(characters[index + 1]);
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
            console.log("array after operation : " + characters)
        });
        return result;
    }

}