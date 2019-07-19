var fs = require("fs");
const DIR_TO_READ = "./demo";
const DEFAULT_DIR_NAME = "MY_DIR_";
const DIR_PATH = "./demo/";
let extensionsArray = [".txt", ".jpg", ".pdf", ".doc"];
let dirArray = [
  "./demo/autoDir_txt",
  "./demo/autoDir_jpg",
  "./demo/autoDir_pdf",
  "./demo/autoDir_doc"
];

function move(oldPath, newPath, callback) {
  fs.rename(oldPath, newPath, function(err) {
    if (err) {
      if (err.code === "EXDEV") {
        copy();
      } else {
        callback(err);
      }
      return;
    }
    callback();
  });

  function copy() {
    var readStream = fs.createReadStream(oldPath);
    var writeStream = fs.createWriteStream(newPath);

    readStream.on("error", callback);
    writeStream.on("error", callback);

    readStream.on("close", function() {
      fs.unlink(oldPath, callback);
    });

    readStream.pipe(writeStream);
  }
}

function getDirForElement(element) {
  let index = element.lastIndexOf(".");
  if(index === -1) return element ; 
  let extension = element.substring(index + 1);
  console.log(extension);
  let dir = DEFAULT_DIR_NAME + extension;
  return dir;
}

function makeDir(element) {
  let dir = getDirForElement(element);
  let dirPath = DIR_PATH + dir; 
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  // for (let i = 0; i < extensionsArray.length; i++) {
  //   if (element.includes(extensionsArray[i])) {
  //     console.log(element + " is of type" + extensionsArray[i]);
  //     if (!fs.existsSync(dirArray[i])) {
  //       fs.mkdirSync(dirArray[i]);
  //     }
  //   }
  // }
}

function moveFile(element) {
  for (let i = 0; i < extensionsArray.length; i++) {
    if (element.includes(extensionsArray[i])) {
      const elempath = DIR_TO_READ + "/" + element;
      const newelempath = dirArray[i] + "/" + element;

      console.log(element + " is moving from " + elempath);
      move(elempath, newelempath, function(err) {
        if (err) console.log(err);
        console.log("...done");
      });
    }
  }
}

fs.readdir(DIR_TO_READ, (err, files) => {
  files.forEach(element => {
    console.log(element);
    makeDir(element);
    // moveFile(element);
  });
});
// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }
