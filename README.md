# AksiHijau Backend

AksiHijau Backend Project is the backend for a mobile application that aims to provide various features such as donations, authentication, campaign, and more. This backend is built using Node.js and Express.js, and it utilizes MySQL as the database for data storage.


## Installation
Here are the steps to install and run the SuperApp backend project:

1. Clone this repository to your local directory:
```shell
git clone https://github.com/juanangelaalma/aksihijau-backend.git
```
2. Navigate to the project directory:
```shell
cd aksihijau-backend
```
3. Install the required dependencies using npm:
```shell
npm install
```
4. Migrate the database structure:
```shell
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```
5. Running the application
```shell
npm run dev
```
