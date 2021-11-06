# **WORK-IN-PROGRESS**

# Introduction

This application shows snippets uploaded by the users.

Feature list on the bottom of the page.

# Installation and local development

`yarn start`

# Feature list and points

| Feature                                                                                                            | Points |
| ------------------------------------------------------------------------------------------------------------------ | -----: |
| Basic features with well written documentation                                                                     |     25 |
| Users can edit their own comments/posts                                                                            |      4 |
| Utilization of a frontside framework (React)                                                                       |      5 |
| Use some highlight library for the code snippets                                                                   |      2 |
| Use of a pager when there is more than 10 posts available                                                          |      2 |
| Admin account with rights to edit all the post and comments and delete content                                     |      3 |
| Provide a search that can filter out only those messages that have the searched keyword                            |      2 |
| Vote (up or down) posts or comments (only one vote per user)                                                       |      3 |
| User profiles can have images which are show next to posts/comments                                                |      3 |
| User can click username and see user profile page where name, register date, (user picture) and user bio is listed |      2 |
| Last edited timestamp is stored and shown with posts/comments                                                      |      2 |
| **Total**                                                                                                          | **53** |

# Planning

Documentation about planning phase which led to the techology choices.

## UX planning

![Application flow diagram](https://i.imgur.com/HR7sBmC.png)

Application flow diagram shows basic user path in the application. The arrows indicate where the user can navigate to on the application. Plans for needed UI elements and API planning can be done based on the diagram.

At first, users will land on landing page which will prompt the user to register and login or either suggest them to browse suggestions with limited functionality. After the user has logged in more action become available. Creating a new snippet, viewing a snippet and editing a snippet are done in a similiar (modal) page. Basic actions like editing or voting can be done either directly on the list view or on a single snippet page. Search functionality alters the snippets shown on the main page. Profile pages are available for everyone to see when opened from a link in post, but editing is only possible for own profile. Logout can either happen manually or by timed logout.

## UI planning

Needed screens

- Landing page
  - "Popular" snippets
  - Login
  - Register
- Main page
  - Snippet list
  - Search
  - Navbar
- Profile page
  - Edit mode
  - Navbar
- Goodbye screen

On top of that a modal view is needed for inspecting or editing a snippet.

## Technical planning

Technical specifications based on the UI/UX planning

### Tech stack

**Front-end**: TypeScript, React, React Query, Bootstrap

**Back-end**: TypeScript, Node.js, Express, PostgreSQL

Both front- and back-end will be run in a Docker environment.

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
| picture   | buffer   |
| bio       | string   |

### API

WIP: Planning on theoretical level, might be modified as the project goes

**Snippets**

| Method     | URL                        |
| ---------- | -------------------------- |
| **GET**    | /api/snippets (params wip) |
| **GET**    | /api/snippets/:snippet_id  |
| **POST**   | /api/snippets              |
| **PATCH**  | /api/snippets/:snippet_id  |
| **DELETE** | /api/snippets/:snippet_id  |

**Comments**

| Method     | URL                                            |
| ---------- | ---------------------------------------------- |
| **GET**    | /api/snippets/:snippet_id/comments             |
| **POST**   | /api/snippets/:snippet_id/comments             |
| **PATCH**  | /api/snippets/:snippet_id/comments/:comment_id |
| **DELETE** | /api/snippets/:snippet_id/comments/:comment_id |

**Votes**

| Method     | URL                 |
| ---------- | ------------------- |
| **GET**    | /api/votes/:post_id |
| **POST**   | /api/votes/         |
| **DELETE** | /api/votes/:vote_id |

**Users**

| Method     | URL                 |
| ---------- | ------------------- |
| **GET**    | /api/users/:user_id |
| **POST**   | /api/users/login    |
| **POST**   | /api/users/register |
| **PATCH**  | /api/users/:user_id |
| **DELETE** | /api/users/:user_id |
