# serverless-typescript-template

This template provides a robust and scalable foundation for building serverless applications with TypeScript, following clean architecture principles. It's designed to promote maintainable, testable, and organized codebases for your AWS Lambda functions.

## Features

*   **TypeScript:** Strongly typed JavaScript for enhanced code quality and developer experience.
*   **Serverless Framework:** Simplifies deployment and management of serverless applications.
*   **Clean Architecture / Domain-Driven Design:** Structured project layout promoting separation of concerns, testability, and maintainability.
*   **Custom Error Handling:** Centralized and extensible error management.
*   **Structured Logging:** Integrated logger for consistent and informative application logs.
*   **Unit Testing:** Pre-configured with Jest for comprehensive unit testing.
*   **Build Process:** Optimized build process that excludes test files from the final output.

## Project Structure

The project is organized to reflect clean architecture principles, separating concerns into distinct layers:

```
.
├── src/
│   ├── shared/             # Common utilities, libraries, and cross-cutting concerns
│   │   ├── Environments.ts
│   │   ├── errors/         # Custom error classes (Application, Domain, Infrastructure, Validation)
│   │   ├── libraries/      # Shared libraries like the custom logger
│   │   └── utils/          # General utility functions and constants
│   └── user/               # Example domain module (e.g., User management)
│       ├── application/    # Application-specific business rules and use cases
│       │   ├── ports/      # Interfaces for external dependencies (e.g., persistence)
│       │   └── usecases/   # Command and Query handlers
│       ├── domain/         # Core business logic, entities, and value objects
│       │   ├── User.ts
│       │   └── value-objects/
│       └── infrastructure/ # Implementation details for external concerns
│           ├── driven/     # Adapters for external systems (e.g., databases, external APIs)
│           └── driving/    # Adapters for incoming requests (e.g., HTTP handlers, SQS consumers)
├── dist/                   # Compiled JavaScript output
├── node_modules/
├── serverless.yml          # Serverless Framework configuration
├── tsconfig.json           # TypeScript compiler configuration
├── package.json            # Project dependencies and scripts
└── README.md
```

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
*   [Serverless Framework CLI](https://www.serverless.com/framework/docs/getting-started) (install globally: `npm install -g serverless`)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd serverless-typescript-template
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

## Available Scripts

*   **`npm run build`**: Compiles the TypeScript source code into JavaScript, placing the output in the `dist/` directory. This command automatically excludes test files (`.test.ts`) from the build output.
*   **`npm test`**: Runs all unit tests using Jest.
*   **`npm run deploy`**: Deploys the serverless application to your configured AWS environment using the Serverless Framework.

## Custom Components

### Error Handling

The `src/shared/errors` directory contains custom error classes that extend `BaseError`. This provides a structured way to handle different types of errors (e.g., `ApplicationError`, `DomainError`, `InfrastructureError`, `ValidationError`) across your application, making error identification and handling more consistent.

### Logging

The `src/shared/libraries/logger` module provides a custom logger implementation (`Logger.ts`) that adheres to the `ILogger.ts` interface. This allows for flexible and structured logging, which can be easily integrated with various logging services.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.