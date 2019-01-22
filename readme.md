[![Maintainability](https://api.codeclimate.com/v1/badges/77814f342caf5c685b6c/maintainability)](https://codeclimate.com/github/larrystone/PNG/maintainability)  [![Build Status](https://travis-ci.org/larrystone/PNG.svg?branch=develop)](https://travis-ci.org/larrystone/PNG) [![codecov](https://codecov.io/gh/larrystone/PNG/branch/develop/graph/badge.svg)](https://codecov.io/gh/larrystone/PNG)

# PNG
PNG is a phone number generator app.

## Hosted Application
https://larrystone-png.now.sh/

## API Documentation
https://documenter.getpostman.com/view/2732996/RztfvBEP

## Installation 
1. Install [`node`](https://nodejs.org/en/download/), version 5 or greater

2. Install [`postgres`](https://www.postgresql.org/download/)

3. Clone the repo and cd into it

    ```
    git clone https://github.com/larrystone/PNG.git"
    cd png
    ```

4. Install all dependencies

    ```
    yarn install
    ```

5. Start the app

    ```
    yarn dev
    ```

6. Test the application on the browser

    ```
    http://localhost:3000/
    ```    

## Testing

The app uses `Mocha`, `Chai` and `Chai-Http` for testing, 
Run `yarn test` to run tests

## Deployment

This app is deployed to [zeit now](https://zeit.co/now). 
Install `now` globally. 
```
yarn global add now
```
Then run `yarn deploy` to deploy the app


## Built With
* [NodeJS](https://nodejs.org/en/) - A Javascript runtime built on chrome V8 engine that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJs](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [Terminal Emulator](https://www.npmjs.com/package/react-console-emulator) - A simple, powerful and highly customisable Unix terminal emulator for React.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details


## Author

* **Lawal Lanre E. (Larrystone)** - Aspiring Software Dev.
