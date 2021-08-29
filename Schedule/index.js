const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function Schedule(date) {
    if (date == null) {
        throw new TypeError("Schedule#constructor expected date");
    }
    this.date = date;
    this.schedule = [];
}
Schedule.prototype.add = function add(input) {
    return this.schedule.push(input);
}
Schedule.prototype.makePDF = function makePDF(output) {
    if(output == null){
        throw new TypeError("Schedule#makePDF expected output path")
    }
    var doc = new PDFDocument();
    doc.page.height = 1200;
    doc.fontSize(20);
    doc.text(`${this.date}`, 220, 20, { fill: "black" });
    doc.fillAndStroke("black", "black")
    doc.lineCap("square")
        .moveTo(0, 40)
        .lineTo(700, 40)
        .stroke("black");
    doc.fontSize(13);

    var sLen = this.schedule.length;
    var alignTime = (time) => (time.length == 6) ? "  " + time : time;
    for (var i = 0, h = 55; i < sLen; i++, h += 24) {
        let { task, time } = this.schedule[i];
        doc.text(`${alignTime(time)}   ${task}`, 10, h);
    }

    doc.fillAndStroke("black", "black")
    doc.lineCap("square")
        .moveTo(0, h)
        .lineTo(700, h)
        .stroke("black");
    doc.pipe(fs.createWriteStream(path.resolve(output)));
    doc.end();
}


module.exports = Schedule;