# TypeScript | Demo

## Types
Boolean
```typescript
let isOpen: Boolean = true;
``` 

## Demo 1 - Getstarted

npm init -y

npm install typescript --save-dev

// test sample demo.ts
```typescript
function addNumbers(x, y) {
  return x + y;
}
addNumbers(3, 6);
```

npx tsc demo.ts --target "ES2015"

## Demo 2 - Setup a TypesScript Project

npx tsc --init

// check tsconfig.json

// set target to "ES2015"
// set outDir to "./build"

// test error for .ts file
// code sample
```typescript
function addNumbers(x, y) {
  return x + y;
}
console.log(addNumbers(3, 6));
```

// test sample demo.ts
npx tsc 

## Demo 3 - Variable Types - TODO Review Aplication Demo

### Enum Type
// code sample
```typescript
enum DevType {
  Training,
  Junior,
  Pleno,
  Senior
}

let dev: DevType = DevType.Senior;
console.log(dev);
```

// compile code 

// test sample build/demo.js

// compare ligibility of code sample

---
// unkown type - only used if its known
let x: unknown = 1;

// test error for unknown type
console.log(x.toUpperCase());

x = 'string';
x = true;

if(typeof x === 'string') {
  console.log('x is string', x.toUpperCase());
}else{
  console.log('x is not string', x);
}

### Union / Intersection Types

// ex1:
let x: number | string = 1;

// ex2:
interface Employee {
  employeeID: number;
  age: number;
}
interface Manager {
  stockPlan: boolean;
}
type ManagementEmployee = Employee & Manager;
let newManager: ManagementEmployee = {
    employeeID: 12345,
    age: 34,
    stockPlan: true
};
### Collections

// Arrays
let list: number[] = [1, 2, 3];

let list: Array<number> = [1, 2, 3];

// Tuples
let person1: [string, number] = ['Marcia', 35];

// error
let person1: [string, number] = ['Marcia', 35, true];

### Modifing a Existing JS Project

cd mslearn-typescript

## Module4 Demo: Implementing Interfaces
// Simple API Call
```typescript
const fetchURL = 'https://jsonplaceholder.typicode.com/posts'
// Interface describing the shape of our json data
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

async function fetchPosts(url: string) {
    let response = await fetch(url);
    let body = await response.json();
    return body as Post[];
}

async function showPost() {
    let posts:Post[] = await fetchPosts(fetchURL);
    // Display the contents of the first item in the response
    let post = posts[0];
    console.log('Post #' + post.id)
    // If the userId is 1, then display a note that it's an administrator
    console.log('Author: ' + (post.userId === 1 ? "Administrator" : post.userId.toString()))
    console.log('Title: ' + post.title)
    console.log('Body: ' + post.body)
}

showPost();
```

## Demo 5 - Function Types

// Named
```typescript
function addNumbers (x: number, y: number): number {
   return x + y;
}
addNumbers(1, 2);

// Anonymous function
let addNumbers1 = function (x: number, y: number): number {
   return x + y;
}

// Arrow function
let addNumbers2 = (x: number, y: number): number => x + y;

// Optional Parameters
let addNumbers3 = (x: number, y?: number): number => {
   if (y === undefined) {
      return x;
   } else {
      return x + y;
   }
}

// Default Parameters
let addNumbers4 = (x: number, y: number = 32): number => x + y;

// REST Parameters
let addAllNumbers = (firstNumber: number, ...restOfNumbers: number[]): number => {
   let total: number =  firstNumber;
   for(let counter = 0; counter < restOfNumbers.length; counter++) {
      if(isNaN(restOfNumbers[counter])){
         continue;
      }
      total += Number(restOfNumbers[counter]);
   }
   return total;
}

addAllNumbers(1, 2, 3, 4, 5, 6, 7);  // returns 28
addAllNumbers(2);                    // returns 2
addAllNumbers(2, 3, "three");        // flags error due to data type at design time, returns 5

// Deconstruted Parameters
interface Message {
   text: string;
   sender: string;
}

function displayMessage({text, sender}: Message) {
    console.log(`Message from ${sender}: ${text}`);
}

displayMessage({sender: 'Christopher', text: 'hello, world'});
```

// Creating Functions types
// Define the Assignature for the function similar to the interface feature
```typescript
type calculator = (x: number, y: number) => number;

let addNumbers: calculator = (x: number, y: number): number => x + y;
let subtractNumbers: calculator = (x: number, y: number): number => x - y;

console.log(addNumbers(1, 2));
console.log(subtractNumbers(1, 2));
```

## Demo 6 - Sample Project (CRUD API)

### Step 1 - Create a new project and dependencies

```bash
npm init -y
```

Dependencies

- TypeScript: A TypeScript compiler with static set type definitions.

- Ts-node: Allows us to run and configure Typescript execution environments.

- Express: Node.js web application framework for setting and managing web-based server.

- @types/express: Type definitions for Express.

- Morgan: A Node.js HTTP request logger middleware for Node.js.

- @types/morgan: Type definitions for Morgan.
Axios: A Node.js promise-based HTTP client library for Node.js, for sending HTTP requests to query and consume resources from APIs.

- @types/Axios: Type definitions for Axios.
Nodemon: A server utility library for monitoring changes of the code on a text editor. It automatically restarts the server whenever code changes are detected.

```bash
npm install typescript ts-node express @types/express morgan @types/morgan axios @types/axios nodemon
```

### Step 2 - Init TypeScript
```bash
npx tsc --init
```
### Step 3 - Setup tsconfig.json

```json
{
    "compilerOptions": {
        "forceConsistentCasingInFileNames": true,
        "module": "commonjs",
        "esModuleInterop": true,
        "outDir": "./build",
        "rootDir": "./source",
        "target": "es6",
        "skipLibCheck": true,
        "strict": true
    }
}
```

### Step 4 - Setup Scripts

On package.json:
```json
"scripts": {
    "dev": "nodemon source/server.ts",
    "build": "rm -rf build/ && prettier --write source/ && tsc"
}
```

### Step 5 - Folder structure

```
|   package-lock.json
|   package.json
|   tsconfig.json
\---source
    |   server.ts
    \---controllers
    |       posts.ts
    \---routes
            posts.ts
```

### Step 6 - Create a Controller
```typescript
/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

export default { getPosts, getPost, updatePost, deletePost, addPost };
```

### Step 7 - Create a Routes

```typescript
/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/posts';
const router = express.Router();

router.get('/posts', controller.getPosts);
router.get('/posts/:id', controller.getPost);
router.put('/posts/:id', controller.updatePost);
router.delete('/posts/:id', controller.deletePost);
router.post('/posts', controller.addPost);

export = router;
```

### Step 8 - Create a Server
```typescript
/** source/server.ts */
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/', routes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
```

### Step 9 - Test API

## References
- https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/