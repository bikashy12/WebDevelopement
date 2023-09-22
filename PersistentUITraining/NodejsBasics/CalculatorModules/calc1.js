export function add(num1, num2) {
  return num1 + num2;
}

export function sub(num1, num2) {
  return num1 - num2;
}

/****************Named Exports**************/
// module.exports.add = add
// module.exports.sub = sub

/*************Anonymous Exports**************/
// module.exports = add

/**********Multiple function Exports************/
// module.export = {
//   key:value, add: add, sub: sub
// }

module.exports = {
  add,
  sub,
};
