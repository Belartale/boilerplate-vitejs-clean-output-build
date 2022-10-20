const constHeader = "text constHeader";
console.log(constHeader);
const functionCustomConsoleLog = (text) => {
  try {
    return console.log(text);
  } catch (error) {
    console.log("functionCustomConsoleLog => error", error);
  } finally {
    console.log("functionCustomConsoleLog => finally");
  }
};
functionCustomConsoleLog(">>> test functionCustomConsoleLog <<<" + constHeader);
