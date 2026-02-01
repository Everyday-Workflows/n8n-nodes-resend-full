# Product Vision

## Why This Exists
Resend is a modern email API designed for developers. This n8n node bridges the gap between Resend's powerful features and n8n's workflow automation platform, enabling users to:
- Send transactional emails from workflows
- Manage email contacts and audiences programmatically
- Create approval workflows with "Send and Wait" (human-in-the-loop)
- Receive real-time webhook events for email tracking
- Integrate AI agents that can compose and send emails

## How It Works

### User Experience Flow
1. **Installation**: User installs via n8n Community Nodes UI or npm
2. **Credential Setup**: User adds Resend API key from dashboard
3. **Node Usage**: Drag Resend node into workflow, select resource + operation
4. **Execution**: Node makes authenticated API calls to Resend

### Key Features

#### 1. Send and Wait (Human-in-the-Loop)
Unique feature that pauses workflow execution until recipient responds:
- Send email with approval buttons (Approve/Decline)
- Send email with free-text response form
- Configurable timeout or indefinite wait
- Secure callback URLs with Svix signature verification

#### 2. AI Agent Integration
Node is usable as an AI agent tool:
- AI can discover all 12 resources and their operations
- Dynamic parameters via `$fromAI('param', 'description', 'type')`
- Natural language operation descriptions
- Requires `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true` environment variable

#### 3. Webhook Trigger
Separate trigger node receives real-time events:
- 15 event types (email.sent, email.delivered, email.bounced, etc.)
- Automatic Svix signature verification
- Bot detection using `isbot` library

## User Problems Solved
- **No-code email automation**: Non-developers can build complex email workflows
- **Approval workflows**: Business processes requiring human approval via email
- **Email tracking**: Real-time visibility into email delivery and engagement
- **AI-powered emails**: Let AI agents compose and send contextual emails
- **Contact management**: Programmatic audience and segment management