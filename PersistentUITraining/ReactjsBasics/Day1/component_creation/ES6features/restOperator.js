function calculateMarks(name, ...y) {
  console.log(name);
  var total = 0;
  for (var i of y) {
    total += i;
  }
  console.log(total);
}

calculateMarks("Bikash", 2, 3);
calculateMarks("Yadav", 2, 3, 4);
