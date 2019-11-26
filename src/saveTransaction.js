const messages = require("./generateMessage.js");

const addBeverageDetail = function(records, beverageDetail) {
  records[beverageDetail.empId]["beverageList"].push(beverageDetail);
  const count = records[beverageDetail.empId]["count"] || 0;
  records[beverageDetail.empId]["count"] = count + +beverageDetail["qty"];
  return records;
};

const generateRecords = function(records, beverageDetail) {
  const empIds = Object.keys(records);
  if (!empIds.includes(beverageDetail.empId)) {
    records[beverageDetail.empId] = {};
    records[beverageDetail.empId].beverageList = [];
  }
  return addBeverageDetail(records, beverageDetail);
};

const saveTransaction = function(records, userArguments, date) {
  const beverageDetail = {
    beverageName: userArguments[2],
    empId: userArguments[4],
    qty: userArguments[6],
    date: date
  };
  return generateRecords(records, beverageDetail);
};

exports.saveTransaction = saveTransaction;
exports.generateRecords = generateRecords;
exports.addBeverageDetail = addBeverageDetail;
