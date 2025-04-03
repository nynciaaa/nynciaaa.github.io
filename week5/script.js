let grade = 80;
if(grade>75)
{
    console.log("Yay!you got distinction");

}else {
    console.log("You just passed the course");
}

// numerical varaible 0 -9
let a = 10;
let b = 20;
let c = a + b;
console.log(a, b, c);
// + add - subtract * multiply/division 

// string or text varaibles ''""` back ticks
let myName = "Jessica";
console.log("Hello", myName);

let myCity = "Melbourne";
if(myCity === "perth")
{ 
    console.log("you live in perth")
}else{
    console.log ("Oh I thought you are from perth");
}
let msg = `<h1> I live in ${myCity} </hi>`




// boolean variable true or false
let isItSunday = false;
const isIt0ART1013 = true;

// object variable
const myStudentRecord = {
    name: "Jessica",
    id: 1234,
    homeTown: "Melbourne",
    isLocal: false,
};

console.log(myStudentRecord);
console.log(myStudentRecord.homeTown);

// arrays they start at 0 
let student1 = "Jessica";
let student2 = "Brad";
let student3 = "Nyncia";
let student4 = "Nynciix";
let students =["Jessica", "Brad", "Nyncia", "Nynciix"];
// console.log(students);
// let numbers=[2,4,6,8,10];
// console.log(numbers);
// console.log(numbers[3]);

for (let i=0; i<students.length; i++)
{
    console.log("HELLO", students[i]);
}


