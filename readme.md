## Backend for the project of the viodeo player

# 1 Readme Generator

 You want to create the readme file you can simply go to google and serach .gitignore generator

here is one website i serach there node 

https://mrkandreev.name/snippets/gitignore-generator/#Node

# 2 Create .env file 

# 3 i will using : "type": "module"

## 4 i will be using nodemon

when you save the file it will restart your server automatically 
nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

npm i nodemon

##  Core Differences
The fundamental difference is that dependencies are strictly required for your application to run in production, while devDependencies are only used locally for building, testing, and developing the code

npm i -D nodemon

how to use go to package json 

then scripts and then use this index is your file 
"scripts": {
    "dev": "nodemon src/index.js"
  },

## 6  now create the new folder 
mkdir public
cd public
mkdir temp
touch .gitkeep

now go mail folder 

create new folder mkdir src 
 and then go inside it 
 src % mkdir controllers db middlewares models routes utils 
touch app.js constants.js index.js  

middleware: jatay phelay muj sai mil kai jana 
routes :  
utils:

## 7  Prettier 

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

npm i -D prettier

touch .prettierrc create file
and write in the file :

{
  "singleQuote": false,
  "bracketSpacing": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "semi": true
}

create another file:  touch .prettierignore

to ignore the .env so cannot make any changes there 

write there: or you can generate online prettier ignore 

/.vscode
/node_modules
./dist
*.env
.env
.env.*


# database connection 
here we will use mongodb database

signup and create project and then create cluster and allow all  network access 0.0.0.0 only for learning purpose 

and then copy usernamer and password and save 

and then 

go to database and then cluster and then click on connect and select the connection u can select anyone but i will select the compass and 
like this will be and change the pasasord

mongodb+srv://your cluster:<db_password>@di.jgdl6hb.mongodb.net/

mongodb+srv://anberlin:your_password@mudi.jgdl6hb.mongodb.net


# create the db name in constant :export const DB_NAME = "videotube"

# install package : 

npm install express dotenv mongoose

# database 2 thing note 
1 when connecting the database there will be a problem  use try catch or you can use promises 

2. dataase in another contient (chage the location database ) and then use async await use 

# to connect database we will use if inside it we will use arrow function with async 
;( async (params) => {})() some are using like this do not get confuse.
( async (params) => {})()
now the db is connected refer to index.js in db

## Now use dotenv
i will be using import statement
import dotenv from "dotenv"
dotenv.config({
    path: './env'
})

and then go to package json 
write there :
"scripts": {
    "dev": "nodemon -r dotenv/config src/index.js"
  },
now go to main index.js and call connectDB()

after that 
// Read environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

// If database connects successfully
.then(() => {

    // Watch for server errors
    app.on("error", (error) => {
        console.log(error);
    });

    // Start the server
    app.listen(PORT);
})

// If database connection fails
.catch((err) => {
    console.log(err);
});

Most we will using the request in express 
most 2 thing will study 




## Author Mudasir @ Anberlin