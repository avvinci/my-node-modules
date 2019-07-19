var fs = require("fs");
var stream = fs.createWriteStream("my_file.txt");
const writer = stream;
for (let i = 0; i < 30; i++) {
  let date = new Date(2019, 06, 19 + i);
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  writer.write(
    `${date.getDate()} ${date.getMonthName()} ${date.getFullYear()}\n`
  );
}
writer.end("This is the end\n");
writer.on("finish", () => {
  console.log("All writes are now complete.");
});

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}
