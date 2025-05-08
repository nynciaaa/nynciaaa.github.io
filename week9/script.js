const myInput = document.querySelector("#my-input");
console.log(myInput);

const myButton = document.querySelector("#my-button");
console.log(myButton);

myButton.addEventListener("click", myInput);

let clicked = false;

function moveDuck() {
  if (!clicked) {
    myDuck.style.translate = "0px -50px";
    clicked = true;
  } else {
    myDuck.style.translate = "0px 0px";
    clicked = false;
  }
}
