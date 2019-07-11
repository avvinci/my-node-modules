let site = "https://www.goodreads.com/quotes/widget/90010944-abhinav-vinci?v=2";

let Normal_length = 6  ; 
let quoteCollection = new Set();
let authorCollection = new Array() ; 

function parseData(data) {
  let dataString = data.toString();
  let splits = dataString.split(";");
//   console.log(splits);
  if(splits.length > Normal_length){
    return; // remains to handle quotes conatining semi-colon
  }  
  let removeSlashes = splits[1].split("\\").join("");
  let removeTrail = removeSlashes.split("&");
  let quote = removeTrail[0];
  console.log(quote);
  if(quoteCollection.has(quote)){
      return ; 
  }
  quoteCollection.add(quote);
  let removeAuthSlashes = splits[3].split('"');
  let author = removeAuthSlashes[1].split("quotes\\").join("");
  console.log(author);
  authorCollection.push(author)
}

function getQuotes() {
  let https = require("https");
  https.get(site, function callback(response) {
    response.on("data", function(data) {
      // console.log(s[i])
      parseData(data);
    });
  });
}
getQuotes();

// repeat with the interval of 2 seconds
let timerId = setInterval(getQuotes, 2000);

// after 5 seconds stop
setTimeout(() => {
  //     getQuotes
  clearInterval(timerId);
  console.log(quoteCollection);
  writeToCSV() ; 
}, 30000);


function writeToCSV(){
    let index = 0  
    quoteCollection.forEach(quote => {
        appendToCSV(quote,authorCollection[index])
        index+1;
    })
}

function appendToCSV(quote, author){
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