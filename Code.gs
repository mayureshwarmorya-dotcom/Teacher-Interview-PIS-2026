// Google Apps Script Code (to be deployed as a web app)
// This script should be attached to a Google Sheet

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Prepare data for the sheet
    const rowData = [
      new Date(), // Timestamp
      data.token, // Token Number
      data.employeeCode, // Employee Code
      data.candidateName, // Candidate Name
      data.email, // Email
      data.phone, // Phone
      data.post, // Applied Post (PRT/TGT)
      data.subject, // Selected Subject
      data.qualification, // Educational Qualification
      data.specialization, // Subject Specialization
      data.salaryDrawn, // Salary Drawn
      data.salaryExpected, // Salary Expected
      data.previousSchool, // Previous School Name
      data.experience, // Experience
      "Pending", // Interview Status (default)
      "", // Interview Date (to be filled later)
      "", // Interview Time (to be filled later)
      "", // Panel Assigned (to be filled later)
      "", // Section-wise Scores (to be filled later)
      "", // Total Score (to be filled later)
      "", // Final Result (to be filled later)
      data.registrationDate // Registration Date
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        token: data.token,
        employeeCode: data.employeeCode,
        message: "Registration successful"
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to set up the Google Sheet with headers
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set headers if the sheet is empty
  if (sheet.getLastRow() === 0) {
    const headers = [
      "Timestamp",
      "Token Number",
      "Employee Code",
      "Candidate Name",
      "Email",
      "Phone",
      "Applied Post",
      "Selected Subject",
      "Educational Qualification",
      "Subject Specialization",
      "Salary Drawn",
      "Salary Expected",
      "Previous School Name",
      "Experience",
      "Interview Status",
      "Interview Date",
      "Interview Time",
      "Panel Assigned",
      "Section-wise Scores",
      "Total Score",
      "Final Result",
      "Registration Date"
    ];
    
    sheet.appendRow(headers);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4a6491");
    headerRange.setFontColor("white");
  }
}
