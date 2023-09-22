function Test() {
  var a = 20; // function level scope
  {
    let a = 10; // block level scope
    console.log(a);
  }
  console.log(a);
}
console.log(a);
Test();
