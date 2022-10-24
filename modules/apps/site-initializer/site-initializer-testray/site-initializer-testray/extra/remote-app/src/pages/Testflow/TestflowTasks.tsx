/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import ClayIcon from '@clayui/icon';
import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import Avatar from '../../components/Avatar';
import AssignToMe from '../../components/Avatar/AssigneToMe';
import Code from '../../components/Code';
import Container from '../../components/Layout/Container';
import ListView from '../../components/ListView';
import Loading from '../../components/Loading';
import TaskbarProgress from '../../components/ProgressBar/TaskbarProgress';
import StatusBadge from '../../components/StatusBadge';
import QATable from '../../components/Table/QATable';
import useCaseResultGroupBy from '../../data/useCaseResultGroupBy';
import {useFetch} from '../../hooks/useFetch';
import useHeader from '../../hooks/useHeader';
import useMutate from '../../hooks/useMutate';
import i18n from '../../i18n';
import {filters} from '../../schema/filter';
import {
	TestraySubTask,
	TestrayTask,
	testrayTaskImpl,
} from '../../services/rest';
import {testraySubtaskImpl} from '../../services/rest/TestraySubtasks';
import {
	SUBTASK_STATUS,
	StatusesProgressScore,
	chartClassNames,
} from '../../util/constants';
import {getTimeFromNow} from '../../util/date';
import {assigned} from '../../util/mock';
import {searchUtil} from '../../util/search';
import useSubtasksActions from './Subtasks/useSubtasksActions';

export const progressScoreItems = [
	[StatusesProgressScore.SELF, 7000],
	[StatusesProgressScore.OTHER, 8967],
	[StatusesProgressScore.INCOMPLETE, 1000],
];

const ShortcutIcon = () => (
	<ClayIcon className="ml-2" fontSize={12} symbol="shortcut" />
);

