# 📱 MPNMJEC Student Attendance System


📌 Project Overview

The MPNMJEC Student Attendance System is a mobile/web application designed to manage student attendance efficiently for
M.P. Nachimuthu M. Jaganadhan Engineering College.

This application helps faculty to:

Mark student attendance easily
Track absent students
Generate daily reports
Send reports using Gmail

🚀 Features

🔐 Login System
Login using:
Gmail ID
Mobile Number
Password (default: 235689)
Automatically saves user credentials

🏠 Home Page

Displays:
College Name
College Address
Options:
CSE 2nd Year
CSE 3rd Year

📋 Student Attendance Management

View student list
Search students 🔍
Add new student ➕
Edit student details ✏️
Delete student (password required) 🔒
Attendance options:
✅ Present (default)
❌ Absent
Submit attendance:
Redirects to Report Page

📊 Report Page

Displays:
📅 Today’s absent student list
Features:
Gmail ID auto-filled
Attendance report generation
📩 Send Report (Gmail Integration)
When clicking Send Report:
Opens Gmail application
Pre-fills:
Subject: Today's Attendance Report
Body: List of absent students
User can:
Enter recipient email
Send the report manually

⚙️ Settings Page

Manage profile:
Faculty Name
Department
Year
Mobile Number (auto-filled)
Gmail ID (auto-filled)
Preferences:
Light Mode
Dark Mode
Logout option available

🔻 Navigation

Available on all pages:

Home
Report
Settings

🛠️ Technologies Used

Frontend: HTML, CSS, JavaScript (or Flutter / React Native)
Storage: Local Storage / Firebase (optional)
Email Integration: Gmail (mailto: method)

📌 How It Works

User logs in
Selects department and year
Marks attendance
Submits attendance
Views absent students
Sends report via Gmail

🔮 Future Enhancements

Firebase database integration
Automatic email sending (EmailJS)
PDF report generation
Admin dashboard
Multi-department support

👨‍💻 Author

Gnanakannan K

📄 License

This project is developed for educational purposes only.
