const fs = require("fs");

const transactionRecorder = function(beverageDetails) {
  const inputType = desireInput(beverageDetails[0]);
  if (!fs.existsSync("./consumedList.json")) {
    const consumerList = [["Employee ID", "Beverage", "Quantity", "Date"]];
    fs.writeFileSync(
      "./consumedList.json",
      JSON.stringify(consumerList),
      "utf8"
    );
  }
  return inputType(beverageDetails);
};

const desireInput = function(option) {
  options = { "--save": saveDetails, "--query": giveConsumerDetail };
  return options[option];
};

const saveDetails = function(beverageDetails) {
  const time = new Date();
  const consumerDetail = [
    beverageDetails[4],
    beverageDetails[2],
    beverageDetails[6],
    time
  ];
  let previousList = JSON.parse(fs.readFileSync("./consumedList.json", "utf8"));
  previousList.push(consumerDetail);
  fs.writeFileSync("./consumedList.json", JSON.stringify(previousList), "utf8");
  const file = JSON.parse(fs.readFileSync("./consumedList.json", "utf8"));
  const message =
    "Transaction Recorded:\n" + file[0] + "\n" + file[file.length - 1];

  return message;
};

const giveConsumerDetail = function(beverageDetails) {
  return;
};

exports.transactionRecorder = transactionRecorder;
