import type { IDataObject, IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'Domain Name',
		name: 'domainName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'example.com',
		displayOptions: {
			show: {
				resource: ['domains'],
				operation: ['create'],
			},
		},
		description: 'The domain name to add to Resend (e.g., example.com). After adding, you must configure DNS records to verify ownership before sending emails.',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['domains'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Click Tracking',
				name: 'click_tracking',
				type: 'boolean',
				default: false,
				description: 'Whether to track clicks within the body of each HTML email sent from this domain',
			},
			{
				displayName: 'Custom Return Path',
				name: 'custom_return_path',
				type: 'string',
				default: 'send',
				description: 'Custom subdomain for email bounce handling (Return-Path address). Defaults to "send". This subdomain needs to be configured in your DNS.',
			},
			{
				displayName: 'Open Tracking',
				name: 'open_tracking',
				type: 'boolean',
				default: false,
				description: 'Whether to track the open rate of each email sent from this domain',
			},
			{
				displayName: 'Region',
				name: 'region',
				type: 'options',
				options: [
					{ name: 'US East 1', value: 'us-east-1' },
					{ name: 'EU West 1', value: 'eu-west-1' },
					{ name: 'South America East 1', value: 'sa-east-1' },
					{ name: 'Asia Pacific Northeast 1', value: 'ap-northeast-1' },
				],
				default: 'us-east-1',
				description: 'The AWS region where emails will be sent from. Choose a region closest to your recipients for better deliverability.',
			},
			{
				displayName: 'TLS',
				name: 'tls',
				type: 'options',
				options: [
					{ name: 'Opportunistic', value: 'opportunistic' },
					{ name: 'Enforced', value: 'enforced' },
				],
				default: 'opportunistic',
				description: 'Configures TLS for email communication. Opportunistic uses TLS when available, Enforced requires TLS for all emails.',
			},
		],
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const name = this.getNodeParameter('domainName', index) as string;
	const additionalOptions = this.getNodeParameter('additionalOptions', index, {}) as {
		region?: string;
		custom_return_path?: string;
		tls?: string;
		open_tracking?: boolean;
		click_tracking?: boolean;
	};

	const body: IDataObject = { name };

	if (additionalOptions.region) {
		body.region = additionalOptions.region;
	}
	if (additionalOptions.custom_return_path) {
		body.custom_return_path = additionalOptions.custom_return_path;
	}
	if (additionalOptions.tls) {
		body.tls = additionalOptions.tls;
	}
	if (additionalOptions.open_tracking !== undefined) {
		body.open_tracking = additionalOptions.open_tracking;
	}
	if (additionalOptions.click_tracking !== undefined) {
		body.click_tracking = additionalOptions.click_tracking;
	}

	const response = await apiRequest.call(this, 'POST', '/domains', body);

	return [{ json: response }];
}
