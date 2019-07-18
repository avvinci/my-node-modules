let site = "https://www.goodreads.com/quotes/widget/90010944-abhinav-vinci?v=2";

let Normal_length = 6;
let quoteCollection = new Set();
let authorCollection = new Array();
let TOTAL_TIME = 6 * 60000 ;

let writeToCSV = require("./writeQuote");

function parseData(data) {
  let dataString = data.toString();
  let splits = dataString.split(";");
  //   console.log(splits);
  if (splits.length > Normal_length) {
    return; // remains to handle quotes conatining semi-colon
  }
  let removeSlashes = splits[1].split("\\").join("");
  let removeTrail = removeSlashes.split("&");
  let quote = removeTrail[0];
//   console.log(quote);
  if (quoteCollection.has(quote)) {
    return;
  }
  quoteCollection.add(quote);
  let removeAuthSlashes = splits[3].split('"');
  let author = removeAuthSlashes[1].split("quotes\\").join("");
  //   console.log(author);
  authorCollection.push(author);
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

let timerId = setInterval(getQuotes, 1600);

setTimeout(() => {
  clearInterval(timerId);
  console.log(quoteCollection);
  writeToCSV(quoteCollection, authorCollection);
}, TOTAL_TIME);
