// NOTE : Falsy values 
// null 
// undefined
// 0
// ''
// NaN
var fullName = "Bikash"; 
var password = "123456";
console.log(typeof password);
// This is format of printing known as Interpolation 
console.log(`
   The name of the student is : ${fullName} and his password is : ${password}
`);
authenticated = true;
authenticated?console.log("show signout button"):console.log("show login option"); 
// == operator checks only the content of the variables
// === operator checks the content as well as typeof the variable also
if("1234" == 1234){
    console.log("same");
}
// class Car{
//   constructor(firstName, lastName){
//       this.firstName = firstName; 
//       this.lastName = lastName; 
//   }
// }
// var car1 = new Car("Bikash", "Yadav"); 
// console.log(`Full name of the car owner is ${car1.firstName} ${car1.lastName}`);