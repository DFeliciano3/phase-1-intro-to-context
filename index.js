// Your code here
function createEmployeeRecord(recordArray) {
  return {
    firstName: recordArray[0],
    familyName: recordArray[1],
    title: recordArray[2],
    payPerHour: recordArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(recordArrays) {
  return recordArrays.map(function (array) {
    return createEmployeeRecord(array);
  });
}

function createTimeInEvent(empObj, Datastamp) {
  empObj.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(Datastamp.slice(-4)),
    date: Datastamp.slice(0, 10),
  });

  return empObj;
}

function createTimeOutEvent(empObj, Datastamp) {
  empObj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(Datastamp.slice(-4)),
    date: Datastamp.slice(0, 10),
  });

  return empObj;
}

function hoursWorkedOnDate(Obj, DataForm) {
  let InTime = Obj.timeInEvents.find(function (e) {
    return e.date === DataForm;
  });

  let OutTime = Obj.timeOutEvents.find(function (e) {
    return e.date === DataForm;
  });

  return (OutTime.hour - InTime.hour) / 100;
}



function wagesEarnedOnDate(Obj, DataForm) {
  const Payowed = hoursWorkedOnDate(Obj, DataForm) * Obj.payPerHour;
  return parseFloat(Payowed.toString());
}


function allWagesFor(obj) {
  const Dates = obj.timeInEvents.map(function (e) {
    return e.date;
  });
  const PaysNumber = Dates.reduce(function (Amount, dateForm) {
    return Amount + wagesEarnedOnDate(obj, dateForm);
  }, 0);
  return PaysNumber;
}


function  calculatePayroll(arrayofObject) {
  return arrayofObject.reduce(function (Amount, record) {
    return Amount + allWagesFor(record);
  }, 0);
};
