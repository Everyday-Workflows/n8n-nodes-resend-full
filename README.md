<h1 align="center">
  <br>
  <a href="https://github.com/Everyday-Workflows/n8n-nodes-resend-full">
    <img src=".github/media/resend-header.png" alt="n8n-nodes-resend-full" width="900">
  </a>
  <br>
  <br>
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/n8n-nodes-resend-full">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/n8n-nodes-resend-full?style=flat-square&color=blue">
  </a>
  <a href="https://www.npmjs.com/package/n8n-nodes-resend-full">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/n8n-nodes-resend-full?style=flat-square&color=green">
  </a>
  <a href="https://github.com/Everyday-Workflows/n8n-nodes-resend-full/blob/main/LICENSE.md">
    <img alt="License" src="https://img.shields.io/github/license/Everyday-Workflows/n8n-nodes-resend-full?style=flat-square&color=yellow">
  </a>
  <a href="https://github.com/Everyday-Workflows/n8n-nodes-resend-full/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/Everyday-Workflows/n8n-nodes-resend-full?style=flat-square&color=red">
  </a>
</p>

<p align="center">
  <strong>Complete Resend API integration for n8n</strong>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-features">Features</a> •
  <a href="#-documentation">Documentation</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 📧 Overview

**n8n-nodes-resend-full** is a community-built node that provides comprehensive integration between [n8n](https://n8n.io) and [Resend](https://resend.com) — the modern email platform for developers. Send transactional emails, manage contacts and audiences, handle domains, and receive real-time webhooks, all within your n8n workflows.

### Use Cases

- **Marketing Automation**: Send personalized emails based on user behavior
- **Transaction Notifications**: Order confirmations, shipping updates, password resets
- **Approval Workflows**: Human-in-the-loop email approvals with buttons
- **AI Email Agents**: Let AI agents compose and send contextual emails
- **Contact Management**: Automate audience segmentation and contact updates
- **Webhook Processing**: Real-time email delivery and engagement tracking

---

## 🚀 Quick Start

### 1. Install the Node

```bash
npm install n8n-nodes-resend-full
```

Or install via n8n Community Nodes UI.

### 2. Configure Credentials

1. Get your API key from [Resend Dashboard](https://resend.com/api-keys)
2. In n8n, go to **Settings** → **Credentials**
3. Click **Add credential**, search for **Resend API**
4. Paste your API key

### 3. Create Your First Workflow

```
[Trigger] → [Resend] → [Success Path]
   ↓
Send Email
- To: {{ $json.email }}
- Subject: Welcome!
- HTML: <h1>Hello {{ $json.name }}</h1>
```

---

## 📦 Installation

### Method 1: n8n Community Nodes (Recommended)

1. In your n8n instance, go to **Settings** → **Community Nodes**
2. Click **Install**
3. Enter: `n8n-nodes-resend-full`
4. Restart n8n

### Method 2: npm Installation

```bash
# In your n8n installation directory
npm install n8n-nodes-resend-full

# Restart n8n
```

### Method 3: Docker

```bash
docker run -it --rm \
  -p 5678:5678 \
  -e N8N_NODES_INCLUDE=n8n-nodes-resend-full \
  n8nio/n8n
```

### Development Installation

```bash
git clone https://github.com/Everyday-Workflows/n8n-nodes-resend-full.git
cd n8n-nodes-resend-full
npm install
npm run build
npm link
cd /path/to/n8n
npm link n8n-nodes-resend-full
```

---

## ✨ Features

### 100% API Coverage

Complete coverage of the Resend API (v1.1.0) with 12 resources and 60+ operations:

| Resource               | Operations                                                              | Status  |
| ---------------------- | ----------------------------------------------------------------------- | ------- |
| **Email**              | Send, Send Batch, Send and Wait, List, Get, Update, Cancel, Attachments | ✅ Full |
| **Receiving Emails**   | List, Get, Attachments                                                  | ✅ Full |
| **Domains**            | Create, List, Get, Update, Delete, Verify                               | ✅ Full |
| **API Keys**           | Create, List, Delete                                                    | ✅ Full |
| **Templates**          | Create, List, Get, Update, Delete, Publish, Duplicate                   | ✅ Full |
| **Audiences**          | Create, List, Get, Delete                                               | ✅ Full |
| **Contacts**           | CRUD, Segments, Topics                                                  | ✅ Full |
| **Broadcasts**         | Create, List, Get, Update, Delete, Send                                 | ✅ Full |
| **Segments**           | Create, List, Get, Delete                                               | ✅ Full |
| **Topics**             | Create, List, Get, Update, Delete                                       | ✅ Full |
| **Contact Properties** | Create, List, Get, Update, Delete                                       | ✅ Full |
| **Webhooks**           | Create, List, Get, Update, Delete                                       | ✅ Full |

### Human-in-the-Loop (HITL)

The **Send and Wait for Response** operation enables human-in-the-loop workflows:

- **Approval Workflows**: Send emails with Approve/Decline buttons
- **Free Text Responses**: Collect text input via a response form
- **Configurable Wait Time**: Set a timeout or wait indefinitely
- **Secure Callbacks**: Responses use signed URLs for security

### AI Agent Support

This node is fully compatible with n8n AI Agents (requires n8n v1.79.0+):

- **Automatic Tool Discovery**: AI agents can discover and use all operations
- **Dynamic Parameters**: Use `$fromAI()` to let agents provide values at runtime
- **Natural Language**: Agents understand operation descriptions and parameters

**Requirements:**

1. n8n Version: 1.79.0 or higher
2. Environment Variable: `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true`
3. AI Agent Node: Connect Resend node to an AI Agent workflow

**Example AI Parameters:**

```javascript
{
	{
		$fromAI('to', 'The recipient email address', 'string');
	}
}
{
	{
		$fromAI('subject', 'Email subject line', 'string');
	}
}
{
	{
		$fromAI('html', 'HTML email content', 'string');
	}
}
```

---

## 📚 Documentation

<details>
<summary><strong>📧 Email Operations</strong></summary>

| Operation        | Description                                       |
| ---------------- | ------------------------------------------------- |
| Send             | Send a single email with optional attachments     |
| Send Batch       | Send up to 100 emails in one request              |
| Send and Wait    | Send email and wait for recipient response (HITL) |
| List             | List sent emails                                  |
| Get              | Retrieve email details and status                 |
| Cancel           | Cancel a scheduled email                          |
| Update           | Modify a scheduled email                          |
| List Attachments | List attachments for a sent email                 |
| Get Attachment   | Get a specific attachment from a sent email       |

</details>

<details>
<summary><strong>📨 Receiving Email Operations</strong></summary>

| Operation        | Description                                     |
| ---------------- | ----------------------------------------------- |
| List             | List all received emails                        |
| Get              | Retrieve a received email by ID                 |
| List Attachments | List attachments for a received email           |
| Get Attachment   | Get a specific attachment from a received email |

</details>

<details>
<summary><strong>👥 Audience Operations</strong></summary>

| Operation | Description             |
| --------- | ----------------------- |
| Create    | Create a new audience   |
| Get       | Retrieve audience by ID |
| Delete    | Delete an audience      |
| List      | List all audiences      |

</details>

<details>
<summary><strong>📝 Contact Operations</strong></summary>

| Operation           | Description                              |
| ------------------- | ---------------------------------------- |
| Create              | Add a new contact                        |
| Get                 | Retrieve contact details                 |
| Update              | Modify contact information               |
| Delete              | Remove a contact                         |
| List                | List all contacts                        |
| Add to Segment      | Add a contact to a segment               |
| List Segments       | List segments for a contact              |
| Remove From Segment | Remove a contact from a segment          |
| Get Topics          | Get topic subscriptions for a contact    |
| Update Topics       | Update topic subscriptions for a contact |

</details>

<details>
<summary><strong>🏷️ Contact Property Operations</strong></summary>

| Operation | Description                      |
| --------- | -------------------------------- |
| Create    | Create a custom contact property |
| Get       | Retrieve property details        |
| Update    | Modify property settings         |
| Delete    | Remove a property                |
| List      | List all contact properties      |

</details>

<details>
<summary><strong>🎯 Segment Operations</strong></summary>

| Operation | Description                                          |
| --------- | ---------------------------------------------------- |
| Create    | Create a new segment with optional filter conditions |
| Get       | Retrieve segment details                             |
| Delete    | Remove a segment                                     |
| List      | List all segments                                    |

</details>

<details>
<summary><strong>🔔 Topic Operations</strong></summary>

| Operation | Description                 |
| --------- | --------------------------- |
| Create    | Create a subscription topic |
| Get       | Retrieve topic details      |
| Update    | Modify topic settings       |
| Delete    | Remove a topic              |
| List      | List all topics             |

</details>

<details>
<summary><strong>📢 Broadcast Operations</strong></summary>

| Operation | Description                   |
| --------- | ----------------------------- |
| Create    | Create an email campaign      |
| Get       | Retrieve broadcast details    |
| Send      | Send a broadcast to a segment |
| Update    | Modify broadcast settings     |
| Delete    | Remove a broadcast            |
| List      | List all broadcasts           |

</details>

<details>
<summary><strong>📄 Template Operations</strong></summary>

| Operation | Description                    |
| --------- | ------------------------------ |
| Create    | Create an email template       |
| Get       | Retrieve template details      |
| Update    | Modify a template              |
| Delete    | Remove a template              |
| List      | List all templates             |
| Publish   | Publish a template             |
| Duplicate | Duplicate an existing template |

</details>

<details>
<summary><strong>🌐 Domain Operations</strong></summary>

| Operation | Description                 |
| --------- | --------------------------- |
| Create    | Add a sending domain        |
| Get       | Retrieve domain details     |
| Verify    | Trigger domain verification |
| Update    | Modify domain settings      |
| Delete    | Remove a domain             |
| List      | List all domains            |

</details>

<details>
<summary><strong>🔑 API Key Operations</strong></summary>

| Operation | Description            |
| --------- | ---------------------- |
| Create    | Generate a new API key |
| Delete    | Revoke an API key      |
| List      | List all API keys      |

</details>

<details>
<summary><strong>🔗 Webhook Operations</strong></summary>

| Operation | Description               |
| --------- | ------------------------- |
| Create    | Create a webhook endpoint |
| Get       | Retrieve webhook details  |
| Update    | Modify webhook settings   |
| Delete    | Remove a webhook          |
| List      | List all webhooks         |

</details>

### Trigger Events

The **Resend Trigger** node receives real-time webhooks for email events. Signatures are automatically verified using Svix.

| Event                    | Description                  |
| ------------------------ | ---------------------------- |
| `email.sent`             | Email sent to recipient      |
| `email.delivered`        | Email delivered successfully |
| `email.delivery_delayed` | Email delivery delayed       |
| `email.bounced`          | Email bounced                |
| `email.clicked`          | Link clicked in email        |
| `email.complained`       | Spam complaint received      |
| `email.failed`           | Email failed to send         |
| `email.opened`           | Recipient opened the email   |
| `email.received`         | Inbound email received       |
| `email.scheduled`        | Email scheduled for sending  |
| `email.suppressed`       | Email suppressed (blocked)   |
| `contact.created`        | New contact added            |
| `contact.updated`        | Contact modified             |
| `contact.deleted`        | Contact removed              |
| `domain.created`         | New domain added             |
| `domain.updated`         | Domain modified              |
| `domain.deleted`         | Domain removed               |

---

## 🛠️ Development

### Prerequisites

- Node.js >= 20.15
- npm or pnpm

### Setup

```bash
git clone https://github.com/Everyday-Workflows/n8n-nodes-resend-full.git
cd n8n-nodes-resend-full
npm install
```

### Build

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Linting

```bash
npm run lint
npm run lintfix
```

### Formatting

```bash
npm run format
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contributions

- **Bug Reports**: [Open an issue](https://github.com/Everyday-Workflows/n8n-nodes-resend-full/issues)
- **Feature Requests**: [Open an issue](https://github.com/Everyday-Workflows/n8n-nodes-resend-full/issues)
- **Pull Requests**: [Submit a PR](https://github.com/Everyday-Workflows/n8n-nodes-resend-full/pulls)

---

## 📋 Limitations

- Maximum email size: 40MB (including attachments)
- Attachments not supported with scheduled emails
- AI Agent support requires n8n v1.79.0+

---

## 🔗 Resources

- [Resend API Documentation](https://resend.com/docs/api-reference)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [GitHub Repository](https://github.com/Everyday-Workflows/n8n-nodes-resend-full)
- [Issue Tracker](https://github.com/Everyday-Workflows/n8n-nodes-resend-full/issues)

---

## 📄 License

[MIT](LICENSE.md) © 2026 Everyday Workflows

---

<p align="center">
  Built with ❤️ by <a href="https://everydayworkflows.com">Everyday Workflows</a>
</p>

<p align="center">
  <a href="https://github.com/Everyday-Workflows/n8n-nodes-resend-full">GitHub</a> •
  <a href="https://github.com/Everyday-Workflows/n8n-nodes-resend-full/issues">Issues</a> •
  <a href="https://resend.com/docs">Resend Docs</a>
</p>
