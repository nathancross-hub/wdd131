// 1. JS arrays

let names = ["James", "John", "Peter"];
console.log(names[2]);
console.log(names[0]);
console.log(names[1]);

let grades = [89, 90, 93, 97, 100]

console.log(grades[1])


// 2. JS objects

let student = {
    name:"Brother Warner",
    classes:["WDD131", "CSE110"],
    grades:[67, 88]
}

console.log(student.name)

// 3. JS methods

names.forEach((name) => {
    console.log(name)
});



let newNames = names.map((name) => {
    return name + " the Apostle"
})

console.log(newNames);

let filteredNames = names.filter((name) => {
    return name[0] === "J";
});

console.log(filteredNames);