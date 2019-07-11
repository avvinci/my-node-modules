function writeToCSV(quoteCollection, authorCollection) {
  let index = 0;
  quoteCollection.forEach(quote => {
    appendToCSV(quote, authorCollection[index]);
    index = index + 1;
  });
}

function appendToCSV(quote, author) {
  const createCsvWriter = require("csv-writer").createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: "quotes.csv",
    header: [
      { id: "quote", title: "QUOTE" },
      { id: "author", title: "AUTHOR" }
    ],
    append: true
  });

  const records = [{ quote, author }];

  csvWriter
    .writeRecords(records) // returns a promise
    .then(() => {
      console.log("...Done");
    });
}

module.exports = writeToCSV;
