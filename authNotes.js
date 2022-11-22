/**
 * auth notes
 * https://www.npmjs.com/package/bcrypt
 * 
 * https://www.npmjs.com/package/jsonwebtoken
 * 
 * "npm i dotenv" for environment variables
 */


/*
# Fullstack Example

## Folder/Project Setup
- We will have two folders, one for our client/react and one for our server/express.
- Due to ease of use with git and deployment tools, we will have both folders be SEPARATE repositories.
- STEP 1: Create two new github repos:
	- fullstack-example-client for the client code
	- fullstack-example-server for the server code
- _Note_: For the example project, we will have both repos live in a single local folder on our computer. So the final file structure should be:
	- /fullstack-example
		- /fullstack-example-client (git repo 1)
		- /fullstack-example-server (git repo 2)
- _Note_: For the client, we do not need to init with a .gitignore because react will generate one for us. For the server, we will need to include a .gitignore file.

## Initialize React
- In the /fullstack-example-client folder, run:
```
npx create-react-app .
```
- Once react has finished installing, run npm start to test that it worked.

## Initialize Express
- In the /fullstack-example-server folder, run:
```
npx express-generator -e
```
- After running express-generator, run the
```
npm i
```
command to install the dependencies
- _Note_: By default both react and express generators run on port 3000. We cannot run both applications on the same port, so we will have to change one of them. Usually we change the server port to 4000.
- _Note_: Unlike react, express will not open a new tab immediately. So to test that express is working, visit localhost:3000 and if you get the welcome express page, you're up and running.
- _Note_: Cmd+D will open a new terminal tab in iterm2, Cmd+T will open a new terminal tab in regular mac terminal
- The best way to change the port of express is to create a .env file and add the PORT environment variable, set to 4000, to the file.
- _Note_: The .env file always goes on the SAME level as package.json.
- For Express, we need to add the dotenv package (and add the init code) in order for environment variables to be included in our terminal process.
	- Run (in /fullstack-example-server)
	```
	npm i dotenv
	```
	- Add the following code to ./app.js
	```
	require("dotenv").config();
	```

## Initalize Mongo
- Install mongodb (in /fullstack-example-server)
	-
	```
	npm i mongodb
	```
- Create a new file ./mongo.js and copy/paste the following code into it:
```
const { MongoClient } = require("mongodb");

let database;

async function mongoConnect() {
	// Connection URI
	const uri = process.env.MONGO_URI;
	// Create a new MongoClient
	const client = new MongoClient(uri);
	try {
		// Connect the client to the server
		await client.connect();
		database = await client.db(process.env.MONGO_DATABASE);
		// Establish and verify connection
		console.log("db connected");
	} catch (error) {
		throw Error("Could not connect to MongoDB. " + error);
	}
}
function db() {
	return database;
}
module.exports = {
	mongoConnect,
	db,
};
```
- Add the following import/code to app.js (before the var app = express() code) in order to call the mongo connection code:
```
var { mongoConnect } = require('./mongo.js');
mongoConnect();
```
- Add the MONGO_URI and MONGO_DATABASE environment variables to the .env file. The MONGO_URI is going to be your mongo atlas connection string WITH YOUR username, password and cluster values. The MONGO_DATABASE is going to be the specific database you want to be working with (and can be different for different projects).
	- If you do not have your connection string, you can login to mongo atlas, click the connect button on your cluster, then select 'Connect Your Application' to see your cluster connection string.
- Then if we start the server and we see the console.log "db connected", that means we successfully connected to our database on server start.

## Recommended Step: Install Nodemon
- Install nodemon (in /fullstack-example-server) as a dev dependency:
```
npm i --save-dev nodemon
```
- Change the start script in package.json to use nodemon:
```
"scripts": {
	"start": "node ./bin/www"
}
```
Change to:
```
"scripts": {
	"start": "nodemon ./bin/www"
}
```

## Recommended Step: Commit Initial Code
- _Important_: The .env file should NEVER be committed to a repository. Since we initialized our server repository with the node .gitignore file, git is going to ignore the .env file because it is a listed file on the .gitignore.
- Commit both the client code (in /fullstack-example-client) and the server code (in /fullstack-example-server), and then push to origin master/main.

## Setup basic GET request between client and server
- Add a new routes file (in fullstack-example-server), called ./routes/blogs.js.
	- _Note_: For different projects, this file name should reflect the data that you want to be sending in the route. E.G. movies.js if we were working with movies.
- Add the starter express route code into ./routes/blogs.js (this can be copied from the ./routes/users.js file that comes with express generator):
```
var express = require('express');
var router = express.Router();

//  GET users listing. 
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
```
- In app.js, import the blogs router add the blogs router to express:
```
var blogsRouter = require('./routes/blogs');
```
and
```
app.use('/blogs', blogsRouter);
```
- _Reminder_: Any route we define in our ./routes/blogs.js file will be resolved under the /blogs url. I.E. If we have a route in blogs.js titled "/all", the final route that will be generated by express will be "localhost:4000/blogs/all" since the "/all" route from the blogs.js file gets concatenated with the "/blogs" url.
- Add a new async fetch useEffect in react to fetch the blogs data (in /fullstack-example-client) 
	- For our example, we will add a blogs state variable and useEffect function to App.js
	- _Note_: When determining what to initialize your state variable to, it is usually best to match the variable type of whatever data you're going to be storing in there. E.G. Since we have a list of blogs in an array, we want our initial state variable to be an empty array.
- To use our mongo database in the blogs routes, add the following import to the top of the ./routes/blogs.js file:
```
const { db } = require("../mongo");
```

## CORS
- CORS stands for Cross Origin Resource Sharing
- CORS is a internet security policy to prevent cross-site scripting attacks
- CORS is a security policy for both clients and servers to allow or disallow requests to domains that do not match the original page domain. 
- In order to resolve the cors error, an allow origin flag must be set on the server.
- In the /express-example-server folder, install cors
	- 
	```
	npm i cors
    ```
- In app.js, 
	- import the cors middleware: 
 ```
const cors = require("cors");
```
 - Add the cors middleware (after the line var app = express()):
 ```
app.use(cors());
app.options("*", cors());
```
- By adding the above code to our express server, we are allowing requests from localhost:3000 to be made to localhost:4000. 

## React .env Files
- By convention (and because of how create-react-app makes the .gitignore file), React wants to you name your local .env file '.env.local'. This .env.local file will function exactly the same as a .env file in your application.
- One of the main functions of the .env files for react are going to be setting a particular url endpoint for when your application is deployed on the internet. I.E. When you're developing locally, your urlEndpoint is going to be something like "http://localhost:4000", but after you deploy the application and the server is hosted the urlEndpoint is going to be something like "https://some-hosted-application-url.com"
	- To load in the REACT_APP_URL_ENDPOINT environment variable from the .env.local file, you would use: const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
*/

