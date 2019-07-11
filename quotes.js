let site = "https://www.goodreads.com/quotes/widget/90010944-abhinav-vinci?v=2";

let quoteCollection = new Set();

function parseData(data) {
  let dataString = data.toString();
  let splits = dataString.split(";");
  console.log(splits);
  let removeSlashes = splits[1].split("\\").join("");
  let removeTrail = removeSlashes.split("&");
  let quote = removeTrail[0];
  console.log(quote);
  quoteCollection.add(quote);
  let removeAuthSlashes = splits[3].split('"');
  let author = removeAuthSlashes[1].split("quotes\\").join("");
  console.log(author);
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
let timerId = setInterval(getQuotes, 5000);

// after 5 seconds stop
setTimeout(() => {
  //     getQuotes
  clearInterval(timerId);
  console.log(quoteCollection);
}, 20000);
