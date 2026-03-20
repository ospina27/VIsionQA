## VisionQA: AI-Based Industrial Quality Inspection System 🏭👁️

VisionQA is a machine vision system designed for high-performance industrial environments. Using the YOLOv8 model, it automates the detection of defects (thermal burns, scratches, and deformities) in plastic containers on production lines, achieving inference times of less than 0.5 seconds per unit.

This project was developed as part of the Integrative Project I (Proyecto Integrador I) course at Universidad del Valle (Tuluá Campus) by Kevin Steven Posso Sanchez and Alejandro Ospina López.

The Problem We Solve
In production plants, the manual inspection of thousands of plastic containers causes visual fatigue for operators, resulting in subjective and inconsistent inspections. Furthermore, when rejecting a batch to a supplier, the lack of forensic visual evidence makes claims and warranties difficult to process.

Core Features
Real-Time Detection (< 0.5s): Live video analysis on conveyor belts without creating production bottlenecks.

Ergonomic UI (Dark Mode): User interface specifically designed to reduce operator visual fatigue and facilitate interaction while wearing safety gloves (high-contrast buttons).
False Positives Management: User empowerment through quick reporting buttons to correct the AI, allowing data collection for future retraining (scaling accuracy from 85% to >95%).
Automatic Evidence Generation: Creation of PDF reports with exact captures (bounding boxes) of defective containers to support supplier audits.
Alert System and Batch Traffic Light: Clear visual indicators (Green, Yellow, Red) for instant decision-making and line stoppages.

# Tech Stack

Artificial Intelligence: YOLOv8 (Ultralytics), OpenCV.

Backend: Python 

Frontend: 

Document Generation:

# 📂 Project Structure
```
Plaintext
VisionQA/
│
├── ai_model/               # Training scripts and YOLOv8 model weights (.pt)
├── backend/                # API for image processing and connection with the model
├── frontend/               # Industrial user interface (Dashboard)
├── docs/                   # Documentation, Design Thinking, and UI Mockups
└── README.md               # Main project description
```

# 👥 Development Team
Kevin Steven Posso Sanchez - Software Development Technology
Alejandro Ospina López - Software Development Technology
