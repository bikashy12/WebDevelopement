// console.log(name);
var name = "Bikash"; 
// console.log(name);
 
// Functions declarations are scanned and made available
// Variable declarations are scanned and made undefined
//sayHello(); 
// As we have declared the variable function, so we can't access the function here 
var sayHello =()=>{
    console.log("Hello World");
}
sayHello(); 

/////////////////////////////////Scope Chaining///////////////////////////////////////////////////


// Remember the popsicle story : 
// smaller one can ask to the bigger guy, but reverse is not true. 

function sayName(){
    var name = "Mr. Bikash"; 
    console.log(name);
    sayNameAgain(); 
    function sayNameAgain(){
        var name = "Yadav"; 
        console.log(name);
    }
    console.log(this);
}
sayName(); 
console.log(name);