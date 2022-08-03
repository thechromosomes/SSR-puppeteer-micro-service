const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

let readGeneratedFile = function (file) {
  if (!fs.existsSync(file)) return;
  return  readFile(file, "utf8");
};

module.exports = readGeneratedFile;
