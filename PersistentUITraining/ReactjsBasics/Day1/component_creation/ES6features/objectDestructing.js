// let arr = [1, 2, 3, 4];
// let [x, ...z] = arr;
// console.log(x, z);

let a = {
  name: "Bikash",
  age: 22,
  year: "Fourth",
};

let b = {
  ...a,
  college: "BIT",
};

var { name: FirstName, age, year } = a;
console.log(FirstName);
console.log(b);
