let site = "https://www.goodreads.com/quotes/widget/90010944-abhinav-vinci?v=2"

let https = require('https')
https.get(site , function callback(response){
  response.on("data" , function (data){
    // console.log(s[i])
    let s  = data.toString() ; 
    let splits = s.split(';');
    console.log(splits);
    let removeSlashes = splits[1].split("\\").join("")
    let removeTrail = removeSlashes.split('&')
    let quote = removeTrail[0]
    console.log(quote);
    let removeAuthSlashes = splits[3].split("\"")
    let author = removeAuthSlashes[1].split("quotes\\").join("");
    console.log(author);
    
  })
})