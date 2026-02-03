# Contributing to n8n-nodes-resend-full

Thank you for your interest in contributing to **n8n-nodes-resend-full**! We welcome contributions from the community and are pleased to have you help improve this project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Community](#community)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.15
- **npm** >= 9.0 or **pnpm** >= 8.0
- **Git**

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/n8n-nodes-resend-full.git
cd n8n-nodes-resend-full
```

3. Add the upstream repository:

```bash
git remote add upstream https://github.com/Everyday-Workflows/n8n-nodes-resend-full.git
```

## Development Setup

### Install Dependencies

```bash
npm install
```

### Build the Project

```bash
npm run build
```

### Development Mode (Watch)

```bash
npm run dev
```

This will watch for changes and automatically recompile TypeScript files.

### Link for Local Testing in n8n

```bash
# In the project directory
npm link

# In your n8n installation directory
npm link n8n-nodes-resend-full
```

### Linting

```bash
# Check for linting issues
npm run lint

# Fix linting issues automatically
npm run lintfix
```

### Formatting

```bash
npm run format
```

## Project Structure

```
n8n-nodes-resend-full/
├── credentials/              # Credential types
│   └── ResendApi.credentials.ts
├── nodes/
│   └── Resend/
│       ├── Resend.node.ts           # Main node
│       ├── ResendTrigger.node.ts    # Webhook trigger node
│       ├── actions/                 # Resource operations
│       │   ├── router.ts
│       │   ├── email/
│       │   ├── domain/
│       │   ├── template/
│       │   └── ...
│       ├── methods/                 # Dynamic dropdown loaders
│       ├── transport/               # HTTP client
│       └── utils/                   # Utility functions
├── dist/                    # Compiled output (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Making Changes

### Creating a New Branch

Always create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:

- `feature/add-new-operation` - New features
- `fix/bug-description` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/cleanup-code` - Code refactoring

### Adding a New Operation

To add a new operation to an existing resource:

1. Create a new file in `nodes/Resend/actions/{resource}/`
2. Export the operation description and execute function
3. Add the operation to the resource's `index.ts`
4. Update the router if needed
5. Add documentation to README.md

Example structure for a new operation:

```typescript
// nodes/Resend/actions/email/myOperation.operation.ts
import type { INodeProperties } from 'n8n-workflow';
import type { IExecuteFunctions } from 'n8n-workflow';

export const description: INodeProperties[] = [
	{
		displayName: 'Parameter Name',
		name: 'parameterName',
		type: 'string',
		default: '',
		description: 'Description of the parameter',
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<any> {
	// Implementation
}
```

## Code Style Guidelines

### TypeScript

- Use **strict TypeScript** mode
- Define explicit return types for functions
- Use proper typing for parameters
- Avoid `any` types when possible
- Use interfaces for object shapes

### Naming Conventions

- **Files**: `kebab-case.ts` for operations, `PascalCase.ts` for main files
- **Functions**: `camelCase`
- **Constants**: `SCREAMING_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`

### Code Organization

- Keep functions small and focused
- Use early returns to reduce nesting
- Group related operations together
- Document complex logic with comments

### Error Handling

Always handle errors properly:

```typescript
try {
	const response = await apiRequest.call(this, 'GET', '/endpoint');
	return response;
} catch (error) {
	if (this.continueOnFail()) {
		return { error: error.message };
	}
	throw error;
}
```

### Comments

- Use JSDoc for function documentation
- Explain "why" not "what" in comments
- Keep comments up-to-date with code changes

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

When adding new functionality, include tests:

1. Create test files in the appropriate location
2. Use descriptive test names
3. Test both success and failure cases
4. Mock external API calls

### Manual Testing

Before submitting a PR:

1. Test the operation in a real n8n workflow
2. Verify error handling works correctly
3. Test with different input variations
4. Verify webhook functionality (if applicable)

## Pull Request Process

### Before Submitting

1. **Sync with upstream**:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run quality checks**:

   ```bash
   npm run build
   npm run lint
   npm test
   ```

3. **Update documentation** if needed (README.md, CHANGELOG.md)

### Creating a Pull Request

1. Push your branch to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

2. Open a Pull Request on GitHub

3. Fill out the PR template with:
   - Clear description of changes
   - Motivation for the change
   - Testing performed
   - Screenshots (if UI changes)
   - Related issues (if applicable)

### PR Review Process

- All PRs require review from a maintainer
- Address review comments promptly
- Keep PRs focused and reasonably sized
- Be respectful and constructive in discussions

### After Merge

Once your PR is merged:

1. Delete your feature branch
2. Sync your fork with upstream
3. Celebrate your contribution! 🎉

## Reporting Issues

### Bug Reports

When reporting a bug, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - n8n version
   - Node version
   - Package version
6. **Error Messages**: Full error text or screenshots
7. **Additional Context**: Any other relevant information

### Feature Requests

When requesting a feature:

1. **Description**: Clear description of the feature
2. **Use Case**: Why is this feature needed?
3. **Proposed Solution**: How should it work?
4. **Alternatives**: Other solutions considered
5. **Additional Context**: Any other relevant information

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Email**: hello@everydayworkflows.com

### Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

### Recognition

Contributors will be recognized in:

- Git commit history
- Release notes for significant contributions
- README.md contributors section (for major contributions)

## Development Tips

### Debugging

To debug your changes in n8n:

1. Build the project with source maps
2. Link the package locally
3. Use `console.log` or a debugger
4. Check n8n's execution logs

### Common Issues

**Build errors**:

- Ensure you're using Node.js >= 20.15
- Delete `node_modules` and `package-lock.json`, then `npm install`

**Linting errors**:

- Run `npm run lintfix` to auto-fix many issues
- Check `.eslintrc.js` for rules

**n8n doesn't see changes**:

- Ensure you've rebuilt with `npm run build`
- Restart n8n after changes
- Check that linking worked correctly

## Questions?

If you have questions about contributing:

1. Check existing documentation
2. Search closed issues on GitHub
3. Open a new discussion on GitHub
4. Email: hello@everydayworkflows.com

Thank you for contributing to n8n-nodes-resend-full!
