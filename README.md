
=======
# Flight Booking Project

**Project Overview**
The Flight Booking Project is a web application designed to allow users to search for available flights, view flight details, and book them. The project utilizes modern web development technologies and follows best DevOps practices, including containerization and CI/CD pipelines.

---

**Table of Contents**
1. [Tech Stack](#tech-stack)
2. [Setup and Installation](#setup-and-installation)
3. [Development Stages](#development-stages)
    - Backend
    - Frontend
    - Testing
4. [Docker Setup](#docker-setup)
5. [Testing](#testing)
    - Backend Unit & Integration Tests
    - Frontend End-to-End Tests
6. [Deployment](#deployment)

---

**Tech Stack**

**Backend**
- **Node.js**: Version 20.15.1
- **Express.js**: For creating REST APIs
- **Mongoose**: For MongoDB interactions
- **MongoDB**: Used as the primary database (Containerized with Docker)

**Frontend**
- **Angular**: Version 19 for building the UI

**Testing Tools**
- **Jest**: For backend unit and integration testing
- **Cypress**: For frontend end-to-end testing

**DevOps Tools**
- **Docker**: For containerization of backend and database
- **Docker Compose**: For managing multi-container setup
- **GitHub**: For version control and CI/CD pipelines (GitHub Actions)

---
# **Setup and Installation**

### **Prerequisites**
1. **Node.js**: Version 20.15.1
2. **Docker Desktop**: Installed and running
3. **MongoDB**: Installed (or containerized via Docker)

### **Clone the Repository**
```bash
git clone https://github.com/Aviram96/flight-booking-project.git
cd flight-booking-project

Backend Installation:
cd flight-booking-backend
npm install
npm install @angular/common
npm install karma-chrome-launcher karma-jasmine karma karma-cli --save-dev
npm start

Run database seeding:
node seed.js


Frontend Installation

cd flight-booking-frontend
npm install
npm install @angular/common
npm install karma-chrome-launcher karma-jasmine karma karma-cli --save-dev
ng serve

Development Stages
Backend
Created REST APIs for Flights and Bookings.
Containerized the backend and database using Docker.
Database seeding implemented using seed.js.
Frontend
Angular-based UI for flight search, booking, and management.
Integrated with the backend APIs.
Testing
Backend:
Unit and integration tests written using Jest.
Example test file: tests/routes.test.js.
Frontend:
End-to-End tests implemented using Cypress.
npm install cypress --save-dev
npx cypress open

Continuous Integration and Deployment (CI/CD)
Overview
This project includes a CI/CD pipeline configured using GitHub Actions. The pipeline automates:

Running backend and frontend tests.
Ensuring the code is production-ready by validating builds.
Deploying to staging or production environments.

