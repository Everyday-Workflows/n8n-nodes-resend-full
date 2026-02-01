# Architecture

## Project Structure
```
n8n-nodes-resend/
├── nodes/Resend/
│   ├── Resend.node.ts          # Main node (12 resources)
│   ├── ResendTrigger.node.ts   # Webhook trigger node
│   ├── actions/
│   │   ├── router.ts           # Top-level resource router
│   │   ├── email/
│   │   │   ├── index.ts        # Operation descriptions
│   │   │   ├── execute.ts      # Operation router
│   │   │   └── *.operation.ts  # Individual operations
│   │   ├── template/
│   │   ├── domain/
│   │   └── [10 more resources]/
│   ├── methods/
│   │   └── index.ts            # Dynamic dropdown loaders
│   ├── transport/
│   │   └── index.ts            # HTTP client (apiRequest, requestList)
│   └── utils/
│       └── sendAndWait/        # Human-in-the-loop logic
├── credentials/
│   └── ResendApi.credentials.ts
└── dist/                       # Compiled output
```

## Key Patterns

### 1. Resource-Operation Router Pattern
**Two-level routing** for scalability:
```typescript
// Level 1: Resource router (router.ts)
switch (resource) {
  case 'email': return email.execute.call(this, i, operation);
  case 'templates': return templates.execute.call(this, i, operation);
  // ... 10 more resources
}

// Level 2: Operation router (email/execute.ts)
switch (operation) {
  case 'send': return send.execute.call(this, index);
  case 'sendBatch': return sendBatch.execute.call(this, index);
  // ... 7 more operations
}
```

### 2. Operation File Structure
Each operation is a self-contained module:
```typescript
// send.operation.ts
export const description: INodeProperties[] = [ /* UI config */ ];
export async function execute(this: IExecuteFunctions, index: number) {
  // Implementation
}
```

### 3. Transport Layer Abstraction
Centralized HTTP client in `transport/index.ts`:
- `apiRequest()`: Single API call
- `requestList()`: Automatic pagination for list operations
- Handles auth, error handling, rate limiting

### 4. Dynamic Dropdowns (methods/)
Load options from Resend API for dropdowns:
- `getTemplates()`: Fetch template list
- `getSegments()`: Fetch segment list
- `getTemplateVariables()`: Extract variables from template HTML

**Critical gotcha**: Template variable extraction uses complex parameter resolution:
```typescript
// Tries 3 different n8n APIs to get templateId
const templateId = getParameterValue('emailTemplateId') ?? getParameterValue('templateId');
```

### 5. Send and Wait (Human-in-the-Loop)
**Unique architecture** using n8n's webhook system:
1. Node generates unique webhook URL
2. Injects approval buttons/form into email HTML
3. Pauses workflow execution
4. Recipient clicks button → hits webhook
5. Svix signature verified → workflow resumes

**Key files**:
- `utils/sendAndWait/utils.ts`: Core logic
- `utils/sendAndWait/email-templates.ts`: HTML generation
- `utils/sendAndWait/descriptions.ts`: UI config

## Critical Implementation Details

### Webhook Signature Verification
Uses Svix library for security:
```typescript
const wh = new Webhook(webhookSecret);
wh.verify(body, headers); // Throws if invalid
```

### Bot Detection
Trigger node filters bot traffic:
```typescript
import isbot from 'isbot';
if (isbot(userAgent)) { /* skip */ }
```

### Error Handling
All operations wrapped in try-catch with `continueOnFail()` support:
```typescript
if (this.continueOnFail()) {
  returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
  continue;
}
```

## Data Flow

### Outbound (Send Email)
```
User Input → Resend.node.ts → router.ts → email/execute.ts 
→ send.operation.ts → transport/apiRequest() → Resend API
```

### Inbound (Webhook)
```
Resend API → ResendTrigger.node.ts → Svix verification 
→ Bot detection → Workflow execution
```

## Dependencies
- **n8n-workflow**: Core n8n types and utilities (peer dependency)
- **isbot**: Bot detection for webhook filtering
- **No Resend SDK**: Uses raw HTTP API for full control

## Build System
- **TypeScript**: Strict mode, ES2019 target
- **Gulp**: Copies SVG icons and JSON files to dist/
- **npm scripts**: `build`, `dev` (watch), `lint`, `format`
