// This constant is written in column C for rows for which an email
// has been sent successfully.
var EMAIL_SENT = 'EMAIL_SENT';

/**
 * Sends non-duplicate emails with data from the current spreadsheet.
 */
function sendEmails() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2; // First row of data to process
  var numRows = 1; // Number of rows to process
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 3);
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var emailAddress = row[0]; // First column
    var message = "Dear " + row[1] + sheet.getRange(2, 6).getValue();
    var emailSent = row[2]; // Third column
    if (emailSent !== EMAIL_SENT) { // Prevents sending duplicates
      var subject = 'Sending emails from a Spreadsheet';
      MailApp.sendEmail(emailAddress, subject, message);
      sheet.getRange(startRow + i, 3).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
}
