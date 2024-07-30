# Who's My Doc

Welcome to **Who's My Doc** – an end-to-end application designed for both patients and doctors. This platform promotes local medical clinics and small doctor chambers in various areas, providing an alternative to large hospitals. 
## Demo Video
Watch the demo video below to see **Who's My Doc** in action
<div style="text-align: center;">
  <a href="https://drive.google.com/file/d/1RMX7zEfu5b3TugkhIGmvOd2SmBRL1et-/view">
      <img src="https://www.pngall.com/wp-content/uploads/5/Video-Player-PNG-Picture.png?text=Demo+Video" width="320" height="240" alt="Watch the demo video">
  </a>
</div>
## Overview

### For Patients:

1. **Doctor Search and Filtering**:
   - **Specialty-Based Search**: Patients can search for doctors by selecting from a list of specialities. The dropdown only shows specialities for which doctors are currently registered on the platform. For example, if there are doctors with specialties in "Cardiology" and "Dermatology", only these options will be displayed.
   - **Location-Based Search**: Patients can filter doctors by location. The location dropdown dynamically updates to include only cities or areas where doctors are available. For instance, if there are doctors in "City A" and "City B", only these locations will be presented as options.

2. **Date Selection**:
   - **Limited Date Range**: To simplify booking, patients can only choose appointment dates within a 7-day window from the next day to the following six days. This ensures that the available slots are current and manageable.

3. **Time Slot Availability**:
   - **Dynamic Slot Display**: After selecting a specialty, location, and date, patients will see a list of available doctors along with their time slots. Only the time slots that are free will be shown, ensuring no double bookings.
   - **Interactive Booking**: The interface allows patients to easily select and book available time slots. If a desired time slot is already taken, patients can quickly check other dates or times for availability, similar to booking a seat on BookMyShow.

4. **Booking Confirmation**:
   - **Instant Confirmation**: Upon booking an appointment, a confirmation email is sent to the patient, providing all the necessary details about the appointment.

5. **Specialty Prediction**:
   - **Symptom-Based Specialty Prediction**: If patients are unsure which specialty they need, they can enter their symptoms into the platform. An integrated machine learning model will predict the appropriate specialty and recommend it to the patient. This feature is connected to the backend via a socket for real-time interaction.

### For Doctors:

1. **Profile Management**:
   - **Detailed Profile Setup**: Doctors can create a comprehensive profile, including their location, consultation fees, and available time slots. This information is crucial for patients when searching for suitable doctors.
   - **Availability Management**: Doctors can update their available slots at any time, ensuring that the information presented to patients is always accurate and up-to-date.

2. **Appointment Management**:
   - **Upcoming Appointments**: Doctors have a dedicated dashboard where they can view all upcoming appointments. This section shows both booked and available slots.
   - **Patient Details**: Clicking on a booked slot reveals detailed information about the patient, allowing doctors to prepare in advance for the consultation.
   - **Past Appointments**: Doctors can also view a history of their past appointments, helping them track their consultation history and manage their practice more effectively.

By integrating these features, **Who's My Doc** ensures a seamless and efficient experience for both patients and doctors. Patients can easily find and book appointments with local doctors, while doctors can manage their schedules and patient information with ease.

## Technologies Used

### Backend:
- **Node.js & Express**: For building the server and API endpoints.
- **MySQL**: Database for storing user and booking information.
- **Socket.io**: For real-time communication with the ML model.
- **JWT**: JSON Web Token for secure user authentication.
- **BCrypt**: For password hashing.

The backend is organized into:
- **Routes**: Contains API endpoints for login, registration, booking, availability check, previous records, profile management, and more.
- **Text**: Includes SQL queries, temporary testing data, and sample inputs for some endpoints.
- **Helper**: Includes helper functions like nodemailer, authentication using bcrypt etc.
- **index.js**: The main entry point for the backend application.

### Frontend:
- **React**: For building the user interface.
- **Bootstrap**: For responsive design and styling.

The frontend is mainly organized into:
- **Components**: Contains various component folders, each with related subcomponents.
- **Context**: Contains the React Context which manages authentication state, including login and logout functions.

## To run the app
1. Run server.py using 'python server.py' for windows and 'python3 server.py' for Linux. This file exists in the disease folder
2. Run 'nodemon index.js' to start the backend. This command should be executed in the Backend folder
3. Run 'npm run dev' in the frontend folder to start the frontend.  
