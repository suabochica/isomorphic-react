# Isomorphic React

Takeaways and parcitcal project of the course [Isomorphic React](https://app.pluralsight.com/library/courses/isomorphic-react/table-of-contents)
by Daniel Stern.

## 👨‍💻 About The Application

This application is a basic API client which gathers data from an outside API (in this case, Stackoverflow) and generates an isomorphic, single-page application (SPA).

## 🧰 Major Libreries

- Babel
- React
- Express
- Webpack

Babel is translating the ES2015 into compatible ES5.

Webpack is using Babel to transform the all the client files `.js` and `.jsx` into ES5.

Express is handling API functions and serving the bundle created by Babel.

## 🤔 Why Isomorphic React?

Great question!

    Uses React / Redux as main application engine
    Supports hot reloading and server rendering!
    Uses React Router (in a combination with server rendering that is truly amazing)
    No fluff, just the good stuff

## 👣 Getting Started

1. Clone the repository
2. Install dependencies `npm install && npm run postinstall`
3. Run the dev server `npm run start-dev`
4. Navigate to the application's url http://localhost:3000/

## 🥡 Takeaways
- React is integrating with Redux to create our client view
- React Router is rendering different component based on path
- Express is assembling state but leaving rendering details to router
- Browser History and Memory History are powering React Router on the client and on the server, respectively
- Hot Module Reload is being used to hot reload the client development view on source update
- Production setting are implemented
## 📓 Functional components of the application
- Routing
- Server Rendering
- Isomorphic data fetching

## 💬 Troubleshooting

- Remember that in `.jsx` compontents use the arrow function followed by parenthesis `()` instead of braces `{}`.
- In PROGRESS: Cannot get `questions/12313` when we try to visualize the question details