const generateSaveMessage = function(empId, beverageName, qty, date) {
  let message = "Transaction Recorded:";
  message += "\n" + "Employee ID,Beverage,Quantity,Date";
  message += "\n" + empId + "," + beverageName + "," + qty + "," + date;
  return message;
};

const generateBeverageInfo = function(empId, transaction) {
  return "\n" + empId + "," + transaction + "\n";
};

const generateQueryMessage = function(empId, queryDetails, count) {
  let message = "Employee ID, Beverage, Quantity, Date";
  message += queryDetails.reduce(generateBeverageInfo, empId);
  message += "Total:" + count + " juices";
  return message;
};

exports.generateBeverageInfo = generateBeverageInfo;
exports.generateQueryMessage = generateQueryMessage;
exports.generateSaveMessage = generateSaveMessage;
