# Wendor (Task)

Welcome to Wendor, a modern online vending machine. This README file will guide you through setting up and running the project.

<img width="1710" alt="Screenshot 2024-08-20 at 4 11 55 PM" src="https://github.com/user-attachments/assets/c8d667bb-eeb1-446b-af13-b79e14b03b08">


## Project Summary

Wendor allows users to:

- **Search and Browse Products:** Find products based on their search and preferences.
- **Buy Products:** Choose different products, add them to the cart and confirm the purchase.
- **Manage Account and keep track of purchases:** View and manage the orders and manage the profile.

Wendor allows admins to:

- **Add Products:** Add products to the database including fields such as name, category, company and price.
- **Add products to inventory:** Choose different products, add them to the inventory which will be reflected on the shoppers page.
- **Manage Account and keep track of sales:** View and manage the sales and manage the admin profile.

## Shopper Page Key Features

- **Home Page:** Search for products and view them categorized for easy navigation.
- **Products Listing:** Browse products page based on the selected category or search.
- **Review Cart:** Add items you want to buy in the cart, review the cart and complete the order.
- **Login/Signup:** Simple authentication with minimal fields.
- **Forget/Reset password:** Forgot the password? You will receive a reset password link. You can navigate and reset the password.
- **My Orders:** List review all the order for the logged-in user.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running
- GCP cloud storage bucket configured (for image uploads)

### Tech Stack

- **Frontend:**
  - ReactJS
  - Typescript
  - TailwindCSS
  - Vite

- **Backend:**
  - Node.Js
  - Express
  - Typescript
  - PostgreSQL
  - Sequelize ORM

- **AWS Services:**
  - AWS EC2

- **GCP Services:**
  - GCP Cloud storage
  
## Live Link

- **Shopper UI:** [Wendor Shop](https://wendor.prathamdev.site/) -  https://wendor.prathamdev.site
- **Admin UI:** [Wendor Admin](https://wendor-admin.prathamdev.site/) -  https://wendor-admin.prathamdev.site
- **Backend (API):** [Wendor API](https://wendor-server.prathamdev.site/) - https://wendor-server.prathamdev.site


### Installation

1. **Clone the Repository**

   ```bash
   https://github.com/pratham2609/Wendor-task
   cd Wendor\ task/

## Installation Steps

1. **Install Node Modules:**
    - Navigate to the `wendor-frontend` folder and install the dependencies:
      ```sh
      cd wendor-frontend
      npm install
      ```
    - Navigate to the `wendor-backend` folder and install the dependencies:
      ```sh
      cd ../wendor-backend
      npm install
      ```
    - Navigate to the `wendor-admin` folder and install the dependencies:
      ```sh
      cd ../wendor-admin
      npm install
      ```

2. **Setup Environment Variables:**
    - In the `wendor-backend` folder, create a file named `.env` and add all the environment variables as specified in `.env.sample`.

3. **Configure Frontend Base URL:**
    - Navigate to the `wendor-frontend/src/utils` and `wendor-admin/src/utils` folder and update the `axiosInstance` file with the correct base URL:
      ```js
        // your api url
      export const baseURL = "http://localhost:8080/api/v1";
      ```

4. **Start the Backend:**
    - In the `wendor-backend` folder, run the following command to start the backend server:
      ```sh
      npm run dev
      ```

5. **Start the Frontend:**
    - In the `wendor-frontend` folder, run the following command to start the frontend development server:
      ```sh
      npm run dev
      ```
      
5. **Start the Admin Panel:**
    - In the `wendor-admin` folder, run the following command to start the frontend development server:
      ```sh
      npm run dev
      ```
