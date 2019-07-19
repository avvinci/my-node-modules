var fs = require("fs");

function writeDates() {
  var stream = fs.createWriteStream("my_file.txt");
  const writer = stream;

  for (let i = 0; i < 60; i++) {
    let date = new Date(2019, 06, 19 + i);
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const month = date.toLocaleString("default", { month: "long" });
    writer.write(`${date.getDate()} ${month} ${date.getFullYear()} \n`);
  }

  writer.end("This is the end\n");
  writer.on("finish", () => {
    console.log("All writes are now complete.");
  });
}

function writeFiveGreatThings() {
  var stream = fs.createWriteStream("my_file.txt");
  const writer = stream;

  for (let i = 0; i < 60; i++) {
    let date = new Date(2019, 06, 19 + i);
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const month = date.toLocaleString("default", { month: "long" });
    writer.write(`${date.getDate()} ${month} ${date.getFullYear()} \n`);
    for (let j = 1; j <= 5; j++) {
      writer.write(`${j}. \n`);
    }
    writer.write(` ... \n \n`);
  }

  writer.end("This is the end\n");
  writer.on("finish", () => {
    console.log("All writes are now complete.");
  });
}

writeFiveGreatThings();
// writeDates();
