# Data Generator

A random data generator tool built with FastAPI for the backend and React with TypeScript for the frontend. This tool allows you to generate random data based on specified configurations and export it in various formats.

## Features

- Generate random data based on user-defined configurations.
- Export generated data in CSV format.
- Simple and intuitive web interface built with React and Vite.
- Fast and scalable backend built with FastAPI.
- CORS support for seamless integration with frontend.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Python](https://www.python.org/) (version 3.7 or higher)
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Backend Setup

1. Navigate to the root directory of the project:

    ```sh
    cd /path/to/your/project
    ```

2. Create a virtual environment and activate it:

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required dependencies:

    ```sh
    pip install -r requirements.txt
    ```

4. Run the FastAPI server:

    ```sh
    uvicorn main:app --reload
    ```

   The backend server will start on `http://127.0.0.1:8000`.

### Frontend Setup

1. Navigate to the [frontend](http://_vscodecontentref_/1) directory:

    ```sh
    cd frontend
    ```

2. Install the dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Start the development server with hot module replacement (HMR):

    ```sh
    npm run dev
    # or
    yarn dev
    ```

   The frontend development server will start on `http://localhost:5173` and proxy API requests to the FastAPI server.

### Building for Production

To build the frontend project for production:

```sh
npm run build
# or
yarn build
```

This will create an optimized production build in the dist directory.

Previewing the Production Build
To preview the production build locally:

```sh
npm run preview
# or
yarn preview
```

### Linting
To lint the codebase using ESLint:

```sh
npm run lint
# or
yarn lint
```

### Project Structure
- main.py: Entry point of the FastAPI application.
- frontend: Contains the source code for the React application.
    - public: Contains static assets.
    - dist: Contains the production build.
    - vite.config.ts: Vite configuration file.
    - eslint.config.js: ESLint configuration file.
    - tsconfig.json: TypeScript configuration file.
    - tsconfig.app.json: TypeScript configuration for the application.
    - tsconfig.node.json: TypeScript configuration for Node.js.

### License
This project is licensed under the MIT License.

```sh
This `README.md` provides a comprehensive overview of the project, including setup instructions for both the backend and frontend, as well as details about the project structure and features.
```