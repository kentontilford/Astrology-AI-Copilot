# Contributing to Astrology AI Copilot

Thank you for your interest in contributing to Astrology AI Copilot! This document provides guidelines and instructions for contributing to this project.

## Development Setup

Please refer to the [Getting Started Guide](./docs/getting-started.md) for detailed instructions on setting up the development environment.

## Branching Strategy

We follow a simplified Git Flow approach:

- `main`: Production-ready code
- `dev`: Development branch where features are integrated
- Feature branches: Created from `dev` for new features

### Branch Naming Convention

- Feature branches: `feature/short-description`
- Bug fixes: `fix/short-description`
- Documentation updates: `docs/short-description`

## Commit Messages

We follow conventional commits for clear and readable history:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or updating tests
- `chore`: Updates to build process, dependencies, etc.

Example: `feat: add birth profile creation form`

## Pull Request Process

1. Create a new branch from `dev`
2. Make your changes and commit them
3. Push your branch to the repository
4. Create a pull request to merge your branch into `dev`
5. Fill out the pull request template
6. Request a review from a maintainer

## Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write tests for new features
- Keep components modular and reusable

## Testing

Before submitting a PR, please ensure all tests pass:

```bash
# Run all tests
npm test

# Run frontend tests
npm run test --workspace=client

# Run backend tests
npm run test --workspace=server
```

## Documentation

- Update documentation when adding or changing features
- Add comments to complex code sections
- Document API endpoints and parameters

## Issue Reporting

If you find a bug or have a feature request, please create an issue using the appropriate template.

## Code of Conduct

Please be respectful and inclusive in all contributions and communications related to this project.