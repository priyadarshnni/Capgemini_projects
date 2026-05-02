# WeatherComponentApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.





Question
13
Angular: Weather Component
Description
Angular: Weather Component
Environment
Angular CLI Version: 10.0.4
Angular Core Version: 10.0.4
Node Version: 12.18.3
Default Port: 8000
​
 Functionality Requirements 

An array of objects is passed as a prop to the component, where each object is a weather record for a single city. The object has 4 properties: name: The name of the city. [STRING] temperature: The temperature in the city. [STRING] wind: The wind in the city. [STRING] humidity: The humidity in the cit.y [STRING] There is an input field for the city name where the user can type the name of a city to search the weather data for. (The city name is case-insensitive.) If data exists for the typed input, render the weather details
as below, inside
. {temperature}, where {temperature} is the value from the weather record.
Wind: {wind}
, where {wind} is the value from the weather record.
Humidity: {humidity}
, where {humidity} is the value from the weather record. If no data exists for the typed input, do not render the weather details
, but instead render
No Results Found
. At component render, since nothing is typed, do not render above 2 divs. Testing Requirements The city name input should have the data-test-id attribute 'app-input'. The
containing weather details should have the data-test-id attribute 'weather-details'. The containing the temperature should have the data-test-id attribute 'output-temperature'. The
containing the wind information should have the data-test-id attribute 'output-wind'. The
containing the humidity information should have the data-test-id attribute 'output-humidity'. The 'No Results Found'
should have the data-test-id attribute 'no-results'.