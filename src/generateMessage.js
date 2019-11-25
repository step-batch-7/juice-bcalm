const generateSaveMessage = function(empId, beverageName, qty, date) {
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
