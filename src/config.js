const getPath = function(env) {
  return env.TRANSACTION_DATA || "./consumedList.json";
};

const getDate = function(env) {
  return env.NOW ? () => new Date(env.NOW) : () => new Date();
};

exports.getPath = getPath;
exports.getDate = getDate;
