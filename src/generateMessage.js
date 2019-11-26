const generateSaveMessage = function(userArguments, date) {
  const empId = userArguments[4];
  const beverageName = userArguments[2];
  const qty = userArguments[6];
  let message = "Transaction Recorded:";
  message += "\n" + "Employee ID,Beverage,Quantity,Date";
  message += "\n" + empId + "," + beverageName + "," + qty + "," + date;
  return message;
};

const generateQueryMessage = function(empId, queryDetails, count) {
  let message = "Employee ID, Beverage, Quantity, Date";
  message += queryDetails
    .map(function(transaction) {
      return "\n" + empId + "," + transaction;
    })
    .join(" ");
  message += "\n" + "Total:" + count + " juices";
  return message;
};

exports.generateQueryMessage = generateQueryMessage;
exports.generateSaveMessage = generateSaveMessage;
