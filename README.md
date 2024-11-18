# capstone-project

## 1. Overview and Goal

You've learned so much and now it's time to build something to show off what you can do.

For the final project, you need to come up with an idea that is your own. This idea has to come from you, it’s **YOUR** project. Obviously the likelihood of something being 100% original is nearly impossible. _Everything_ already exists in the world. That’s not what we mean by “an idea that is your own”. We want you to create a website / web app about something you like, **something that relates to you**.

The goal is to build a **full-stack MERN application** from scratch that will use the technologies covered in class. That means you’ll need a front-end (FE), a back-end (BE), and they’ll need to communicate properly.

The final project is your competitive edge in an interview. Make sure you build something you’re proud of! Recruiters can tell when someone is passionate and proud about the project they’ve built. A generic idea won’t cut it here!

You must submit a proposal that will outline the details of your project. The proposal doesn’t need to be too long, just half a page at most. Even bullet points will do. Tell us what features it will have, what it will do, what’s the purpose, etc. Think of it as an elevator pitch! We’ll review it and give you feedback on it. _✰See section 7✰_

---

## 2. Requirements

In order to pass, your project use the MERN stack, and it must include the following functionalities:

- A FE built with React.js
- A BE built with Node.js
- - Your server must implement REST practices
- - CRUD operations must be included in the project
- A database using MongoDB
- Complete the MVP features agreed upon within your **approved proposal**
- The use of a FREE API _✰See section 4.2✰_

---

## 3. Do’s and Don’ts

### 3.1. What you can do

- Use of packages / libraries found on NPM or other places to help you build a cool user interface (UI) for a good user experience.
- Use of external sources to help you use a resource you're not familiar with. These include:
- - Articles
- - Blog posts
- - Online courses
- Ask your classmates for help.
- Clean code (this is more for you than for us)
- - Organize your FE and BE nicely!
- - Add comments!
- - Recruiters will definitely look at that. 👀

### 3.2. What is illegal

- E-commerce websites!
- - The Node/Express group project is an e-commerce website and you can’t just use that for your final project 😂
- React Native
- - We know some of you want to build mobile applications, but we don’t teach React Native so it’s not allowed. Please build it in React!
- Mongoose
- - We don’t teach Mongoose. Yes we know it’s cool, but please stick to regular MongoDB structures.
- Games
- - React isn’t really compatible with games (in terms of performance).
- - The scope of games constantly increases. We want to avoid that.
- Firebase
- - We teach MongoDB. No Firebase allowed!
- YouTube tutorials
- - You **CANNOT** base your project on a tutorial video. That is plagiarism!
- - We know they help you understand certain technologies. Just don’t copy from it!
- Putting money on your project!
- - Don’t feel obligated to use a paid API / database for your project to run.
- - Paid API calls can be expensive, especially if you accidentally run an infinite loop!
- - If you can’t find a free API or database, it might be worth it to change ideas.
- AI interactions
- - Building a website that sends data to an AI and then waits for a result isn’t a viable final project. That would just be a fetching application.
- - AI !== web development (believe it or not).
- - Do note, you can include AI, so long as it's not core to your website's functionality (ex: a stretch goal chat bot)

---

## 4. Tips

### 4.1. User Accounts

Most projects have some sort of sign up/in system and user documents in MongoDB. If your users can log in, you must have the following:

- Sign in functionality that involves authorization (ex: password entry).
- A reason to be signed in (access to restricted functionality).
- - chat system, comment system, friend system, favorites, activity, etc.

It might be the case that you have no sign up and that it is handled Auth0 or that the only sign in is an adminstrator who just needs a password. Creating your own sign up / sign in methods that will check your database is always good, but it is NOT MANDATORY. It is advised to have authentication and authorization features in your project, but they can be added once the bootcamp is over. Consider the following functionalities:

