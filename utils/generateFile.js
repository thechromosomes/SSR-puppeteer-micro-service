const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);

const generateFile = async function (content, fileName) {
  let obj = JSON.parse(JSON.stringify(content));
  obj.data = Date.now();
  obj.componentType = "homePageHeader";
  return await writeFile(fileName, JSON.stringify(obj), "utf8");
};

module.exports = generateFile;
