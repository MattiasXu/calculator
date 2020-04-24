// Updates display
function updateDisplay() {
    document.querySelector("#current").textContent = mainDisplay;
    document.querySelector("#prev").textContent = lastDisplay;
}

// Check if a character is an operator. Used to prevent illegal actions.
function isOperator(char) {
    return (char === "×" || char === "÷" || char === "^" || 
            char === "+" || char === "-");
}

// This returns a function that decides what a button should do.
function buttonclick(string) {
    if (string === "AC") {
        return function(){
            mainDisplay = "";
            lastDisplay = "";
            operatorCount = 0;
            updateDisplay();
        }
    } else if (string === "⇐") {
        return function(){
            if (mainDisplay) {
                mainDisplay = mainDisplay.substring(0, mainDisplay.length - 1);
                updateDisplay();
            }
        }
    } else if (isOperator(string)) {
        return function() { 
            if (!(isOperator(mainDisplay.charAt(mainDisplay.length-1)))) {
                // Operators are not allowed at the start of expression, except -
                if (!mainDisplay && string !== "-") {
                    return;
                }
                // - in start should not be counted as operator
                if (!(!mainDisplay && string === "-")) {
                    operatorCount += 1;
                }
                mainDisplay += string;
                updateDisplay();
            }
        }
    } else if (string === "=") {
        return function(){
            if (mainDisplay && !(isOperator(mainDisplay.charAt(mainDisplay.length - 1)))){
                lastDisplay = mainDisplay;
                result = mainDisplay.replace(/\^/g, "**");
                result = result.replace(/×/g, "*");
                result = result.replace(/÷/g, "/");
                mainDisplay = (+parseFloat(eval(result).toFixed(3))).toString();
                console.log(mainDisplay);
                updateDisplay();
            }
        }
    } else {
        return function(){
            mainDisplay += string;
            updateDisplay();
        }
    }
}

// From keyboard input to button id
function findID(input) {
    switch (input.toUpperCase()) {
        case "1":
            return "one";
        case "2":
            return "two";
        case "3":
            return "three";
        case "4":
            return "four";
        case "5":
            return "five";
        case "6":
            return "six";
        case "7":
            return "seven";
        case "8":
            return "eight";
        case "9": 
            return "nine";
        case "0":
            return "zero";
        case "+":
            return "plus";
        case "-":
            return "minus";
        case "*":
            return "times";
        case "/":
            return "division";
        case "ENTER":
            return "equals";
        case "BACKSPACE":
            return "back";
        case "DELETE":
            return "AC";
        case "P":
            return "power";
        case ".":
            return "point";
        default:
            return "invalid";
    }
}