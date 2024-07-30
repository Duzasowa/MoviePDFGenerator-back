# Movie PDF Generator

This project is a server-side application that provides the ability to generate PDF files with movie information. It uses The Movie Database (TMDB) API to fetch movie data and convert this data into PDF documents.

## Project Structure

The project consists of the following files and directories:

### `config.ts`

This file is responsible for loading environment settings from the `.env.local` file and using them in the application.

### `logger.ts`

This file configures logging using the `winston` library and `cli-color` for colored console output. Logs are also saved in daily rotating files.

### `server.ts`

The main server startup file. It imports the configurations, initializes the server, and listens on the port defined in the environment variables.

### `app.ts`

This file sets up the main Express application, including CORS settings and router connections.

### `moviesRouter.ts`

The routing file that defines paths for fetching a list of movies, detailed information about a movie, and movie data in JSON format.

### Controllers

- `getMoviesDataController.ts`: Fetches a list of movies in JSON format from TMDB.
- `getMoviesController.ts`: Fetches popular movies and generates a PDF file with their list.
- `getMovieDetailController.ts`: Fetches detailed information about a specific movie and generates a PDF file with a poster and details.

## Usage

### Available Scripts

In the project directory, you can run:

#### `npm run local`

Runs the app in development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

For correct operation, it is necessary to have the “MoviePDFGenerator-front” client running on port 3000.

## Example Usage

1. **Fetch a list of popular movies**: A GET request to `/movies` returns a PDF file with a list of popular movies.
2. **Fetch detailed movie information**: A GET request to `/movies/movie/:id` returns a PDF file with detailed information about the movie, including the poster.
3. **Fetch movie data in JSON format**: A GET request to `/movies/json` returns movie data in JSON format.

## Configuration

To run the project, you need to create a `.env.local` file with the following environment variables:

- `TMDB_API_KEY`: API key for accessing TMDB.
- `BASE_URL`: Base URL for TMDB API requests.

## Logging

Logs are saved in daily rotating files in the `logs` directory. Errors are also output to the console with color formatting for easier reading.

This project provides a convenient interface for obtaining movie information in the form of PDF documents, which can be useful for various applications such as creating reports or distributing information in a user-friendly format.
