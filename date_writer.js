var fs = require("fs");
var stream = fs.createWriteStream("my_file.txt");
// stream.once("open", function(fd) {
stream.write("My first row\n");
stream.write("My second row\n");
// });

// stream.once("open", function(fd) {
stream.write("My first row\n");
stream.write("My second row\n");
// });

const writer = stream;
for (let i = 0; i < 100; i++) {
  writer.write(`hello, #${i}!\n`);
}
writer.end("This is the end\n");
writer.on("finish", () => {
  console.log("All writes are now complete.");
});
