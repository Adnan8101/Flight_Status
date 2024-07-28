Based on the structure of your project directory, here is a sample `README.md` file:

```markdown
# ModiAviation

ModiAviation is a Node.js-based application for managing flight status and related aviation services.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Adnan8101/Flight_Status.git
   cd Flight_Status
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   Create a `.env` file in the root directory and add your environment variables as needed. Refer to the `.env.example` file for the required variables.

## Usage

To start the application, use the following command:

```bash
npm start
```

This will start the server on the port specified in your `.env` file or default to port 3000.

## Configuration

Ensure you have the required configurations set in your `.env` file. Common configurations include:

- `PORT`: The port on which the server runs.
- `DATABASE_URL`: The URL of your database.
- Any other environment-specific variables.

## Scripts

The following npm scripts are available:

- `start`: Start the application.
- `dev`: Start the application in development mode with hot reloading.
- `test`: Run tests.

## Project Structure

```
ModiAviation
├── config             # Configuration files
├── controllers        # Controllers for handling requests
├── models             # Database models
├── public             # Publicly accessible files (e.g., images, CSS)
├── routes             # Route definitions
├── views              # View templates
├── script.js          # Main script file
├── server.js          # Server setup and configuration
├── package.json       # Project metadata and dependencies
├── package-lock.json  # Exact versions of project dependencies
├── .env               # Environment variables
```

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
```
