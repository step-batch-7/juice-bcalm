const messages = require("./generateMessage.js");

const createUserArgumentsObjet = function(userArguments) {
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
  const filterDates = transactionRecords.filter(filterDate(date));
  if (empId != undefined) {
    transactionRecords = filterDates.filter(e => e["empId"] == empId);
  }

  return transactionRecords;
};

const generateQueryDetails = function(transactionRecords, userArguments) {
  const structuredUserArguments = createUserArgumentsObjet(userArguments);
  let empId = structuredUserArguments["--empId"];
  const date = structuredUserArguments["--date"];
  const beverageRecords = getBeverageRecordList(transactionRecords);
  if (date != undefined) {
    transactionRecords = filterEmpOfDate(beverageRecords, date, empId);
  }
  if (date == undefined && empId == undefined) {
    return "No Record Found";
  }
  return messages.generateQueryMessage(transactionRecords, empId);
};

exports.generateQueryDetails = generateQueryDetails;
