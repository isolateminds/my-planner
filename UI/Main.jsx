import React, { useState } from 'react';
import Calendar from 'react-calendar';
const ALERT_TIMEOUT = 2000;
function Main({ makePDF }) {
  var [pdfEntries, updatePDFEntries] = useState([]);
  var [calendarValue, updateCalendarValue] = useState(new Date().toDateString());
  var [formValues, updateFormValues] = useState({
    task: "",
    time: "",
  });

  var [pdfAlert, updatePDFAlert] = useState(false);
  var [taskAlert, updateTaskAlert] = useState(false);
  return (
    <>
      {pdfAlert ? <><label className="alert alert-success pdf-alert">Schedule created</label></>
        :
        <></>}
      {taskAlert ? <><label className="alert alert-success pdf-alert">Task Added</label></>
        :
        <></>}

      <div>
        <Calendar onClickDay={handleClickDay} />
      </div>
      <form onSubmit={handleFormSubmit} className="main-form">
        <div className="input-group">
          <label>Schedule for {`${calendarValue}`} </label>
        </div>
        <label className="form-label mb-3">Time</label>

        <div className="input-group">
          <input name="time" onChange={handleFormInput} type="time" className="form-control" />

        </div>
        <label className="form-label mb-3">Task</label>
        <div className="input-group">
          <input name="task" onChange={handleFormInput} type="text" className="form-control" value={formValues.task} />
        </div>
      </form>

      <button onClick={handleFormSubmit} disabled={!pdfEntries.length} className="btn btn-primary mt-3">Generate PDF</button>
      <button onClick={handleAddTask} disabled={!formValues.task.length} className="btn btn-success ml-3 mt-3">Add Task</button>


    </>
  )
  function handleFormSubmit(e) {
    e.preventDefault();
    updatePDFAlert(true);
    var to = setTimeout(() => {
      updatePDFAlert(false);
      clearTimeout(to)
    }, ALERT_TIMEOUT);
    makePDF(calendarValue, pdfEntries)
  }
  function handleFormInput({ target: { name, value } }) {
    if (name == "time") {
      value = convertToStandard(value);
    }
    var $ = { ...formValues };
    $[name] = value;
    return updateFormValues($);
  }
  function handleClickDay(value) {
    return updateCalendarValue(new Date(value).toDateString());
  }
  //converting milatary time 
  function convertToStandard(time) {
    time = time.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var standard;
    if (hours > 0 && hours <= 12) {
      standard = "" + hours;
    } else if (hours > 12) {
      standard = "" + (hours - 12);
    } else if (hours == 0) {
      standard = "12";
    }

    standard += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    standard += (hours >= 12) ? " PM" : " AM";  // get AM/PM
    return standard
  }

  function handleAddTask(e) {
    e.preventDefault();
    var $ = [...pdfEntries];
    $.push(formValues);
    updatePDFEntries($);
    updateFormValues({ task: "", time: "" });
    updateTaskAlert(true);
    var to = setTimeout(() => {
      updateTaskAlert(false);
      clearTimeout(to)
    }, ALERT_TIMEOUT);

  }
}

export default Main;