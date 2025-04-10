const topHeading = document.querySelector("h1");
console.log(topHeading);
console.log(topHeading.textContent);
topHeading.textContent = "this is a new heading";
topHeading.style.color = "crimson";

const myFirstPara = document.querySelector("p");
console.log(myFirstPara);

const allParas = document.querySelectorAll("p");
for(let i = 0; i < allParas.length; i++) {
    console.log(allParas[i].textContent);
    allParas[i].style.border = "1px solid green";
    allParas[i].style.backgroundColor = "Beige";
}

// Fix your selector based on your HTML
const myFirstSub = document.querySelector(".first-subheading"); 
console.log(myFirstSub);
console.log(myFirstSub.textContent);
