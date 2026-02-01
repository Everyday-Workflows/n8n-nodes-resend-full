import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest, assertHttpsEndpoint } from '../../transport';
import { webhookEventOptions } from './index';

export const description: INodeProperties[] = [
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		placeholder: '4dd369bc-aa82-4ff3-97de-514ae3000ee0',
		displayOptions: {
			show: {
				resource: ['webhooks'],
				operation: ['update'],
			},
		},
		description: 'The unique identifier of the webhook to update. Obtain from the Create Webhook response or List Webhooks operation.',
	},
	{
		displayName: 'Update Fields',
		name: 'webhookUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhooks'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Webhook URL',
				name: 'endpoint',
				type: 'string',
				default: '',
				placeholder: 'https://example.com/webhooks/resend',
				description: 'New HTTPS URL where Resend will send webhook event notifications. Must be accessible from the internet.',
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				default: ['email.sent'],
				options: webhookEventOptions,
				description: 'Update which email events should trigger webhook notifications',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: 'enabled',
				options: [
					{ name: 'Enabled', value: 'enabled' },
					{ name: 'Disabled', value: 'disabled' },
				],
				description: 'Enable or disable the webhook. Disabled webhooks will not receive any event notifications.',
			},
		],
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const webhookId = this.getNodeParameter('webhookId', index) as string;
	const updateFields = this.getNodeParameter('webhookUpdateFields', index, {}) as {
		endpoint?: string;
		events?: string[];
		status?: string;
	};

	if (updateFields.endpoint) {
		assertHttpsEndpoint(updateFields.endpoint);
	}

	// Map 'endpoint' to 'url' for the Resend API
	const body: {
		url?: string;
		events?: string[];
		status?: string;
	} = {};

	if (updateFields.endpoint) {
		body.url = updateFields.endpoint;
	}
	if (updateFields.events) {
		body.events = updateFields.events;
	}
	if (updateFields.status) {
		body.status = updateFields.status;
	}

	const response = await apiRequest.call(this, 'PATCH', `/webhooks/${webhookId}`, body);

	return [{ json: response }];
}
