function checkWeather() {
  const myTemp = document.querySelector("#myTemp");
  const body = document.querySelector("body");
  console.log(myTemp);
  let temp = myTemp.value;
  console.log("Temp value is", temp);
  if (temp < 10) {
    console.log("It is freezing!!!");
    body.style.backgroundColor = "gray";
    outerHeight.style.backgroundColor = "black";
  } else if (temp > 10 && temp < 20) {
    console.log("It is a pleasant weather!!");
    body.style.backgroundColor = "blue";
    outerHeight.style.backgroundColor = "black";
  } else if (temp > 20 && temp < 35) {
    console.log("It is a hot weather!!");
    body.style.backgroundColor = "green";
    outerHeight.style.backgroundColor = "black";
  } else if (temp >= 35) {
    console.log("I am dying");
    body.style.backgroundColor = "red";
    outerHeight.style.backgroundColor = "black";
  }
}
