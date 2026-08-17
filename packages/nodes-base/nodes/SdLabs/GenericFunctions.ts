import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import type { SdLabsTool } from './catalog';

const parseBody = (raw: unknown): IDataObject => {
	if (raw === undefined || raw === null || raw === '') {
		return {};
	}
	if (typeof raw === 'string') {
		const trimmed = raw.trim();
		if (!trimmed) return {};
		return JSON.parse(trimmed) as IDataObject;
	}
	if (typeof raw === 'object') {
		return raw as IDataObject;
	}
	throw new Error('Request body must be a JSON object');
};

export async function executeSdLabs(
	this: IExecuteFunctions,
	tools: SdLabsTool[],
): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const credentials = await this.getCredentials('salesIoApi');
	const baseUrl = String(credentials.baseUrl ?? '').replace(/\/+$/, '');

	if (!baseUrl) {
		throw new NodeOperationError(this.getNode(), 'SD Labs credential is missing a Base URL');
	}

	for (let i = 0; i < items.length; i++) {
		try {
			const operation = this.getNodeParameter('operation', i) as string;
			const tool = tools.find((entry) => entry.slug === operation);
			if (!tool) {
				throw new NodeOperationError(this.getNode(), `Unknown operation "${operation}"`, {
					itemIndex: i,
				});
			}

			const options: IHttpRequestOptions = {
				method: tool.method,
				url: `${baseUrl}${tool.path}`,
				json: true,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			};

			if (tool.method === 'GET') {
				options.qs = {
					email: this.getNodeParameter('email', i) as string,
				};
			} else {
				options.body = parseBody(this.getNodeParameter('body', i, {}));
			}

			const response = await this.helpers.httpRequestWithAuthentication.call(
				this,
				'salesIoApi',
				options,
			);

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(response as IDataObject),
				{ itemData: { item: i } },
			);
			returnData.push(...executionData);
		} catch (error) {
			if (this.continueOnFail()) {
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray({ error: (error as Error).message }),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
				continue;
			}
			throw error;
		}
	}

	return [returnData];
}
