module.exports = function(directory, extension, mainProgram) {
  var fs = require("fs");
  fs.readdir(directory, function callback(err, list) {
    if (err) {
      return mainProgram(err);
    }
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      let a = list[i].split(".");
      if (a.length > 1) {
        if (a[1] === extension) {
          arr.push(list[i]);
        }
      }
    }
    mainProgram(null, arr);
  });
};
