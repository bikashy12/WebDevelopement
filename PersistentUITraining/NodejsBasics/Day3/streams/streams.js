var fs = require("fs");

// default chunk size is 64KB
/*************Create ReadStream ***************/
// const readStream = fs.createReadStream("Data.txt", {
//   encoding: "utf-8",
//   highWaterMark: 100,
// });
// const writeStream = process.stdout;
// readStream.pipe(writeStream);

// Streams work on the concept of events
// Streams - It will emit different events
// 'Data' - this event is emitted when data in chunk is available in memory to read
// In Nodejs to subscribe to any event we use 'on' method

// readStream.on("data", (dataChunk) => {
//   console.log(dataChunk);
// });

// // 'end' event get emitted when no more data is there
// readStream.on("end", () => {
//   console.log("Finished Reading");
// });

/************Create WriteStream ****************/
// var fs = require("fs");
// we are using the flags to append the data to the file
// var stream = fs.createWriteStream("out.txt", { flags: "a" });
// stream.write("Hello Node.js!!");
// stream.write("We r learning streams !!");
// stream.end(); //it is required to flush data to the system
// stream.on("finish", function () {
//   console.log("Write is complete now!!");
// });

/****************Piping concept to stream the data flow ************/

// var fs = require("fs");
// var readableStream = fs.createReadStream("Data.txt");
// var writeableStream = fs.createWriteStream("out.txt");

// readableStream.pipe(writeableStream);

// Read data from file in chunks - createReadStream
// write data from file in chunks - createWriteStream
const readStream = fs.createReadStream("Data.txt", {
  encoding: "utf-8",
  highWaterMark: 100,
});

readStream.on("Data.txt", (chunk) => {
  console.log("Reading started");
  readStream.pipe(process.stdout);
  readStream.pause();
  console.log("Reading paused");
  setTimeout(() => {
    readStream.resume();
  }, 2000);
});
