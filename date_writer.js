var fs = require("fs");
var stream = fs.createWriteStream("my_file.txt");
const writer = stream;

const noOfColumns = 8;
const numOfDays = 60;
const numOfThings = 5;
const startDate = new Date(2019, 06, 20);

function getCurrentDate(i) {
  return new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + i
  );
}


function writeDates() {
  for (let i = 0; i < numOfDays; i++) {
    let date = getCurrentDate(i);
    const month = date.toLocaleString("default", { month: "long" });
    writer.write(`${date.getDate()} ${month} ${date.getFullYear()}`);
    for (let j = 0; j < noOfColumns; j++) {
      writer.write("; 0");
    }
    writer.write("\n");
  }
}

function writeFiveGreatThings() {
  for (let i = 0; i < numOfDays; i++) {
    let date = getCurrentDate(i);
    const month = date.toLocaleString("default", { month: "long" });

    writer.write(`${date.getDate()} ${month} ${date.getFullYear()} \n`);
    for (let j = 0; j < numOfThings; j++) {
      writer.write(`${j}. \n`);
    }
    writer.write(` ... \n \n`);
  }
}

// writeDates();
writeFiveGreatThings();

writer.end("\nThis is the end\n");
writer.on("finish", () => {
  console.log("All writes are now complete.");
});

