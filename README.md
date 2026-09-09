# 🏆Quizton
[![Netlify Status](https://api.netlify.com/api/v1/badges/8f0ed284-dc8d-49c0-935e-d783ba86d787/deploy-status)](https://app.netlify.com/sites/quizton/deploys)
## Description
This is a Quiz website for Topics such as :
* Computer Science
* Mathematics
* Sports
* History
* Animal

on mixed levels : hard, medium and easy difficulty.

## View Project
[**Click Here**](https://sabo.sh/quiz)

## Mount path

The app is served from `/quiz/`, not from a domain root: it is reached as
`https://sabo.sh/quiz/…` through a Cloudflare worker that proxies requests
without rewriting the path, so the origin has to answer on `/quiz/…` itself.

`base` in `vite.config.js` is the single source of truth. It sets every emitted
asset URL, and `App.jsx` reads it back via `import.meta.env.BASE_URL` for the
router's `basename`, so the two cannot drift apart. Vite builds into
`build/quiz` while Netlify publishes `build/`, which puts the files on disk at
exactly the paths they are served from.

Routes inside the app are written *without* the prefix — `<Link to="/sports">`
resolves to `/quiz/sports` because the basename supplies the rest.

## Technology used 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
## Details
1. [**ReactJS**](https://reactjs.org/) was used to create this project
2. Question data is obtained form [Open Trivia Database](https://opentdb.com/)
3. Uses token gernerated by opentdb to access new questions each time from its database.

