function readFile(processFileContents) {
  console.log("Reading a large file");
  setTimeout(function () {
    for (var i = 0; i < 9999999999; i++) {}
    processFileContents("Some Data");
    return "Some Data";
  }, 0);
}
function processFileContents(filecontents) {
  console.log("Processing File Contents" + filecontents);
}
function computeSum() {
  console.log("Computing Sum of numbers");
}
console.log("Program callstack starts");
var fileData = readFile(processFileContents);
processFileContents(fileData);
computeSum();
console.log("Program callstack Ends");
