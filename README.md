# Go1 Coding Challenge

To see a working version of this code, go to:
http://au.com.go1.test.s3-website-ap-southeast-2.amazonaws.com/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

## Data Persistence

The service handles all data retrieval and mutation functions, to properly mock a real-life example with a live API. The sample data has been placed in the assets folder, and the JSON is read by the service on the initial call. The data is stored in memory and is utilised via the service variable for subsequent calls. Any additions to alterations to the events list will be lost on page refresh or app reload. A persistent storage (for example, localstorage) would more accurately reflect a live situation (with an API and database), but the in-memory solution will suffice for this challenge.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
There are a mix of functional tests as well as UI element tests. All components have at least 1 test.

## To Do
* Search by date
