var countries = ["India", "Russia", "Saudi Arabia", "USA"]; 
console.log(countries.length);
countries.forEach(function(element){
   process.stdout.write(`${element} `);
})
var result = [2, 4, 6, 9].every((element, index)=>{
    console.log(index);
    element % 2 === 0; 
})

var finalResult = [2, 4, 6, 9, 3, 7].filter((element, index, array)=>{
    console.log(this);
    return element % 2 == 0; 
})
var finalArray = [2, 3, 6, 9, 3, 7].fill(4, 0, 1); 
console.log(finalArray);
console.log(result);
console.log(finalResult);