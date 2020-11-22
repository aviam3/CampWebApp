# CampWebApp
### Web application for camps management

![20201122002839-627749acae gif-2-mp4 com](https://user-images.githubusercontent.com/45168914/99888005-aeb4f500-2c51-11eb-924c-82655cf9c0f6.gif)

## Technologies
NodeJs, Bootstrap, MongoDB, RESTfull API, jQuery, Server-side rendering with EJS, User Authentication (with Passport)
 
## My motivation to do this project
Every day we use the internet and browse through lots of web applications.
The fact that I don't know much about it and my curiosity to understand how
it works under the hood are the reasons that motivated me to build CampWebApp.

## Installation

Prerequisites: [git] , [NodeJS] and [mongoDB] must be installed on your computer.
    
1. Clone the repository
```sh
   git clone https://github.com/aviam3/CampWebApp.git
```
2. Change the working directory 
```sh
  cd CampWebApp\
```
3. Install dependencies
```sh
  npm install
```
4. Run the app
```sh
  npm start
```  
## View the Website
Open a browser and type: `http://localhost:[Write PORT]/`
######  In this repo the PORT is: 3000 [click]


## New things I have learned beyond the project itself
- Improved my GitHub abilities
- Explore and inspect web pages using the browser's DevTools
- HTTP Protocol

### Connect Visual Studio Code to mongoDB
Install `MongoDB` Extensions within VS Code. Bring up these Extensions by clicking on the `MongoDB` icon in the Activity Bar on the side of the VS Code. To connect to a MongoDB database, Under the CONNECTIONS tab click on the tree points and select the second option "Add MongoDB connection String". In the Explorer context menu paste the URI connection DB in app.js: `mongodb://localhost/[Choice Your DataBase Name]` From now on for any action you make in the database, you can see the change in the VS Code
##### Note: mongo.exe service is running in the background (Ctrl+Alt+Del).

[click]: <http://localhost:3000/>
[mongoDB]: <https://www.mongodb.com/try/download/community>
[NodeJS]: <https://nodejs.org/en/download>
[git]: <https://git-scm.com/downloads>
