const { rest } = window.MockServiceWorker;
import { umbUsersData } from '../../data/user.data.js';
import { slug } from './slug.js';
import { umbracoPath } from '@umbraco-cms/backoffice/utils';

export const handlers = [
	rest.get(umbracoPath(`${slug}/current`), (_req, res, ctx) => {
		const loggedInUser = umbUsersData.getCurrentUser();
		return res(ctx.status(200), ctx.json(loggedInUser));
	}),
];