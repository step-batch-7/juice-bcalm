const generateSaveMessage = function(userArguments, date) {
  const empId = userArguments[4];
  const beverageName = userArguments[2];
  const qty = userArguments[6];
  let message = "Transaction Recorded:";
  message += "\n" + "Employee ID,Beverage,Quantity,Date";
  message += "\n" + empId + "," + beverageName + "," + qty + "," + date;
  return message;
};

const createHeader = function() {
  return "Employee ID, Beverage, Quantity, Date";
};

const giveBeverageDetails = function(transactionRecords) {
  let message = "\n" + transactionRecords["empId"];
  message += "," + transactionRecords["beverageName"];
  message += "," + transactionRecords["qty"];
  message += "," + transactionRecords["date"];
  return message;
};

const generateQueryMessage = function(transactionRecords) {
  console.log(transactionRecords);
  const header = createHeader();
  const message = transactionRecords.map(giveBeverageDetails);
  const count = transactionRecords.reduce(function(c, e) {
    return c + +e["qty"];
  }, 0);
  return header + message + "\n" + "Total:" + count + "Juices";
};

exports.generateQueryMessage = generateQueryMessage;
exports.generateSaveMessage = generateSaveMessage;
