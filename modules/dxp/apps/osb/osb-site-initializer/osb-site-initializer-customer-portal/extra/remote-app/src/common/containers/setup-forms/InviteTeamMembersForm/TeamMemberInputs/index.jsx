/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayAlert from '@clayui/alert';
import {ClayInput} from '@clayui/form';
import {useEffect, useMemo, useState} from 'react';
import useProvisioningLicenseKeys from '~/common/hooks/useProvisioningLicenseKeys';
import i18n from '../../../../I18n';
import {Input, Select} from '../../../../components';
import useBannedDomains from '../../../../hooks/useBannedDomains';
import {ROLE_TYPES} from '../../../../utils/constants/';
import {liferayDomains} from '../../../../utils/constants/liferayDomains';
import {
	isLiferayDomain,
	isValidEmail,
} from '../../../../utils/validations.form';

const FETCH_DELAY_AFTER_TYPING = 500;

const TeamMemberInputs = ({
	administratorsAssetsAvailable,
	disableError,
	id,
	invite,
	onSelectRole,
	options,
	placeholderEmail,
	selectOnChange,
}) => {
	const provisioningService = useProvisioningLicenseKeys();

	const [warningMessage, setWarningMessage] = useState();

	const bannedDomains = useBannedDomains(
		invite?.email,
		FETCH_DELAY_AFTER_TYPING
	);

	const validateEmail = useMemo(async () => {
		const [, domain] = invite?.email.split('@');

		if (isValidEmail(invite?.email, bannedDomains)) {
			return isValidEmail(invite?.email, bannedDomains);
		}

		const hasLiferayDomain = liferayDomains.includes(domain);

		if (hasLiferayDomain) {
			const emailExistsInOkta = await provisioningService.getUserInOkta(
				invite?.email
			);
			if (!emailExistsInOkta) {
				return isLiferayDomain(invite?.email);
			}

			return false;
		}
	}, [bannedDomains, invite?.email, provisioningService]);

	const isAdministratorOrRequestorRoleSelected =
		invite?.role?.name === ROLE_TYPES.requester.name ||
		invite?.role?.name === ROLE_TYPES.admin.name;

	useEffect(() => {
		onSelectRole(isAdministratorOrRequestorRoleSelected);
	}, [onSelectRole, isAdministratorOrRequestorRoleSelected]);

	const optionsFormated = useMemo(
		() =>
			options.map((option) => {
				const isAdministratorOrRequestorRole =
					option.label === ROLE_TYPES.requester.name ||
					option.label === ROLE_TYPES.admin.name;

				return {
					...option,
					disabled:
						administratorsAssetsAvailable !== -1 &&
						administratorsAssetsAvailable === 0 &&
						isAdministratorOrRequestorRole &&
						!isAdministratorOrRequestorRoleSelected,
				};
			}),
		[
			administratorsAssetsAvailable,
			isAdministratorOrRequestorRoleSelected,
			options,
		]
	);

	return (
		<>
			<ClayInput.Group className="m-0">
				<ClayInput.GroupItem className="m-0">
					<Input
						disableError={id === 0 && disableError}
						groupStyle="m-0"
						label={i18n.translate('first-name')}
						name={`invites[${id}].givenName`}
						placeholder={i18n.translate('first-name')}
						required
						type="text"
					/>
				</ClayInput.GroupItem>

				<ClayInput.GroupItem className="m-0">
					<Input
						disableError={id === 0 && disableError}
						groupStyle="m-0"
						label={i18n.translate('last-name')}
						name={`invites[${id}].familyName`}
						placeholder={i18n.translate('last-name')}
						required
						type="text"
					/>
				</ClayInput.GroupItem>
			</ClayInput.Group>

			<ClayInput.Group className="m-0">
				<ClayInput.GroupItem className="m-0">
					<Input
						disableError={id === 0 && disableError}
						groupStyle="m-0"
						label={i18n.translate('email')}
						name={`invites[${id}].email`}
						placeholder={placeholderEmail}
						required
						type="email"
						validations={[() => validateEmail]}
					/>
				</ClayInput.GroupItem>

				<ClayInput.GroupItem className="m-0">
					<Select
						groupStyle="m-0"
						label={i18n.translate('role1')}
						name={`invites[${id}].role.id`}
						onChange={(event) => selectOnChange(event.target.value)}
						options={optionsFormated}
						required
					/>
				</ClayInput.GroupItem>
			</ClayInput.Group>

			<ClayAlert
				className="mx-3 p-2 text-paragraph-xs"
				displayType="warning"
			>
				<>
					{i18n.sub(
						'is-x-part-of-your-organization-it-looks-like-x-is-a-new-domain-name',
						['email address entered by the user', 'email domain']
					)}

					<ul>
						<li>
							{i18n.sub(
								'to-update-an-existing-users-email-address-have-the-user-log-in-with-their-current-address-to-access-x',
								['email address entered by the user']
							)}
						</li>

						<li>
							{i18n.translate(
								'be-aware-that-adding-new-users-from-outside-your-organization-may-compromise-the-security-of-your-project'
							)}
						</li>
					</ul>
				</>
			</ClayAlert>
			<hr className="mb-3 mt-2" />
		</>
	);
};

export default TeamMemberInputs;
