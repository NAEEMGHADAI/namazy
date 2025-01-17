<h1 align="center">Welcome to namazy 👋</h1>
<p>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/GhadaiNaeem" target="_blank">
    <img alt="Twitter: GhadaiNaeem" src="https://img.shields.io/twitter/follow/GhadaiNaeem.svg?style=social" />
  </a>
</p>

> Namazzyy is a comprehensive full-stack content management system (CMS) designed to efficiently manage prayer times for various mosques. With Namazzyy, users can easily track, manage, and update prayer timings for different mosques. This CMS is developed using a full-stack approach, meaning it is built with both front-end and back-end technologies to provide a complete solution for managing mosque prayer timings. Its user-friendly interface and extensive features make it an excellent tool for efficient prayer time tracking and management.

Live Site: https://namazzyy.web.app

## Features

- _Comprehensive CMS:_ Namazzyy is a comprehensive content management system designed to efficiently manage prayer times for various mosques.
- _User-Friendly Interface:_ Namazzyy has a user-friendly interface that allows users to easily track, manage, and update prayer timings for different mosques.
- _Cloudinary Integration:_ The CMS utilizes Cloudinary to store images instead of storing images in the database, resulting in faster app performance.
- _Email Notifications:_ The SendInBlue service is used for sending mail to users, making it easy to keep them informed about any updates or changes of the status of there application.
- _Role-Based APIs:_ Namazzyy has a range of APIs, with some restricted to admins, some available to both admins and users, and some open to the public.
- _Mobile Responsive:_ The frontend of the CMS is mobile responsive, ensuring that it can be easily accessed and used on mobile devices.
- _Deployment on Firebase and Render:_ The client is deployed on Firebase, while the server is deployed on Render, making it easy to manage and maintain the application.

## Flow and Functionality of Namazzyy

**Namazzyy** is designed to simplify and streamline the process of managing prayer times for mosques. Below is a detailed flow of the app’s functionality for both users and administrators:

1. **User Registration and Access Approval**:

   - Any individual can sign up to become a user.
   - A user is allowed to manage prayer timings for only one mosque.
   - Upon signing up, the user and the admin receive email notifications.
     - The admin reviews the user's request and can either approve or reject it.
     - If rejected, the user is notified via email about the rejection.
     - If approved, the user is provided with a username and password. The user can either use the assigned password or update it.

2. **Verification Process**:

   - Users must upload proof (e.g., documents or images) to verify their identity and the mosque details.
   - Uploaded documents are stored using **Cloudinary**, ensuring efficient and secure image handling.

3. **Post-Approval User Access**:

   - After logging in, users can:
     - Add prayer timings for their mosque.
     - Update existing prayer timings as needed.
     - Manage their own profile details.

4. **Admin Features**:

   - The admin has comprehensive control over the app's operations:
     - Approve or reject new user requests.
     - Update or delete user details.
     - Directly add new users, bypassing the standard sign-up and approval process.

5. **User-Friendly Features**:
   - Bookmark mosques for quick access.
   - View prayer times and prayer limits for different prayers at various mosques.

**Namazzyy** ensures a seamless experience for both users and administrators, leveraging modern technologies to enhance performance, reliability, and usability.

## Tech Stack

- **Client:** React and TailwindCSS
- **Server:** Node.js and Express.js
- **Database:** MongoDB

## Demo

[![Demo](https://user-images.githubusercontent.com/51822103/223980003-0ea88c76-f2eb-4c1a-b996-3da4d6904bfe.png)](https://www.youtube.com/watch?v=86eUpUEQhmc)

## Run this project on your computer

Clone the project

```bash
  git clone https://github.com/NAEEMGHADAI/namazy.git
```

Go to the project directory

```bash
  cd namazy
```

**For Client:**

Go to Client directory

```bash
  cd Client
```

Install dependencies

```bash
  npm install
```

Start the App

```bash
  npm start
```

**For Server:**

Go to Server directory

```bash
  cd Server
```

Install dependencies

```bash
  npm install
```

Start the Server

```bash
  npm run dev
```

## Author

👤 **Ghadai Mohd Naeem**

- Website: https://naeemghadai.github.io
- Twitter: [@GhadaiNaeem](https://twitter.com/GhadaiNaeem)
- Github: [@NAEEMGHADAI](https://github.com/NAEEMGHADAI)
- LinkedIn: [@Naeem Ghadai](https://linkedin.com/in/naeem-ghadai)

## Feedback

If you have any feedback, please reach out to us at mohdnaeemghadai@gmail.com

## Show your support

Give a ⭐️ if this you liked this project!
