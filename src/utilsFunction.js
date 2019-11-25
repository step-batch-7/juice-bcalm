const fs = require("fs");

const generateDate = function() {
  return new Date();
};

const parseFile = function(filePath) {
  return fs.readFileSync(filePath, "utf8");
};

const isFileExists = function(filePath) {
  return fs.existsSync(filePath, "utf8");
};

const writeFile = function(filePath, transactions) {
  const dataToWrite = JSON.stringify(transactions);
  return fs.writeFileSync(filePath, dataToWrite, "utf8");
};

exports.writeFile = writeFile;
exports.isFileExists = isFileExists;
exports.parseFile = parseFile;
exports.generateDate = generateDate;
