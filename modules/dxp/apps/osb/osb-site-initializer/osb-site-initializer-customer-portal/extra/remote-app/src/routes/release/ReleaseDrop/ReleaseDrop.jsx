/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {Button, DropDown} from '@clayui/core';
import ClayIcon from '@clayui/icon';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const ReleaseDrop = ({releaseNotes}) => {
	const {releaseName} = useParams();
	const [selectedRelease, setSelectedRelease] = useState(
		releaseName ? releaseName : null
	);
	const navigate = useNavigate();

	// const handleDropdownChange = (event) => {
	// 	const selectedValue = event.target.value;
	// 	setSelectedRelease(selectedValue);

	// 	if (selectedValue === 'allReleases') {
	// 		navigate('#/all-release-notes');
	// 	} else {
	// 		navigate(`#/${selectedValue}`);
	// 	}
	// };

	const handleOnSelect = (name) => {
		setSelectedRelease(name);

		if (name === 'all-releases') {
			navigate('/all-releases');
		} else {
			navigate(`/${name}`);
		}
	};

	const [active, setActive] = useState(false);

	if (!selectedRelease && releaseNotes) {
		navigate(`/${releaseNotes?.[0]?.name}`);

		return setSelectedRelease(releaseNotes?.[0]?.name);
	}

	return (
		<div>
			{/* <div className="mb-4">
				<select onChange={handleDropdownChange} value={selectedRelease}>
					{releaseNotes?.map((release) => (
						<option key={release.id} value={release.name}>
							{release.name}
						</option>
					))}

					<option value="allReleases">All Release Notes</option>
				</select>
			</div> */}

			<div>
				<DropDown
					active={active}
					closeOnClickOutside
					menuWidth="shrink"
					onActiveChange={setActive}
					trigger={
						<Button
							borderless
							className="align-items-center d-flex px-2"
							size="lg"
						>
							{
								releaseNotes?.find(
									({name}) => name === selectedRelease
								)?.name
							}

							<span className="inline-item-after">
								<ClayIcon symbol="caret-bottom" />
							</span>
						</Button>
					}
				>
					{releaseNotes?.map((item, index) => (
						<DropDown.Item
							className="pr-6"
							disabled={item.name === selectedRelease}
							key={`${index}-${index}`}
							onClick={() => {
								handleOnSelect(item.name);
								setActive(false);
							}}
							symbolRight={
								item.name === selectedRelease && 'check'
							}
						>
							{item?.name}
						</DropDown.Item>
					))}
				</DropDown>
			</div>
		</div>
	);
};

export default ReleaseDrop;
