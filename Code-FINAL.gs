// ============================================================
//  MONTHLY LEADERSHIP PULSE — Google Apps Script Backend
//  BULLETPROOF VERSION
// ============================================================

// ── CONFIGURATION ──────────────────────────────────────────
var SHEET_NAME   = "Submissions";
var NOTIFY_EMAIL = "adelhikal0@gmail.com";
// ────────────────────────────────────────────────────────────

/**
 * Handles POST requests from the HTML form.
 */
function doPost(e) {
  try {
    var data = {};
    
    // Try different ways to get the data
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    } else {
      // Fallback for testing
      return jsonResponse({ 
        status: "error", 
        message: "No data received. Make sure you're submitting from the form, not running manually." 
      });
    }
    
    var sheet = getOrCreateSheet();
    appendRow(sheet, data);
    
    // Send email notification
    if (NOTIFY_EMAIL && NOTIFY_EMAIL !== "you@yourcompany.com") {
      try {
        sendNotification(data);
      } catch (emailError) {
        Logger.log('Email failed but data saved: ' + emailError.toString());
      }
    }
    
    return jsonResponse({ status: "success", message: "Submission received!" });
    
  } catch (err) {
    Logger.log('Error in doPost: ' + err.toString());
    return jsonResponse({ status: "error", message: err.toString() });
  }
}

/**
 * Handles GET requests — health check.
 */
function doGet(e) {
  return jsonResponse({ 
    status: "ok", 
    message: "Leadership Pulse API is running!",
    timestamp: new Date().toISOString()
  });
}

// ── SHEET HELPERS ───────────────────────────────────────────

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Timestamp",
      "Name & Role",
      "Department",
      "Other Department",
      "Reporting Month",
      "Category",
      "Other Category",
      "Sub-category",
      "Headline",
      "Summary",
      "Business Impact",
      "KPIs",
      "Supporting Materials",
      "Media Other",
      "File Links",
      "Where to Use",
      "Confidentiality"
    ]);

    var header = sheet.getRange(1, 1, 1, 17);
    header.setBackground("#0d0d0d");
    header.setFontColor("#c8a44a");
    header.setFontWeight("bold");
    header.setFontSize(11);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function appendRow(sheet, d) {
  sheet.appendRow([
    new Date(),
    d.name_role         || "",
    d.department        || "",
    d.department_other  || "",
    d.reporting_month   || "",
    d.update_category   || "",
    d.category_other    || "",
    d.subcategory       || "",
    d.headline          || "",
    d.summary           || "",
    d.impact            || "",
    d.kpis              || "",
    d.media             || "",
    d.media_other       || "",
    d.file_links        || "",
    d.usage             || "",
    d.confidentiality   || ""
  ]);
}

// ── EMAIL NOTIFICATION ──────────────────────────────────────

function sendNotification(d) {
  var subject = "📬 New Leadership Update: " + (d.headline || "(no title)");
  var body = "New Monthly Leadership Pulse submission:\n\n" +
             "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
             "Submitted by:  " + (d.name_role || "—") + "\n" +
             "Department:    " + (d.department === "Other" ? d.department_other : d.department || "—") + "\n" +
             "Month:         " + (d.reporting_month || "—") + "\n" +
             "Category:      " + (d.update_category === "Other" ? d.category_other : d.update_category || "—") + "\n" +
             "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
             "Headline:      " + (d.headline || "—") + "\n\n" +
             "Summary:\n" + (d.summary || "—") + "\n\n" +
             "Impact:\n" + (d.impact || "—") + "\n\n" +
             "KPIs:\n" + (d.kpis || "—") + "\n\n" +
             "Visibility:    " + (d.usage || "—") + "\n" +
             "Confidentiality: " + (d.confidentiality || "—") + "\n\n" +
             "File/Links:    " + (d.file_links || "None") + "\n" +
             "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
             "View all submissions in your Google Sheet.";

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

// ── UTILITY ─────────────────────────────────────────────────

function jsonResponse(obj) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}


// ============================================================
//  EASY SETUP INSTRUCTIONS
// ============================================================
//
//  1. Make sure you're in a Google Sheet (this script is attached to it)
//  2. Click "Deploy" button (top right) → "New deployment"
//  3. Click the gear icon ⚙️ next to "Select type"
//  4. Choose "Web app"
//  5. Fill in:
//     - Description: "Leadership Pulse Form"
//     - Execute as: Me
//     - Who has access: Anyone
//  6. Click "Deploy"
//  7. Click "Authorize access" when prompted
//  8. Copy the Web App URL
//  9. Done! The URL is already in your HTML form.
//
//  TESTING:
//  - Open the HTML form in your browser
//  - Fill it out with test data
//  - Submit
//  - Check this Google Sheet for a new row
//  - Check your email for notification
//
//  TROUBLESHOOTING:
//  - If you see "TypeError: Cannot read properties..." → This is NORMAL when
//    clicking "Run" in the editor. Don't run it manually. Just deploy it and
//    use the form.
//  - If submissions fail, check "Executions" tab in Apps Script for errors
//  - Make sure "Who has access" is set to "Anyone" (not "Anyone with account")
//
// ============================================================
