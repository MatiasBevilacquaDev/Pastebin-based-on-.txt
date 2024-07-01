# Web on .txt base style Pastebin

## Description
A simple web application that mimics the functionality of Pastebin but uses `.txt` files instead of a database. When an original file is deleted, all its copies are also removed.

## Features
- Generate new text files with unique IDs.
- Create copies of text files.
- Delete an original text file and all its copies.
- Uses `.txt` files for data storage.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/matito8877/pasteich.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-repo-name
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage
1. Start the server:
    ```bash
    node server.js
    ```
    or for greater comfort
   ```bash
    nodemon server.js
    ```
3. Open your web browser and navigate to:
    ```
    http://localhost:3000
    ```

## API Endpoints
- `POST /generar-archivo`: Generates a new text file.
- `POST /generar-archivo-copia`: Generates a copy of an existing text file.
- `GET /eliminar-archivos`: Deletes an original text file and all its copies.
- `GET /obtener-archivo`: Retrieves the content of a text file.
