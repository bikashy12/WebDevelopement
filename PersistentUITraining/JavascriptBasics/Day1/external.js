// var num1 = Number(prompt("Enter the first value -"));
// var num2 = Number(prompt("Enter the second value -"));

// function add(n1, n2) {
//   return n1 + n2;
// }

// function subtract(n1, n2) {
//   return n1 - n2;
// }

// document.getElementById("spanadd").innerText = add(num1, num2);
// document.getElementById("spansub").innerText = sub(num1, num2);

let sevens = [];
let numArr = [49, 21, 33, 56, 42, 14];

numArr.forEach((num) => {
  if (num % 7 == 0) sevens.push(num);
  return;
});

console.log(sevens);

// can I have multiple catch block in javascript
// can we have nested try...catch block
