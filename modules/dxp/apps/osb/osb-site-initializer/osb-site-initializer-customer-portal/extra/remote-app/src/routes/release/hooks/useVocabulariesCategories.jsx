/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {Liferay} from '~/common/services/liferay';

const getQuarterlyReleasesVocabularyId = async () => {
	try {
		// eslint-disable-next-line @liferay/portal/no-global-fetch
		const response = await fetch(
			`/o/headless-admin-taxonomy/v1.0/sites/${themeDisplay.getSiteGroupId()}/taxonomy-vocabularies`,
			{
				headers: {
					'accept': 'application/json',
					'x-csrf-token': Liferay.authToken,
				},
				method: 'GET',
			}
		);

		if (response.status === 200) {
			const data = await response.json();

			const quarterlyReleasesId = data.items.find(
				({name}) => name === 'Quarterly Releases'
			).id;

			return quarterlyReleasesId;
		} else {
			throw new Error('Error fetching Quarterly Releases.');
		}
	} catch (error) {
		console.error(error);
		Liferay.Util.openToast({
			message: 'Unexpected error, contact an Administrator.',
			type: 'danger',
		});

		return null;
	}
};

const useVocabulariesCategories = async () => {
	const id = await getQuarterlyReleasesVocabularyId(); // verificar como colocar direto no fetch sem const
	try {
		// eslint-disable-next-line @liferay/portal/no-global-fetch
		const response = await fetch(
			`/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${id}/taxonomy-categories?sort=dateCreated%3Adesc&pageSize=4`,
			{
				headers: {
					'accept': 'application/json',
					'x-csrf-token': Liferay.authToken,
				},
				method: 'GET',
			}
		);

		if (response.status === 200) {
			const data = await response.json();

			return data.items; // fazer filtro das informacoes
		} else {
			throw new Error('Error fetching vocabulary categories');
		}
	} catch (error) {
		console.error(error);
		Liferay.Util.openToast({
			message: 'Unexpected error, contact an Administrator',
			type: 'danger',
		});

		return null;
	}
};

export {useVocabulariesCategories};
