let themeButton = document.getElementById("theme-switch");
let calculator = document.querySelector("#calculator");
let buttons = document.querySelectorAll("button");
let numberButtons = document.querySelectorAll(".number,#dot");
let darkModeText = document.querySelector("#theme");
themeButton.addEventListener("click", (evt) => {
    if(evt.target.checked) {
        calculator.style.backgroundColor = "#1d3557";
        buttons.forEach(button => {
            button.style.backgroundColor = "#03071e";
        });
        numberButtons.forEach(button => {
            button.style.color = "#FFF";
        })
        darkModeText.style.color = "#FFF";
    } else {
        calculator.removeAttribute("style");
        buttons.forEach(button => {
            button.removeAttribute("style");
        });
        numberButtons.forEach(button => {
            button.removeAttribute("style");
        });
        darkModeText.removeAttribute("style");
    }
});

