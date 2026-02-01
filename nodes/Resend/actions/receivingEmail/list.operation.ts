import type { IExecuteFunctions, INodeExecutionData, INodeProperties, IDataObject } from 'n8n-workflow';
import { requestList, createListExecutionData, apiRequest } from '../../transport';

export const description: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['receivingEmail'],
				operation: ['list'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['receivingEmail'],
				operation: ['list'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['receivingEmail'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'After',
				name: 'after',
				type: 'string',
				default: '',
				description: 'Cursor for pagination - ID of the last item from the previous page. Use this to fetch the next page of results.',
			},
			{
				displayName: 'Before',
				name: 'before',
				type: 'string',
				default: '',
				description: 'Cursor for pagination - ID of the first item from the next page. Use this to fetch the previous page of results.',
			},
		],
	},
];

export async function execute(this: IExecuteFunctions): Promise<INodeExecutionData[]> {
	const additionalFields = this.getNodeParameter('additionalFields', 0, {}) as {
		after?: string;
		before?: string;
	};

	// If manual pagination parameters are provided, use apiRequest directly
	if (additionalFields.after || additionalFields.before) {
		const returnAll = this.getNodeParameter('returnAll', 0, false) as boolean;
		const limit = this.getNodeParameter('limit', 0, 100) as number;

		const qs: Record<string, string | number> = {
			limit: returnAll ? 100 : limit,
		};

		if (additionalFields.after) {
			qs.after = additionalFields.after;
		}

		if (additionalFields.before) {
			qs.before = additionalFields.before;
		}

		const response = await apiRequest.call(this, 'GET', '/emails/receiving', undefined, qs);
		const items = Array.isArray((response as { data?: unknown[] }).data)
			? ((response as { data?: unknown[] }).data as IDataObject[])
			: [];

		return createListExecutionData.call(this, items);
	}

	// Otherwise use automatic pagination
	const items = await requestList.call(this, '/emails/receiving');
	return createListExecutionData.call(this, items);
}
