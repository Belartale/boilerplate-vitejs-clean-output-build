const constHeader = "text constHeader";
console.log(constHeader);
const functionCustomConsoleLog = (text) => {
  return console.log(text);
};
functionCustomConsoleLog(">>> test functionCustomConsoleLog <<<" + constHeader);
