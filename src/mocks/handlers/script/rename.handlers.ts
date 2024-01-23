const { rest } = window.MockServiceWorker;
import { umbScriptMockDb } from '../../data/script/script.db.js';
import { UMB_SLUG } from './slug.js';
import { RenameStylesheetRequestModel } from '@umbraco-cms/backoffice/backend-api';
import { umbracoPath } from '@umbraco-cms/backoffice/utils';

export const renameHandlers = [
	rest.put(umbracoPath(`${UMB_SLUG}/:path/rename`), async (req, res, ctx) => {
		const path = req.params.path as string;
		if (!path) return res(ctx.status(400));

		const requestBody = (await req.json()) as RenameStylesheetRequestModel;
		if (!requestBody) return res(ctx.status(400, 'no body found'));

		const newPath = umbScriptMockDb.file.rename(decodeURIComponent(path), requestBody.name);
		const encodedPath = encodeURIComponent(newPath);

		return res(
			ctx.status(201),
			ctx.set({
				Location: req.url.href + '/' + encodedPath,
				'Umb-Generated-Resource': encodedPath,
			}),
		);
	}),
];