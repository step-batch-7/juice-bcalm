const updateEntry = function(filePath, beverageName, empId, qty, date) {
  const record = JSON.parse(utils.parseFile(filePath));
  const empIds = Object.keys(record);
  if (!empIds.includes(empId)) {
    record[empId] = {};
    record[empId]["beverageList"] = [];
  }
  return addBeverageDetail(record, empId, qty, date);
};

const addBeverageDetail = function(record, empId, qty, date) {
  record[empId]["beverageList"].push({ beverageName, qty: qty, date });
  const count = record[empId]["count"] || 0;
  record[empId]["count"] = count + +qty;
  return record;
};

const generateRecords = function(filePath, beverageName, empId, qty) {
  const date = JSON.stringify(utils.generateDate());
  let record = {};
  if (utils.isFileExists(filePath)) {
    record = updateEntry(filePath, beverageName, empId, qty, date);
  } else {
    record[empId] = {};
    record[empId]["beverageList"] = [];
    record = addBeverageDetail(record, empId, qty, date);
  }
  return record;
};

const saveTransactionEntry = function(filePath, userArguments) {
  const beverageName = userArguments[2];
  const empId = userArguments[4];
  const qty = userArguments[6];
  const transactions = generateRecords(filePath, beverageName, empId, qty);
  utils.writeFile(filePath, transactions);
  const date = JSON.stringify(utils.generateDate());
  const message = messages.generateSaveMessage(empId, beverageName, qty, date);
  return message;
};

exports.saveTransactionEntry = saveTransactionEntry;
exports.generateRecords = generateRecords;
exports.addBeverageDetail = addBeverageDetail;
exports.updateEntry = updateEntry;