- Encrypt sensitive information, like their password! Use a password hasher like [bcrypt](<[https://www.example.com](https://www.npmjs.com/package/bcrypt)>) or [Json Web Token](https://jwt.io/)
- Use of [Auth0](https://auth0.com/docs/quickstart/spa/react/interactive):
- - You’ll need to sign up to view the full documentation (and to create the authenticator).
- - Even if you use Auth0 to authenticate, you’ll need to save the user account in your Mongo database.
- Most user interactions will require saving information in your database (ex: comments, friends, activity.)
- For a chat system, try [Socket.io](https://socket.io/). There are many tutorials on [YouTube](https://www.youtube.com/results?search_query=socket+io+MERN) to help you set this up.

### 4.2. APIs

Whether or not your project should use a third party API depends on your final project. It is possible that you build your own database from research, and your server behaves like an API to feed your FE that informatio (ex: you want a list of ice cream parlors in Montreal).

Do some research - there are many APIs out there. Research on Google to see if you can find one that does what you need. If there’s really nothing out there, and you can’t make your own because of your project’s requirements, you may need to think of another idea altogether.

Potential API Resources:

- [Rapid API](https://rapidapi.com/) - mega hub of various APIs.
- [GitHub API List](https://github.com/public-apis/public-apis) - categorized free APIs.
- [The Movie Database](https://developer.themoviedb.org/docs/getting-started) - database of movies (has an API).

### 4.3 Data

Your website will need data. The data might be built through user interaction (ex: blogs). The data might already exist (ex: information about movies, actors, etc). Your site will need data. Data makes the world go round!

- Plan out your data structure!
- - It’s vital that your structure works well with the flow of your website.
- - You should have an idea of what collections you will need and what a document in them should look like (what keys, and what are their data types).
- Saving data through user interaction
- - It’s important to save anything relevant related to the user in your database.
- Dummy data
- - If your site requires data to exist beforehand for it to work, load up some fake data in there. Nobody said it had to be real! AIs are a great tool for this task!
- Real data
- - If your site requires real data, fetch it from an API, a database that provides it, or create a smaller proof of concept database.
- - **REMINDER: do not pay for your data / API calls.**

---

## 5. More Resources

- [Google Maps API](https://developers.google.com/maps) - I think you all know what this is.
- [Cloudinary API](https://cloudinary.com/documentation) - image and media uploading / hosting.
- [Faker](https://fakerjs.dev/) - generate tons of fake (but realistic) data.
- [Throttle vs Debounce](https://kettanaito.com/blog/debounce-vs-throttle) - for fetching with onChange.
- [JavaScript Cheat Sheet](https://docs.google.com/document/d/1ZvkiFpgdOpxKriRP62QE0N6bkGwnI6PK/) 😋.
- [Node Cheat Sheet](https://docs.google.com/document/d/14dLoFWk1-wwaGep_W3P6D5aL6mD35jEKEfvE0gPRBO4/) 😋.
- [React Cheat Sheet](https://docs.google.com/document/d/1XuCiVSWWcR9ZS-lRzHx99XGk19DoPE8uYzrQjgArpxk/) 😋.
- [MERN From Scratch Playlist](https://www.youtube.com/playlist?list=PLCBRGTNSoanAC6rNnsFjmZSSQ9HAkA0j4).
- [User Auth with bcrypt Playlist](https://www.youtube.com/playlist?list=PLCBRGTNSoanCh1ei4YKuRDX4ebXCIWyT7).

---

## 6. Past Projects

[Past Final Project Demonstration Videos](https://docs.google.com/document/d/1SQYzYTbPJd67ykFbBqgYl8PXUp7YbTHL2lQDrLkwQuw).

---

## 7. Submission Template

[Final Project Proposal Submission Template](https://docs.google.com/document/d/1ZYEO2PiCOSU5LAXn8jqEcplxuYQugstiv-ZV-V2MMX0/edit#heading=h.u2g9vvf6s0jv)

Essentially, you should submit a document that contains the following:

- Name of Project
- Summary / Description
- MVP Features / Functionality
- New APIs Used (i.e. not taught in this course)
- Stretch Goals

---

## 8. Super Duper Stretch ( After the bootcamp)

We understand that there is a limit to what can be accomplished within a two week timeframe. However, we encourage you to continue enhancing and styling your project once the boot camp concludes. Feel free to explore the websites given below for inspiration and further updates to your project.

1. Clean up your code!

- Remove needless console.logs.
- Solve bugs / errors.
- Add code commentary.

2. README.md for your repository

- Explanation what your project is and why you choose it
- Include GIFs/screenshots
- Potentially add a guide (.env / required secrets) another dev might need to use your code.

3. Hosting your project:

- Deploy your project using [Render for Backend](https://render.com/) and [Vercel for Frontend](https://vercel.com/).

4. Enhancing UI via:

- [Material UI](https://mui.com/material-ui/)
- [Semantic UI-REACT](https://react.semantic-ui.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Tailwind](https://tailwindcss.com/)
- [Sass](https://sass-lang.com/)

5. Responsive Design:

- You don't know if recruiters will be visiting your site on a cell or on a desktop.
- Make sure your layouts adapt to different screen sizes.
- Make sure your content can be read on smaller devices.
