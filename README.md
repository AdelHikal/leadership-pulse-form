# Monthly Leadership Pulse — Submission Form

A beautiful, interactive form for collecting monthly updates from leadership team members.

## 🌐 Live Form

**Access the form here:** [https://YOUR-USERNAME.github.io/leadership-pulse-form/](https://YOUR-USERNAME.github.io/leadership-pulse-form/)

*(Replace with your actual GitHub Pages URL after deployment)*

## ✨ Features

- Beautiful, professional design with progress tracking
- Mobile-responsive (works on all devices)
- Visual category selection with emojis
- Month picker calendar grid
- Character counters on key fields
- "Other" fields that reveal text input when selected
- Real-time validation
- Submits directly to Google Sheets
- Email notifications on new submissions

## 📋 Form Structure

### Section 1: Who You Are
- Name & Role
- Department (30 departments + Other option)
- Reporting Month (visual calendar picker)

### Section 2: Type of Update
- Category cards with emojis
- Sub-category tagging (optional)

### Section 3: The Update
- Headline (100 char max)
- Summary (800 char max with counter)
- Business Impact
- Key KPIs/Numbers

### Section 4: Media & Visibility
- Supporting materials checklist
- File/link sharing
- Usage permissions
- Confidentiality level

## 🔧 Backend Setup

This form uses Google Apps Script to save submissions to Google Sheets.

1. Create a new Google Sheet
2. Go to Extensions → Apps Script
3. Paste the code from `Code-FINAL.gs`
4. Deploy as Web App (Who has access: Anyone)
5. Copy the Web App URL
6. Update `APPS_SCRIPT_URL` in `index.html`

## 📊 Data Collection

All submissions are automatically saved to a Google Sheet with columns for:
- Timestamp
- Name & Role
- Department (with Other field)
- Reporting Month
- Category (with Other field)
- Sub-category
- Headline
- Summary
- Business Impact
- KPIs
- Supporting Materials (with Other field)
- File Links
- Usage Permissions
- Confidentiality Level

## 📧 Email Notifications

Configure `NOTIFY_EMAIL` in the Google Apps Script to receive instant email alerts when new submissions arrive.

## 🎨 Design

- Custom color palette (gold, teal, warm neutrals)
- Syne + DM Sans font pairing
- Smooth animations and transitions
- Accessible, high-contrast design
- Optimized for both desktop and mobile

## 📝 License

Internal use only - [Your Company Name]

---

**Questions?** Contact [adelhikal0@gmail.com](mailto:adelhikal0@gmail.com)
