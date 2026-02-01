# Workflow Failure Notification Template

This template is designed to send automated alerts when n8n workflows fail during execution.

## Template Variables

When using this template, provide the following variables:

| Variable        | Type   | Description                        | Example                                   |
| --------------- | ------ | ---------------------------------- | ----------------------------------------- |
| `workflow_name` | string | Name of the failed workflow        | `"Data Sync Workflow"`                    |
| `execution_url` | string | URL to the failed execution in n8n | `"https://n8n.example.com/execution/123"` |
| `error_message` | string | The error message                  | `"Connection timeout to database"`        |
| `failed_node`   | string | Name of the node that failed       | `"HTTP Request"`                          |
| `stack_trace`   | string | Full error stack trace             | `"Error: Connection timeout\n    at..."`  |

## Usage with n8n-nodes-resend-full

### Option 1: Using the Template (Recommended)

1. **Create the template in Resend**:

   ```bash
   # Via Resend Dashboard or API
   # Template Name: "Workflow Failure Notification"
   # Subject: "⚠️ Workflow Failed: {{workflow_name}}"
   ```

2. **Send email using the template**:
   ```javascript
   {
     "resource": "email",
     "operation": "send",
     "from": "alerts@everydayworkflows.com",
     "to": "devops@everydayworkflows.com",
     "templateId": "your_template_id",
     "variables": {
       "workflow_name": "Data Sync Workflow",
       "execution_url": "https://n8n.example.com/execution/123",
       "error_message": "Connection timeout to database",
       "failed_node": "HTTP Request",
       "stack_trace": "Error: Connection timeout\n    at..."
     }
   }
   ```

### Option 2: Using HTML Directly

```javascript
{
  "resource": "email",
  "operation": "send",
  "from": "alerts@everydayworkflows.com",
  "to": "devops@everydayworkflows.com",
  "subject": "⚠️ Workflow Failed: Data Sync Workflow",
  "html": "<!-- Paste the HTML from workflow-failure-notification.html -->",
  "variables": {
    "workflow_name": "Data Sync Workflow",
    "execution_url": "https://n8n.example.com/execution/123",
    "error_message": "Connection timeout to database",
    "failed_node": "HTTP Request",
    "stack_trace": "Error: Connection timeout\n    at..."
  }
}
```

## n8n Workflow Example

Here's a complete n8n workflow setup:

### 1. Error Trigger Node

- **Node**: Error Trigger (built-in n8n node)
- **Output**: Provides execution data including error details

### 2. Resend Node Configuration

```
Resource: Email
Operation: Send
From: alerts@everydayworkflows.com
To: devops@everydayworkflows.com
Subject: ⚠️ Workflow Failed: {{$json.workflow.name}}
Template ID: your_template_id (or use HTML field)
Variables:
  - workflow_name: {{$json.workflow.name}}
  - execution_url: {{$json.execution.url}}
  - error_message: {{$json.execution.error.message}}
  - failed_node: {{$json.execution.lastNodeExecuted}}
  - stack_trace: {{$json.execution.error.stack}}
```

### 3. Complete JSON Example

```json
{
	"nodes": [
		{
			"name": "Error Trigger",
			"type": "n8n-nodes-base.errorTrigger",
			"position": [250, 300]
		},
		{
			"name": "Send Failure Alert",
			"type": "n8n-nodes-resend-full.resend",
			"position": [450, 300],
			"parameters": {
				"resource": "email",
				"operation": "send",
				"from": "alerts@everydayworkflows.com",
				"to": "devops@everydayworkflows.com",
				"subject": "⚠️ Workflow Failed: {{$json.workflow.name}}",
				"templateId": "your_template_id",
				"variables": {
					"workflow_name": "={{$json.workflow.name}}",
					"execution_url": "={{$json.execution.url}}",
					"error_message": "={{$json.execution.error.message}}",
					"failed_node": "={{$json.execution.lastNodeExecuted}}",
					"stack_trace": "={{$json.execution.error.stack}}"
				}
			}
		}
	]
}
```

## Customization

### Change Colors

- **Alert color**: `#e53e3e` (red) → Change to your brand color
- **Header background**: `#1a202c` (dark) → Change to your header color
- **Button background**: `#e53e3e` (red) → Change to your button color

### Add Recipient Variables

Add more variables to the template:

```html
<span style="font-size: 15px; color: #2d3748;">Environment: {{environment}}</span>
<span style="font-size: 15px; color: #2d3748;">Severity: {{severity}}</span>
```

### Conditional Sections

Use Resend's conditional rendering:

```html
{{#if is_critical}}
<div style="background-color: #fff5f5; border-left: 4px solid #e53e3e; padding: 12px;">
	<strong>CRITICAL:</strong> This failure requires immediate attention.
</div>
{{/if}}
```

## Testing

Test the template with sample data:

```javascript
{
  "workflow_name": "Test Workflow",
  "execution_url": "https://n8n.example.com/execution/test-123",
  "error_message": "Test error message",
  "failed_node": "Test Node",
  "stack_trace": "Error: Test error\n    at test.js:10:5"
}
```

## Best Practices

1. **Use Template ID**: Store the template in Resend for better maintainability
2. **Rate Limiting**: Don't send alerts for every error - use aggregation
3. **Severity Levels**: Add severity levels to prioritize alerts
4. **Environment Context**: Include environment (dev/staging/prod) in alerts
5. **Actionable Links**: Always include direct links to the failed execution

## Troubleshooting

### Variables Not Replacing

- Ensure variable names match exactly (case-sensitive)
- Check that you're using the correct template ID
- Verify the template was published in Resend

### Styling Issues

- Test in multiple email clients (Gmail, Outlook, Apple Mail)
- Use inline styles (as shown) for maximum compatibility
- Avoid CSS animations or complex layouts

### Links Not Working

- Ensure execution URLs are publicly accessible
- Check that n8n instance URL is correct
- Verify n8n authentication settings for external access
