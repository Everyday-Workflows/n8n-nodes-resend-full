<h1 align="center">
  <br>
  <a href="/"><img src=".github/media/resend-header.png" alt="n8n-nodes-resend" width="900"></a>
  <br>
</h1>

<p align="center">
	<a href="https://www.npmjs.com/package/n8n-nodes-resend-full"><img alt="NPM Version" src="https://img.shields.io/npm/v/n8n-nodes-resend-full"></a>
	<a href="https://www.npmjs.com/package/n8n-nodes-resend-full"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/n8n-nodes-resend-full"></a>
	<img alt="GitHub License" src="https://img.shields.io/github/license/Everyday-Workflows/n8n-nodes-resend-full">
</p>

<p align="center">
  <a href="#installation">Installation</a> |
  <a href="#credentials">Credentials</a> |
  <a href="#human-in-the-loop">Human in the Loop</a> |
  <a href="#ai-agent-tool-support">AI Agent Tool Support</a> |
  <a href="#resources">Resources</a> |
  <a href="#trigger-events">Trigger Events</a> |
  <a href="#development">Development</a>
</p>

---

A community node for [n8n](https://n8n.io) that integrates with the [Resend](https://resend.com) email API. Send emails, manage contacts, handle domains, and receive webhooks.

## API Coverage

Comprehensive coverage of the Resend API (v1.1.0). The table below shows which endpoints are currently implemented:

| API Resource           | Endpoint                   | Status  | Operations                                                                                                       |
| ---------------------- | -------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| **Email**              | `/emails`                  | ✅ Full | Send, Send Batch, Send and Wait, List, Get, Update, Cancel, List Attachments, Get Attachment                     |
| **Receiving Emails**   | `/emails/receiving`        | ✅ Full | List, Get, List Attachments, Get Attachment                                                                      |
| **Domains**            | `/domains`                 | ✅ Full | Create, List, Get, Update, Delete, Verify                                                                        |
| **API Keys**           | `/api-keys`                | ✅ Full | Create, List, Delete                                                                                             |
| **Templates**          | `/templates`               | ✅ Full | Create, List, Get, Update, Delete, Publish, Duplicate                                                            |
| **Audiences**          | `/audiences`               | ✅ Full | Create, List, Get, Delete                                                                                        |
| **Contacts**           | `/audiences/{id}/contacts` | ✅ Full | Create, List, Get, Update, Delete, Add to Segment, List Segments, Remove from Segment, Get Topics, Update Topics |
| **Broadcasts**         | `/broadcasts`              | ✅ Full | Create, List, Get, Update, Delete, Send                                                                          |
| **Segments**           | `/segments`                | ✅ Full | Create, List, Get, Delete                                                                                        |
| **Topics**             | `/topics`                  | ✅ Full | Create, List, Get, Update, Delete                                                                                |
| **Contact Properties** | `/contact-properties`      | ✅ Full | Create, List, Get, Update, Delete                                                                                |
| **Webhooks**           | `/webhooks`                | ✅ Full | Create, List, Get, Update, Delete                                                                                |

## Installation

To install this node, you can use the n8n community nodes interface or run the following command in your n8n installation directory:

```bash
npm install n8n-nodes-resend-full
```

For development, you can clone the repository and link it locally:

```bash
git clone https://github.com/Everyday-Workflows/n8n-nodes-resend-full.git
cd n8n-nodes-resend-full
npm install
npm run build
npm link
```

### Docker

```bash
docker run -it --rm \
  -p 5678:5678 \
  -e N8N_NODES_INCLUDE=n8n-nodes-resend \
  n8nio/n8n
```

## Credentials

1. Get your API key from [Resend Dashboard](https://resend.com/api-keys)
2. In n8n, go to **Credentials** > **Add credential**
3. Search for **Resend API** and paste your key

## Human in the Loop

The **Send and Wait for Response** operation enables human-in-the-loop workflows. Send an email and pause the workflow until the recipient responds via approval buttons or a form.

### Features

- **Approval Workflows**: Send emails with Approve/Decline buttons for quick decisions
- **Free Text Responses**: Collect text input via a response form
- **Configurable Wait Time**: Set a timeout or wait indefinitely
- **Secure Callbacks**: Responses use signed URLs for security

### How to Use

1. In the node panel, go to **Human in the Loop** > **Resend**
2. Or select **Email** resource > **Send and Wait for Response** operation

### Configuration Options

| Option                   | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| **Response Type**        | Choose between Approval (buttons) or Free Text (form)    |
| **Approval Type**        | Single button (Approve only) or Double (Approve/Decline) |
| **Button Labels**        | Customize the button text                                |
| **Button Styles**        | Primary or Secondary styling                             |
| **Message Button Label** | Label for the form link button (Free Text mode)          |
| **Response Form Title**  | Title shown on the response form                         |
| **Limit Wait Time**      | Set a timeout for the wait period                        |

## AI Agent Tool Support

This node is **AI Agent compatible** and can be used directly by n8n AI agents (requires n8n v1.79.0+).

### Features

- **Automatic Tool Discovery**: AI agents can discover and use all Resend operations
- **Dynamic Parameters**: Use `$fromAI()` to let agents provide values at runtime
- **Natural Language**: Agents understand operation descriptions and parameters
- **Full API Coverage**: All 12 resources available to AI agents

### Requirements

1. **n8n Version**: 1.79.0 or higher
2. **Environment Variable**: Set `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true`
3. **AI Agent Node**: Connect Resend node to an AI Agent workflow

### Using $fromAI() for Dynamic Parameters

The `$fromAI()` function allows AI agents to provide parameter values dynamically:

```javascript
// Example: Let AI agent determine recipient email
{{ $fromAI('to', 'The recipient email address', 'string') }}

// Example: Let AI agent write email subject
{{ $fromAI('subject', 'Email subject line', 'string') }}

// Example: Let AI agent compose email body
{{ $fromAI('html', 'HTML email content', 'string') }}
```

### Example AI Agent Workflow

1. Add an **AI Agent** node to your workflow
2. Connect the **Resend** node as a tool
3. Configure the Resend node with `$fromAI()` for dynamic fields:
   - **To**: `{{ $fromAI('to', 'Recipient email address', 'string') }}`
   - **Subject**: `{{ $fromAI('subject', 'Email subject', 'string') }}`
   - **HTML**: `{{ $fromAI('html', 'Email body in HTML', 'string') }}`
4. The AI agent will automatically fill these values based on context

### Available Operations for AI Agents

All operations are available with enhanced descriptions for AI understanding:

- **Email**: Send, send batch, list, get, cancel, update
- **Templates**: Create, update, publish, duplicate, delete
- **Contacts**: Create, update, delete, manage segments and topics
- **Broadcasts**: Create, send, update, delete campaigns
- **Domains**: Add, verify, update sending domains
- **Webhooks**: Create, update, delete event listeners
- **And 6 more resources** (Audiences, Segments, Topics, API Keys, Contact Properties, Receiving Emails)

### Best Practices

1. **Use Descriptive Prompts**: Help the AI understand what you want to accomplish
2. **Validate Outputs**: Review AI-generated emails before sending
3. **Set Constraints**: Use validation rules for critical fields like email addresses
4. **Test First**: Use test mode or sandbox environments when possible

## Resources

- [Resend API Documentation](https://resend.com/docs/api-reference)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [GitHub Repository](https://github.com/Everyday-Workflows/n8n-nodes-resend-full)
- [Issue Tracker](https://github.com/Everyday-Workflows/n8n-nodes-resend-full/issues)

### Email

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

### Receiving Email

| Operation        | Description                                     |
| ---------------- | ----------------------------------------------- |
| List             | List all received emails                        |
| Get              | Retrieve a received email by ID                 |
| List Attachments | List attachments for a received email           |
| Get Attachment   | Get a specific attachment from a received email |

### Audience

| Operation | Description             |
| --------- | ----------------------- |
| Create    | Create a new audience   |
| Get       | Retrieve audience by ID |
| Delete    | Delete an audience      |
| List      | List all audiences      |

### Contact

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

### Contact Property

| Operation | Description                      |
| --------- | -------------------------------- |
| Create    | Create a custom contact property |
| Get       | Retrieve property details        |
| Update    | Modify property settings         |
| Delete    | Remove a property                |
| List      | List all contact properties      |

### Segment

| Operation | Description                                          |
| --------- | ---------------------------------------------------- |
| Create    | Create a new segment with optional filter conditions |
| Get       | Retrieve segment details                             |
| Delete    | Remove a segment                                     |
| List      | List all segments                                    |

### Topic

| Operation | Description                 |
| --------- | --------------------------- |
| Create    | Create a subscription topic |
| Get       | Retrieve topic details      |
| Update    | Modify topic settings       |
| Delete    | Remove a topic              |
| List      | List all topics             |

### Broadcast

| Operation | Description                   |
| --------- | ----------------------------- |
| Create    | Create an email campaign      |
| Get       | Retrieve broadcast details    |
| Send      | Send a broadcast to a segment |
| Update    | Modify broadcast settings     |
| Delete    | Remove a broadcast            |
| List      | List all broadcasts           |

### Template

| Operation | Description                    |
| --------- | ------------------------------ |
| Create    | Create an email template       |
| Get       | Retrieve template details      |
| Update    | Modify a template              |
| Delete    | Remove a template              |
| List      | List all templates             |
| Publish   | Publish a template             |
| Duplicate | Duplicate an existing template |

### Domain

| Operation | Description                 |
| --------- | --------------------------- |
| Create    | Add a sending domain        |
| Get       | Retrieve domain details     |
| Verify    | Trigger domain verification |
| Update    | Modify domain settings      |
| Delete    | Remove a domain             |
| List      | List all domains            |

### API Key

| Operation | Description            |
| --------- | ---------------------- |
| Create    | Generate a new API key |
| Delete    | Revoke an API key      |
| List      | List all API keys      |

### Webhook

| Operation | Description               |
| --------- | ------------------------- |
| Create    | Create a webhook endpoint |
| Get       | Retrieve webhook details  |
| Update    | Modify webhook settings   |
| Delete    | Remove a webhook          |
| List      | List all webhooks         |

## Trigger Events

The **Resend Trigger** node receives webhooks for real-time email events. Signatures are automatically verified using Svix.

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

## Limitations

- Maximum email size: 40MB (including attachments)
- Attachments not supported with scheduled emails

## Development

```bash
git clone https://github.com/Everyday-Workflows/n8n-nodes-resend-full.git
cd n8n-nodes-resend-full
npm install
npm run build
npm run lint
```

## License

[MIT](LICENSE.md)

## Acknowledgments

Enhanced with contributions from [jannispkz/n8n-nodes-resend-complete](https://github.com/jannispkz/n8n-nodes-resend-complete).

---

<p align="center">
  <a href="https://github.com/Everyday-Workflows/n8n-nodes-resend-full">GitHub</a> |
  <a href="https://github.com/Everyday-Workflows/n8n-nodes-resend-full/issues">Issues</a> |
  <a href="https://resend.com/docs">Resend Docs</a>
</p>
