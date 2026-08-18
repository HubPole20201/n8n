import type { INodeProperties, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

import type { SdLabsModule } from './catalog';

const ACRONYMS: Record<string, string> = {
	ab: 'A/B',
	ai: 'AI',
	api: 'API',
	csv: 'CSV',
	cta: 'CTA',
	dm: 'DM',
	g2: 'G2',
	hq: 'HQ',
	json: 'JSON',
	linkedin: 'LinkedIn',
	roi: 'ROI',
	sow: 'SOW',
	ssl: 'SSL',
	utm: 'UTM',
};

export function titleFromSlug(slug: string): string {
	return slug
		.split('-')
		.map((word) => ACRONYMS[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function createSdLabsDescription(mod: SdLabsModule): INodeTypeDescription {
	const emailGetSlugs = mod.tools.filter((tool) => tool.emailQuery).map((tool) => tool.slug);

	const properties: INodeProperties[] = [
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			options: mod.tools.map((tool) => ({
				name: titleFromSlug(tool.slug),
				value: tool.slug,
				description: `${tool.summary} (${tool.credits} credit${tool.credits === 1 ? '' : 's'})`,
				action: tool.summary,
			})),
			default: mod.tools[0].slug,
		},
	];

	if (emailGetSlugs.length > 0) {
		properties.push({
			displayName: 'Email',
			name: 'email',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'person@company.com',
			description: 'Email address to look up',
			displayOptions: {
				show: {
					operation: emailGetSlugs,
				},
			},
		});
	}

	properties.push({
		displayName: 'Request Body',
		name: 'body',
		type: 'json',
		default: '{}',
		description:
			'JSON sent to Sales-IO. For GET list/status use query fields here. For get/update/delete include "id" or "jobId" when the path needs it.',
		displayOptions:
			emailGetSlugs.length > 0
				? {
						hide: {
							operation: emailGetSlugs,
						},
					}
				: undefined,
	});

	return {
		displayName: mod.displayName,
		name: mod.name,
		icon: 'file:sdLabs.svg',
		iconColor: 'orange',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: mod.description,
		defaults: {
			name: mod.displayName,
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'salesIoApi',
				required: true,
			},
		],
		codex: {
			categories: ['Sales', 'Marketing'],
			alias: ['sd labs', 'sdlabs', 'sales-io', 'sales io', 'salesio', ...mod.aliases],
		},
		properties,
	};
}
