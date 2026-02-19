# Heads or Tails Game

## Description

A full-stack web application built with Meteor.js and React, featuring Material-UI for a modern user interface. It appears to be a "Heads or Tails" game or a decision-making tool, with multi-language support (English and Russian).

## Technologies Used

* **Framework:** Meteor.js
* **Frontend:** React, Material-UI
* **Backend:** Node.js (via Meteor)
* **Database:** MongoDB (implied by Meteor and `winston-mongodb`)
* **Styling:** animate.css, Material-UI
* **Internationalization:** i18n (English and Russian)
* **Linting:** Standard.js
* **Other Libraries:** bcrypt, winston, react-router-dom, moment, simpl-schema

## Features (Inferred)

* User authentication (implied by `bcrypt` and `accounts.js` in `imports/server/`)
* Multi-language support (English and Russian)
* Interactive UI with Material-UI components
* API services and collections for data management
* Logging with Winston, possibly to MongoDB

## Project Structure

The project follows a typical Meteor.js structure with `client`, `server`, and `imports` directories.

* `client/`: Client-side entry point and main React application.
* `server/`: Server-side entry point.
* `imports/`: Contains shared and modular code for both client and server, including:
  * `api/`: Defines collections, DDP controllers, publications, and services.
  * `client/`: Client-specific extensions and initialization.
  * `lib/`: Utility libraries.
  * `server/`: Server-specific configurations like accounts, errors, logging, and security.
  * `ui/`: React UI components, hooks, and helpers.
* `i18n/`: Internationalization files for different languages.
* `packages/`: Custom Meteor packages.

## Getting Started

### Prerequisites

* Node.js (version 12.22.1 as per `package.json` - though newer versions might work, this is the specified one)
* npm (version 6.14.12 as per `package.json`)
* Meteor (installation instructions usually involve `curl https://install.meteor.com/ | sh`)

### Installation

1. Clone the repository:

    ```bash
    git clone [repository-url]
    cd heads_or_tails
    ```

2. Install npm dependencies:

    ```bash
    meteor npm install
    ```

### Running the Application

```bash
./start.sh
# Or directly:
# METEOR_OFFLINE_CATALOG=1 meteor run --no-release-check --no-lint --exclude-archs web.browser.legacy
```

The application should then be accessible in your browser, usually at `http://localhost:3000`.

## Development

* **Linting:** `meteor npm run lint`
* **Testing:** `meteor npm run test` or `meteor npm run test-app`
* **Build:** `meteor npm run build-app`
