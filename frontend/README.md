# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Navigate to the `frontend` directory:

    ```sh
    cd frontend
    ```

2. Install the dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

### Development

To start the development server with hot module replacement (HMR):

```sh
npm run dev
# or
yarn dev
```

This will start the Vite development server and proxy API requests to the FastAPI server running on `http://127.0.0.1:8000`.

### Building for Production

To build the project for production:

```sh
npm run build
# or
yarn build
```

This will create an optimized production build in the `dist` directory.

### Previewing the Production Build

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

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

    ```js
    export default tseslint.config({
      languageOptions: {
        // other options...
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname,
        },
      },
    })
    ```

- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

    ```js
    // eslint.config.js
    import react from 'eslint-plugin-react'

    export default tseslint.config({
      // Set the react version
      settings: { react: { version: '18.3' } },
      plugins: {
        // Add the react plugin
        react,
      },
      rules: {
        // other rules...
        // Enable its recommended rules
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
      },
    })
    ```

## Project Structure

- `src/`: Contains the source code for the React application.
- `public/`: Contains static assets.
- `dist/`: Contains the production build.
- `vite.config.ts`: Vite configuration file.
- `eslint.config.js`: ESLint configuration file.
- `tsconfig.json`: TypeScript configuration file.
- `tsconfig.app.json`: TypeScript configuration for the application.
- `tsconfig.node.json`: TypeScript configuration for Node.js.

## Proxy Configuration

The Vite development server is configured to proxy API requests to the FastAPI server. This is set up in the `vite.config.ts` file:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000', // Proxy all API requests to FAST API server
    },
  },
})
```

## License

This project is licensed under the MIT License.