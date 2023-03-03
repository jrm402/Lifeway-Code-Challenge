This project is built with [Next.js](https://nextjs.org/).

## Getting Started

First, install project dependencies:

```bash
npm install
# or
yarn install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

First, start the server in either dev mode (commands above) or build and deploy a production build. The host should be deployed as `http://localhost:3000`.

**Production build and deploy:**

```bash
npm run build && npm run start
# or
yarn build && yarn start
```

Then, in a new console window, run the following command to execute tests:

```bash
npm run cypress
# or
yarn cypress
```

A new window will be opened with instructions to run the `app.cy.ts` E2E test script.

## Requirements

Original README requirements:

---

This is LifeWay IT's code challenge given to full stack software engineering candidates! Interested in working with our team? Check out open positions [here](http://tech.lifeway.com/)

---

### Premise

The premise of this challenge is to create a "profile page" for various star wars characters in the Star Wars universe.

### Specification

Create a simple single page application that provides the following features:

-   A search bar that takes the characters name as input.
-   A profile containing the following sectional information for the searched character:
    -   About Me (height, weight, hair color, date of birth, species information)
    -   Films Appeared In
    -   Starships Flown

Use [SWAPI](https://swapi.dev/) to obtain all the star wars data that you need.

Use whatever languages or tech you want -- we are looking for clean, testable code that demonstrates usage of common design patterns and best practices above all else.

#### BUT

You will get bonus points if...

-   A decent understanding of React is demonstrated
-   A decent understanding of Next.js is demonstrated
-   A decent understanding of unit/integration testing is demonstrated
-   A basic "gateway" api is created to consolidate and proxy calls to SWAPI
-   You add cool and creative features not included in the spec

---

### Submissions

Please put your submission in a public github repository to share.

---

<div class="footer">
  <img src="https://commerce-notification-service-uat.s3.amazonaws.com/emails/Lifewaylogo__RGB_gray_flat.png" alt="Lifeway Christian Resources" width="150" style="padding: 1rem;">
</div>
