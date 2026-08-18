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

const applyPathParams = (
	path: string,
	payload: IDataObject,
): { path: string; rest: IDataObject } => {
	const rest = { ...payload };
	const resolved = path.replace(/\{(\w+)\}/g, (_, key: string) => {
		const value = rest[key];
		if (value === undefined || value === null || `${value}` === '') {
			throw new Error(`Request body must include "${key}"`);
		}
		delete rest[key];
		return encodeURIComponent(String(value));
	});
	return { path: resolved, rest };
};

const toJsonPayload = (response: unknown): IDataObject => {
	if (response === undefined || response === null || response === '') {
		return { ok: true };
	}
	if (typeof response === 'string') {
		return { csv: response };
	}
	if (typeof response === 'object') {
		return response as IDataObject;
	}
	return { data: response as string | number | boolean };
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

			const payload = tool.emailQuery ? {} : parseBody(this.getNodeParameter('body', i, {}));
			const { path, rest } = applyPathParams(tool.path, payload);

			const options: IHttpRequestOptions = {
				headers: {
					Accept: tool.slug === 'export' ? 'text/csv' : 'application/json',
					'Content-Type': 'application/json',
				},
				json: tool.method !== 'DELETE' && tool.slug !== 'export',
				method: tool.method,
				url: `${baseUrl}${path}`,
			};

			if (tool.emailQuery) {
				options.qs = {
					email: this.getNodeParameter('email', i) as string,
				};
			} else if (tool.method === 'GET') {
				options.qs = rest;
			} else if (tool.method !== 'DELETE') {
				options.body = rest;
			}

			const response = await this.helpers.httpRequestWithAuthentication.call(
				this,
				'salesIoApi',
				options,
			);

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(toJsonPayload(response)),
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
