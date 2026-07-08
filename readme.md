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
# Most 2 thing will study 
req.prams: when u get data from url u will get from req.prams handle :  % ?= these prams we are handling
req.body: get data from forms or from json will handle from req.body


req.cookies : you will handle data from cookies 

for this we will need cookie parser

# now lets install cookie-parser and another cors 

cookie-parser → "Read browser cookies."

cors → "Allow or restrict which websites can call my API."

most of the time when when u have to use middleware so mostly u will use=  app.use

Now Lets go to app.js
import cookie-parser, cors

app.use(...) is a rule that applies to every student (every request) entering the school.

1. app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true // You may bring your ID card (cookies, login information)."
}))
Only allow requests coming from this website." "I only trust requests coming from localhost:3000."

2. app.use(express.json({limit:"16kb"}))

3. app.use(express.urlencoded({extended:true,limit:"16kb"}))

4. app.use(express.static("public"))  

5. app.use(cookieParser()) // cookieParser() reads those cookies.




after the let create utility function what it does make our work more easier
 go to untils and create file asyncHandler.js
const asyncHandler = (requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((error)=> next(error))
    }
}
export default asyncHandler


now many times we will return the error and we have not structure of the error and now i want to standardize the api error and api response also want to standrize so it will make it easy 

now for that we will be using class error 
create the file in utlis Apierror.js
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something Went Wrong",
        errors = [],
        stack = ""
    ) {
        super(message);

        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
create the file in utlis Apiresponse.js

class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}


now after that we will write the models annd 

in the video model we will be using the mongodb aggreation pipeline 

npm i mongoose-paginate-v2
atlast add 
VideoSchema.plugin(mongooseAggregatePaginate)




## Author Mudasir @ Anberlin