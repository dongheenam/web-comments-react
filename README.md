# Web Comments Generator

Web Comments Generator is a React app that generates a list commending and suggesting comments for a student by prompting a user to answer a set of questions on the student. The app also provides an admin panel where an admin user can view, modify, create and delete comments on its database.

## Features

- Automatically fetches the right comments from its database and
- Summarises the student's overall behaviour into a numerical grade with four categories ("effort grades").
- Also generates skill-related comments (e.g. good at Algebra) based on user input.
- Comments have an optional synonym syntax `[phrase 1|phrase 2|...]` to diversify the end results.
- Comments are automatically gendered according to the user's settings.
- Allows admins to view the entire list of questions and comments.
- Allows admins to create, edit and delete comments.

## Techinical Details

### Tech stack

- [React](https://reactjs.org/) for the frontend UI
  - Custom components, including three-phase (off, indeterminate, on) checkboxes
- [Tailwind CSS](https://tailwindcss.com/) for the CSS framework
- [Firebase](https://firebase.google.com/) for hosting, database (Firestore) and cloud functions.
- [Vite](https://vitejs.dev/) for bundling

### Navigating the repository

- `/functions`: cloud functions for the app.
- `/src/Admin`: pages and hooks for the admin page.
- `/src/Write`: pages and hooks for the user page.
- `/src/common`: JavaScript utility functions.
- `/src/firebase`: Firebase context and hooks.

### Building the app

Clone the repository and run the dependencies with `npm install`. Then, follow the [Firebase tutorial](https://firebase.google.com/docs/web/setup) to set up the Firebase SDK.

You can publish the app to Firebase with

```
npm run build
firebase deploy
```

I did not consider the Node environment for Cloud Functions (Node 16, Firebase API v8), so it may trigger some version warnings and the Firebase API syntax is different between `\src` and `\functions`.

## Future Plans

- Tech
  - Improve on the state handling logic: I tried my best to implement best practices and coding styles into the code, despite being my first React project. There are still some inefficient logics in the app, such as states copying and passing data to another state, instead of just passing references. It will be a painful process to change these, but it will make future improvements so much easier.
  - Use a state management library: currently there are multiple hooks interacting one another, which makes it difficult to track states. Also, it is difficult to further modularise the codes because prop drilling would be then necessary. [Zustand](https://zustand-demo.pmnd.rs/) sounds like a great choice for this, thanks to its simplicity and ability to fetch data without the use of middlewares.
  - Adopt a UI framework: reinventing the wheel is a painful process and I work full-time. There are a few components I have yet developed yet (modals, side popups, tabs, ...). I used Chakra UI before, but it really bloated the bundle size. Maybe [Mantine](https://mantine.dev/pages/getting-started/)?
- Features
  - Suggest skill comments: while the app will save time writing behavioural comments, it does not really help writing achivement comments much because the user will still have to manually type which skills they are good at and they need to improve on. A future update will allow the app to suggest skill comments based on the student's year level and topic (Year 8 -- Algebra -- ["combine like terms", "expand brackets", ...]).
  - Ability to work on multiple students, import/export feature: ultimately, I wish the user to be able to upload their pre-existing student spreadsheet, generate comments on the students one-by-one, and then download the spreadwheet with added effort grade and comment data.

## Copyright Disclaimer

The favicon was generated using the graphics from [Twitter Twemoji](https://github.com/twitter/twemoji) from [favicon.io](https://favicon.io/).
