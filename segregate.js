var fs = require("fs");
var dir = "./tmp";
const DIR_TO_READ = "./demo";

let extensionsArray = [".txt", ".jpg", ".pdf", ".doc"];
let dirArray = ["./demo/autoDir_txt", "./demo/autoDir_jpg", "./demo/autoDir_pdf", "./demo/autoDir_doc"];

fs.readdir(DIR_TO_READ, (err, files) => {
  files.forEach(element => {
    console.log(element);
    for (let i = 0; i < extensionsArray.length; i++) {
      if (element.includes(extensionsArray[i])) {
        console.log(element + " is of type" + extensionsArray[i]);
        if (!fs.existsSync(dirArray[i])){
            fs.mkdirSync(dirArray[i]);
        }
      }
    }
  });
});
// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }
