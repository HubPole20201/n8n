import type { IExecuteFunctions, INodeType } from 'n8n-workflow';

import { SD_LABS_MODULE_BY_NAME } from './catalog';
import { createSdLabsDescription } from './createSdLabsNode';
import { executeSdLabs } from './GenericFunctions';

const mod = SD_LABS_MODULE_BY_NAME.sdLabsEmailTools;

export class SdLabsEmailTools implements INodeType {
	description = createSdLabsDescription(mod);

	async execute(this: IExecuteFunctions) {
		return await executeSdLabs.call(this, mod.tools);
	}
}
