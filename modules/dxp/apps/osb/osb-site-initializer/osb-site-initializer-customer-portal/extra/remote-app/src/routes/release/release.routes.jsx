/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {useCallback, useEffect, useState} from 'react';

import {HashRouter, Route, Routes} from 'react-router-dom';
import ReleaseDrop from './ReleaseDrop/ReleaseDrop';
import {useVocabulariesCategories} from './hooks/useVocabulariesCategories';

function ReleaseRoutes() {
	const [releaseNotes, setReleaseNotes] = useState(null);

	const reponse = useVocabulariesCategories();

	const fetchData = useCallback(async () => {
		try {
			if (!releaseNotes) {
				const response = await reponse;
				setReleaseNotes(response);
			}
		} catch (error) {
			console.error('Error fetching release notes:', error);
		}
	}, [releaseNotes, reponse]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<HashRouter>
			<Routes>
				<Route
					element={<ReleaseDrop releaseNotes={releaseNotes} />}
					path="/"
				>
					<Route path=":releaseName" />
				</Route>
			</Routes>
		</HashRouter>
	);
}

export default ReleaseRoutes;
