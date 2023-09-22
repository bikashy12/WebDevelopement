let array1 = [1, 2, 3];
let array2 = [...array1, 4, 5];
console.log(array1);
console.log(array2);

function sum(x, y, z) {
  return x + y + z;
}

console.log(sum(...array1));
