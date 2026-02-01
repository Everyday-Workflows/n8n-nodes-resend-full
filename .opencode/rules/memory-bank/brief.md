# Project Brief

## Core Requirements
Build a comprehensive n8n community node that provides **100% coverage** of the Resend email API, enabling workflow automation for:
- Transactional email sending (single and batch)
- Contact and audience management
- Email template creation and management
- Domain configuration and verification
- Webhook event handling
- Human-in-the-loop approval workflows

## Primary Goals
1. **Complete API Coverage**: Support all 12 Resend API resources with all operations
2. **AI Agent Compatibility**: Enable AI agents to use Resend operations via `$fromAI()` dynamic parameters
3. **Developer Experience**: Provide intuitive UI with helpful descriptions and validation
4. **Reliability**: Handle errors gracefully, support `continueOnFail()`, verify webhook signatures
5. **Maintainability**: Follow n8n conventions, use TypeScript strict mode, modular architecture

## Success Criteria
- All Resend API endpoints implemented and tested
- AI agents can discover and use all operations
- Webhook signature verification prevents unauthorized access
- Send and Wait (HITL) enables approval workflows
- Published to npm as `n8n-nodes-resend`
- Compatible with n8n 2.6.0+ (AI features require 1.79.0+)

## Non-Goals
- Custom email rendering (use Resend templates)
- Email analytics beyond Resend's tracking
- Alternative email providers
- Standalone CLI tool
