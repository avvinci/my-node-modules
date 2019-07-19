var fs = require("fs");
const DIR_TO_READ = "./demo";
const DIR_TO_WRITE = "./demo/";
const DEFAULT_DIR_NAME = "MY_DIR_";

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
  if (index === -1) return element;
  let extension = element.substring(index + 1);
  console.log(extension);
  let dir = DEFAULT_DIR_NAME + extension;
  return dir;
}

function makeDir(element) {
  let dir = getDirForElement(element);
  let dirPath = DIR_TO_WRITE + dir;
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}

function moveFile(element) {
  const elempath = DIR_TO_READ + "/" + element;
  let dir = getDirForElement(element);
  if(dir === element) return; 
  const newelempath = DIR_TO_WRITE + dir + "/"+  element;
  console.log(element + " is moving from " + elempath + " to " + newelempath);
  move(elempath, newelempath, function(err) {
    if (err) console.log(err);
    console.log("...done");
  });
}

fs.readdir(DIR_TO_READ, (err, files) => {
  files.forEach(element => {
    console.log(element);
    makeDir(element);
    moveFile(element);
  });
});
