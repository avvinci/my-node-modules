// console.log("HELLO WORLD");
// console.log(process.argv)

// let sum = 0
// for(let i=2; i < process.argv.length; i++ ){
//     sum += Number(process.argv[i])
// }

// console.log(sum)

var fs = require("fs");
// var b = fs.readFileSync(process.argv[2])
// var s = b.toString()
// var ar  = s.split('\n') ;
// console.log(ar.length -1) ;.

fs.readFile(process.argv[2], 'utf8' , function callback(err, data){
    console.log(data.split('\n').length-1)
})