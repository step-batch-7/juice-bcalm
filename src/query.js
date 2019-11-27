const messages = require("./generateMessage.js");

const createUserArgumentsObject = function(userArguments) {
  const structuredArgs = {};
  structuredArgs[userArguments[1]] = userArguments[2];
  structuredArgs[userArguments[3]] = userArguments[4];
  return structuredArgs;
};

const beverageList = function(empId) {
  return function(transaction) {
    transaction["empId"] = empId;
    return transaction;
  };
};

const getBeverageRecordList = function(transactionRecords) {
  let beverageRecordList = [];
  for (empBevRecord in transactionRecords) {
    let empOrders = transactionRecords[empBevRecord]["beverageList"];
    let empId = empBevRecord;
    let beverageRecord = empOrders.map(beverageList(empId));
    beverageRecordList = beverageRecordList.concat(beverageRecord);
  }
  return beverageRecordList;
};

const filterDate = function(date) {
  return function(transactionRecord) {
    const oldDate = new Date(transactionRecord["date"]).toLocaleDateString();
    return oldDate == date;
  };
};

const filterEmpOfDate = function(transactionRecords, date, empId) {
  date = new Date(date).toLocaleDateString();
  transactionRecords = transactionRecords.filter(filterDate(date));
  if (empId != undefined) {
    transactionRecords = transactionRecords.filter(e => e["empId"] == empId);
  }
  return transactionRecords;
};

const filterEmpBevDetail = function(transactionRecords, empId) {
  transactionRecords = transactionRecords.filter(e => e["empId"] == empId);
  return transactionRecords;
};

const generateQueryDetails = function(transactionRecords, userArguments) {
  const structuredUserArguments = createUserArgumentsObject(userArguments);
  let empId = structuredUserArguments["--empId"];
  const date = structuredUserArguments["--date"];
  const beverageRecords = getBeverageRecordList(transactionRecords);
  if (date == undefined && empId == undefined) {
    return "No Record Found";
  }
  if (date != undefined) {
    transactionRecords = filterEmpOfDate(beverageRecords, date, empId);
    return messages.generateQueryMessage(transactionRecords);
  }
  transactionRecords = filterEmpBevDetail(beverageRecords, empId);
  return messages.generateQueryMessage(transactionRecords);
};

exports.filterEmpBevDetail = filterEmpBevDetail;
exports.filterEmpOfDate = filterEmpOfDate;
exports.filterDate = filterDate;
exports.getBeverageRecordList = getBeverageRecordList;
exports.beverageList = beverageList;
exports.createUserArgumentsObject = createUserArgumentsObject;
exports.generateQueryDetails = generateQueryDetails;