const TestFlowTasks = () => {
	const {testrayTaskId} = useParams();
	const {updateItemFromList} = useMutate();
	const {actions, form} = useSubtasksActions();

	const {data: testrayTask, loading} = useFetch<TestrayTask>(
		testrayTaskImpl.getResource(testrayTaskId as string),
		(response) => testrayTaskImpl.transformData(response)
	);

	const {
		donut: {columns},
	} = useCaseResultGroupBy(testrayTask?.build?.id);

	const {setHeading} = useHeader({timeout: 50, useTabs: []});

	useEffect(() => {
		if (testrayTask) {
			setHeading([
				{
					category: i18n.translate('tasks'),
					title: testrayTask.name,
				},
			]);
		}
	}, [setHeading, testrayTask]);

	if (loading || !testrayTask) {
		return <Loading />;
	}

	return (
		<>
			<Container collapsable title={i18n.translate('task-details')}>
				<div className="d-flex flex-wrap">
					<div className="col-4 col-lg-4 col-md-12 p-0">
						<QATable
							items={[
								{
									title: i18n.translate('status'),
									value: (
										<StatusBadge
											type={
												(SUBTASK_STATUS as any)[
													testrayTask.dueStatus
												]?.label
											}
										>
											{
												(SUBTASK_STATUS as any)[
													testrayTask.dueStatus
												]?.label
											}
										</StatusBadge>
									),
								},
								{
									title: i18n.translate('assigned-users'),
									value: (
										<Avatar.Group
											assignedUsers={assigned}
											groupSize={3}
										/>
									),
								},
								{
									title: i18n.translate('created'),
									value: getTimeFromNow(
										testrayTask.dateCreated
									),
								},
							]}
						/>
					</div>

					<div className="col-8 col-lg-8 col-md-12 mb-3 p-0">
						<QATable
							items={[
								{
									title: i18n.translate('project-name'),
									value: (
										<Link
											className="text-dark"
											to={`/project/${testrayTask.build?.project?.id}/routines`}
										>
											{testrayTask.build?.project?.name}

											<ShortcutIcon />
										</Link>
									),
								},
								{
									title: i18n.translate('routine-name'),
									value: (
										<Link
											className="text-dark"
											to={`/project/${testrayTask.build?.project?.id}/routines/${testrayTask.build?.routine?.id}`}
										>
											{testrayTask.build?.routine?.name}

											<ShortcutIcon />
										</Link>
									),
								},
								{
									title: i18n.translate('build-name'),
									value: (
										<Link
											className="text-dark"
											to={`/project/${testrayTask.build?.project?.id}/routines/${testrayTask.build?.routine?.id}/build/${testrayTask.build?.id}`}
										>
											{testrayTask.build?.name}

											<ShortcutIcon />
										</Link>
									),
								},
							]}
						/>

						<div className="pb-4">
							<TaskbarProgress
								displayTotalCompleted={false}
								items={columns as any}
								legend
								taskbarClassNames={chartClassNames}
							/>
						</div>
					</div>
				</div>
			</Container>

			<Container
				className="mt-3"
				collapsable
				title={i18n.translate('progress-score')}
			>
				<div className="pb-5">
					<TaskbarProgress
						displayTotalCompleted
						items={[
							[StatusesProgressScore.SELF, 0],
							[
								StatusesProgressScore.OTHER,
								Number(testrayTask.subtaskScoreCompleted),
							],
							[
								StatusesProgressScore.INCOMPLETE,
								Number(testrayTask.subtaskScoreIncomplete),
							],
						]}
						legend
						taskbarClassNames={chartClassNames}
						totalCompleted={Number(
							testrayTask.subtaskScoreCompleted
						)}
					/>
				</div>
			</Container>

			<Container className="mt-3">
				<ListView
					managementToolbarProps={{
						filterFields: filters.subtasks as any,
						title: i18n.translate('subtasks'),
					}}
					resource={testraySubtaskImpl.resource}
					tableProps={{
						actions,
						columns: [
							{
								clickable: true,
								key: 'name',
								sorteable: true,
								value: i18n.translate('name'),
							},
							{
								clickable: true,
								key: 'dueStatus',
								render: (status) => (
									<StatusBadge
										type={
											(SUBTASK_STATUS as any)[status]
												?.color
										}
									>
										{(SUBTASK_STATUS as any)[status]?.label}
									</StatusBadge>
								),

								sorteable: true,
								value: i18n.translate('status'),
							},
							{
								clickable: true,
								key: 'score',
								sorteable: true,
								value: i18n.translate('score'),
							},
							{
								clickable: true,
								key: 'tests',
								sorteable: true,
								value: i18n.translate('tests'),
							},
							{
								key: 'error',
								render: (value) => <Code>{value}</Code>,
								size: 'xl',
								value: i18n.translate('errors'),
							},
							{
								key: 'user',
								render: (
									_: any,
									subtask: TestraySubTask,
									mutate
								) => {
									if (subtask.userId) {
										return (
											<Avatar
												className="text-capitalize"
												displayName
												name={`${subtask?.userId?.emailAddress
													.split('@')[0]
													.replace('.', ' ')}`}
												size="sm"
											/>
										);
									}

									return (
										<AssignToMe
											onClick={() =>
												testraySubtaskImpl
													.assignToMe(subtask)
													.then(() => {
														updateItemFromList(
															mutate,
															0,
															{},
															{
																revalidate: true,
															}
														);
													})
													.then(form.onSuccess)
													.catch(form.onError)
											}
										/>
									);
								},
								value: i18n.translate('assignee'),
							},
						],
						navigateTo: () => '/testflow/subtasks',
						rowSelectable: true,
					}}
					transformData={(response) =>
						testraySubtaskImpl.transformDataFromList(response)
					}
					variables={{
						filter: searchUtil.eq(
							'taskId',
							testrayTaskId as string
						),
					}}
				/>
			</Container>
		</>
	);
};

export default TestFlowTasks;
