# Technology Stack

## Language & Runtime
- **TypeScript 5.9.3**: Strict mode enabled
- **Node.js**: >=20.15 (specified in package.json engines)
- **Target**: ES2019 (CommonJS modules)

## Core Dependencies
- **n8n-workflow**: ^2.6.0 (peer dependency)
  - Provides INodeType, IExecuteFunctions, INodeProperties
  - Must match user's n8n version
- **isbot**: ^3.6.13
  - Bot detection for webhook filtering
  - Used in ResendTrigger.node.ts

## Development Tools
- **TypeScript Compiler**: 5.9.3
- **ESLint**: 9.39.2 with n8n-nodes-base plugin (1.16.5)
- **Prettier**: 3.5.3 for code formatting
- **Gulp**: 5.0.0 for asset copying (icons, JSON)
- **Jest**: 30.0.0 types (testing framework)

## Build Configuration

### TypeScript (tsconfig.json)
```json
{
  "strict": true,
  "noImplicitAny": true,
  "noImplicitReturns": true,
  "noUnusedLocals": true,
  "strictNullChecks": true,
  "outDir": "./dist/"
}
```

**Key settings**:
- `useUnknownInCatchVariables: false` - Allows `error as Error` in catch blocks
- `declaration: true` - Generates .d.ts files
- `sourceMap: true` - For debugging

### Build Process
1. `tsc` compiles TypeScript → `dist/`
2. `gulp build:icons` copies `.svg`, `.png`, `.json` → `dist/`
3. Output structure mirrors source structure

## API Integration
- **Resend API**: v1.1.0
- **Base URL**: `https://api.resend.com`
- **Auth**: Bearer token in Authorization header
- **No SDK**: Direct HTTP calls via n8n's `helpers.httpRequest()`

## n8n Integration Points

### Node Types
- `INodeType`: Main node interface
- `INodeTypeDescription`: Node metadata and UI config
- `IExecuteFunctions`: Execution context
- `IWebhookFunctions`: Webhook handling context

### Credential System
- `ICredentialType`: Resend API key storage
- `IAuthenticateGeneric`: Auto-inject auth header
- `ICredentialTestRequest`: Validate API key

### Special Features
- `usableAsTool: true`: AI agent compatibility (n8n 1.79.0+)
- `SEND_AND_WAIT_OPERATION`: Human-in-the-loop constant
- `webhooks`: Webhook configuration for Send and Wait

## Constraints

### n8n Version Requirements
- **Minimum**: 2.6.0 (peer dependency)
- **AI Agent Support**: 1.79.0+ (for `usableAsTool`)
- **Environment Variable**: `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true` for AI agents

### Resend API Limits
- **Email Size**: 40MB max (including attachments)
- **Batch Send**: 100 emails per request
- **Attachments**: Not supported with scheduled emails

### Build Constraints
- Must output CommonJS (n8n requirement)
- Icons must be copied to dist/ (not bundled by tsc)
- Package must include only `dist/` folder

## Development Workflow
```bash
npm install          # Install dependencies
npm run dev          # Watch mode (tsc --watch)
npm run build        # Full build (tsc + gulp)
npm run lint         # ESLint check
npm run lintfix      # Auto-fix lint issues
npm run format       # Prettier formatting
```

## Publishing
- **Registry**: npm
- **Package Name**: `n8n-nodes-resend`
- **Files**: Only `dist/` folder published
- **Prepublish**: Runs `build` and `lint` automatically
