import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SalesIoApi implements ICredentialType {
	name = 'salesIoApi';

	displayName = 'SD Labs (Sales-IO) API';

	documentationUrl = 'httprequest';

	httpRequestNode = {
		name: 'SD Labs',
		docsUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/',
		apiBaseUrlPlaceholder: 'http://localhost:8085',
	};

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://localhost:8085',
			placeholder: 'http://localhost:8085',
			required: true,
			description: 'Sales-IO backend origin, with no trailing slash',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			placeholder: 'sk_user_…',
			description: 'Create with POST /user/api-keys while signed in. Sent as X-Api-Key.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Api-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}'.replace(/\/$/, ''),
			url: '/credits',
		},
	};
}
