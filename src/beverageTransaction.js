const saveTransactionEntry = require("./saveTransaction.js")
  .saveTransactionEntry;
const generateQueryDetails = require("./query.js").generateQueryDetails;

const messages = require("./generateMessage.js");
const utils = require("./utilsFunction.js");

const performAction = function(filePath, userArguments) {
  const action = userArguments[0];
  const transactionAction = whichAction(action);
  return transactionAction(filePath, userArguments);
};

const whichAction = function(action) {
  const actions = {
    "--save": saveTransactionEntry,
    "--query": generateQueryDetails
  };
  return actions[action];
};

exports.performAction = performAction;
exports.whichAction = whichAction;
