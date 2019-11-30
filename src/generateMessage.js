const generateSaveMessage = function(userArguments, date) {
  const empId = userArguments[4];
  const beverageName = userArguments[2];
  const qty = userArguments[6];
  date = process.env.NOW || date;
  const message = `Transaction Recorded:\n${createHeader()}\n${empId},${beverageName},${qty},${date}`;
  return message;
};

const createHeader = function() {
  return `Employee ID, Beverage, Quantity, Date`;
};

const giveBeverageDetails = function(transactionRecords) {
  const empId = transactionRecords.empId;
  const beverageName = transactionRecords.beverageName;
  const qty = transactionRecords.qty;
  const date = transactionRecords.date;
  const message = `\n${empId},${beverageName},${qty},${date}`;
  return message;
};

const generateQueryMessage = function(transactionRecords) {
  const header = createHeader();
  const message = transactionRecords.map(giveBeverageDetails).join("");
  const count = transactionRecords.reduce(function(c, e) {
    return c + +e.qty;
  }, 0);
  return `${header}${message}\nTotal: ${count} Juices`;
};

exports.createHeader = createHeader;
exports.giveBeverageDetails = giveBeverageDetails;
exports.generateQueryMessage = generateQueryMessage;
exports.generateSaveMessage = generateSaveMessage;
