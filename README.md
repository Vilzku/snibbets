# Introduction

This application shows snippets uploaded by the users. Created for LUT University course Web Applications. I plan on doing more development on this porject in the future but as for now this is the version that is getting graded.

Feature list is displayed below.

# Installation and local development

In order to run the application locally node.js and PorstgreSQL (and TypeScript) need to be installed on the machine.
I tried to run the application on a container and publish it online, but unfortunately I ran out of time trying to do this. I will try to do this again later if I have the spare time. TypeScript can be somewhat a nightmare sometimes when doing it in a hurry. At somepoint I got a working Docker image without ability to save images, but unfortunately even it run against some errors.

### Environment variables for server

| Key         | Description                                                      | Example                          |
| ----------- | ---------------------------------------------------------------- | -------------------------------- |
| DB_NAME     | PostgreSQL database name                                         | snibbets                         |
| DB_USER     | User that has access rights to PostrgeSQL datbase and its tables | snibbetuser                      |
| DB_PASSWORD | Password for the said user                                       | G9kn5tGZwRGcdPEs3quurZ66qTFDqe22 |
| JWT_SECRET  | A string that is used to encrypt JWT                             | RFodExPEdBDYJMCnA6rN8NeLG3yMRV3D |

### Setting up the database

[This file contains the commands needed to create the tables](./server/src/db/setup.sql)

Download the PostgreSQL server from the official website and setup a root account. With that account a new database with relations can be created. After creating the relations create an user and grant privileges to it. The application assumes the database is running in default port 5432 in localhost.

### Running the application

Everything needed to run the server should be able to be executed with command yarn start. The package manager yarn should be installed globally to run the said script. Remember to create the .env -file! For more details about commands used, see package.json.
`yarn start`
`yarn dev`

The project is fully built on TypeScript and most of the errors are usually related to typing errors if not all the necessary packages are not installed. Therefore it may sometimes be required to install ja build both client and server separately by hand. Production build was such a nightmare that I am not even going to document it until I get it working.

# Feature list and points

| Feature                                                                                                            | Points |
| ------------------------------------------------------------------------------------------------------------------ | -----: |
| Basic features with well written documentation                                                                     |     25 |
| Users can edit their own comments/posts                                                                            |      4 |
| Utilization of a frontside framework (React)                                                                       |      5 |
| Use of a pager when there is more than 10 posts available                                                          |      2 |
| Provide a search that can filter out only those messages that have the searched keyword                            |      2 |
| Vote (up or down) posts or comments (only one vote per user)                                                       |      3 |
| User profiles can have images which are show next to posts/comments                                                |      3 |
| User can click username and see user profile page where name, register date, (user picture) and user bio is listed |      2 |
| Last edited timestamp is stored and shown with posts/comments                                                      |      2 |
| **Total**                                                                                                          | **48** |

The application is missing many of the features thought about in original planning but due to time constraints some of them are not implemented. In regards to points, I think there is room to get points from the UX desing and usability point of view but these are not listed as maximum points should be reached anyway.

# Planning

Documentation about planning phase which led to the techology choices.

## UX planning

![Application flow diagram](https://i.imgur.com/HR7sBmC.png)

Application flow diagram shows basic user path in the application. The arrows indicate where the user can navigate to on the application. Plans for needed UI elements and API planning can be done based on the diagram.

At first, users will land on landing page which will prompt the user to register and login or either suggest them to browse suggestions with limited functionality. After the user has logged in more actions become available. Creating a new snippet, viewing a snippet and editing a snippet are done in a similiar (modal) page. Basic actions like editing or voting can be done either directly on the list view or on a single snippet page. Search functionality alters the snippets shown on the main page. Profile pages are available for everyone to see when opened from a link in post, but editing is only possible for own profile. Logout can either happen manually or by timed logout (not implemented).

## UI planning

Needed screens

- Landing page
  - "Popular" snippets (Popularity not impelented, showing latest 3 instead)
  - Login
  - Register
- Main page
  - Snippet list
  - Search
  - Navbar
- Profile page
  - Information and posts
  - Edit mode
- Goodbye screen (Not implemented as not priority)

On top of that a modal view is needed for inspecting or editing a snippet.

## Technical planning

Technical specifications based on the UI/UX planning

### Tech stack

PERN-stack

**Front-end**: TypeScript, React, React Router, Styled Components

**Back-end**: TypeScript, Node.js, Express, PostgreSQL, JWT

### Data models

**Snippet**

| Attribute | Type     | Required |
| --------- | -------- | :------: |
| id        | string   |    x     |
| userId    | string   |    x     |
| title     | string   |    x     |
| content   | string   |    x     |
| createdAt | datetime |    x     |
| updatedAT | datetime |

**Comment**

| Attribute | Type     | Required |
| --------- | -------- | :------: |
| id        | string   |    x     |
| snippetId | string   |    x     |
| userId    | string   |    x     |
| comment   | string   |    x     |
| createdAt | datetime |    x     |
| updatedAt | datetime |

**Vote**

| Attribute | Type    | Required |
| --------- | ------- | :------: |
| id        | string  |    x     |
| postId    | string  |    x     |
| userId    | string  |    x     |
| positive  | boolean |    x     |

**User**

| Attribute | Type     | Required |
| --------- | -------- | :------: |
| id        | string   |    x     |
| email     | string   |    x     |
| password  | string   |    x     |
| username  | string   |    x     |
| createdAt | datetime |    x     |
| bio       | string   |

### API

A list of all api endpoints. See the routes folder inside server for more details like parameters.

**Snippets**

| Method     | URL                         |
| ---------- | --------------------------- |
| **GET**    | /api/snippets               |
| **GET**    | /api/snippets/:snippet_id   |
| **GET**    | /api/snippets/user/:user_id |
| **POST**   | /api/snippets               |
| **PUT**    | /api/snippets/:snippet_id   |
| **DELETE** | /api/snippets/:snippet_id   |

**Comments**

| Method     | URL                                            |
| ---------- | ---------------------------------------------- |
| **GET**    | /api/snippets/:snippet_id/comments             |
| **POST**   | /api/snippets/:snippet_id/comments             |
| **PUT**    | /api/snippets/:snippet_id/comments/:comment_id |
| **DELETE** | /api/snippets/:snippet_id/comments/:comment_id |

**Votes**

| Method     | URL                 |
| ---------- | ------------------- |
| **GET**    | /api/votes/:post_id |
| **POST**   | /api/votes/         |
| **DELETE** | /api/votes/:vote_id |
| **PATCH**  | /api/votes/:vote_id |

**Users**

| Method     | URL                       |
| ---------- | ------------------------- |
| **GET**    | /api/users/:user_id       |
| **POST**   | /api/users/login          |
| **GET**    | /api/users/logout         |
| **POST**   | /api/users/register       |
| **PATCH**  | /api/users/               |
| **DELETE** | /api/users/               |
| **POST**   | /api/users/image          |
| **GET**    | /api/users/image/:user_id |
