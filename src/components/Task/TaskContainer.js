import React, { useState, useEffect } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import SearchForm from "../Search/SearchForm";
import "./Task.css";
import { Empty } from "antd";

const TaskContainer = (props) => {
	const [tasks, setTasks] = useState([]);
	const [searchResult, setSearchResult] = useState([]);

	const workspaceId = props.match.params.id;
	//console.log(props.match);

	// PROD
	const taskURL = "https://git-it-done-backend.cyclic.app/api/api/tasks/";
	const URL = `https://git-it-done-backend.cyclic.app/api/api/workspaces/${workspaceId}/alltasks`;
	// DEV
	// const taskURL = "http://localhost:8000/api/tasks/";
	// const URL = `http://localhost:8000/api/workspaces/${workspaceId}/alltasks`;

	const getTasks = async () => {
		const response = await fetch(URL);
		const data = await response.json();
		console.log(data);
		setTasks(data);
		setSearchResult(data);
	};

	const createTask = async (task, id) => {
		await fetch(taskURL, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(task),
		}).then(console.log(task));

		getTasks();
	};

	const updateTask = async (task, _id) => {
		await fetch(taskURL + _id, {
			method: "put",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(task),
		});
		getTasks();
	};

	const deleteTask = async (id) => {
		await fetch(taskURL + id, {
			method: "delete",
		});
		getTasks();
	};

	const searchTask = (searchTerm) => {
		//console.log('search term:'+ searchTerm)
		if (searchTerm === "") {
			setTasks(searchResult);
		} else {
			setTasks(
				searchResult.filter(
					(searched) =>
						searched.title.toLowerCase() === searchTerm.toLowerCase() ||
						searched.description.toLowerCase() === searchTerm.toLowerCase() ||
						searched.status.toLowerCase() === searchTerm.toLowerCase()
				)
			);
		}
	};

	useEffect(() => {
		getTasks();
	}, [workspaceId]);

	return (
		<>
			<div className="task-board-header">
				<TaskForm createTask={createTask} workspaceId={workspaceId} />
				<SearchForm className="searchBar" search={searchTask} />
			</div>

			<div className="tasks">
				{tasks.length > 0 ? (
					<>
						{tasks.map((task, index) => (
							<Task
								key={index}
								task={task}
								updateTask={updateTask}
								deleteTask={deleteTask}
							/>
						))}
					</>
				) : (
					<Empty className="empty" description={<span>No tasks</span>} />
				)}
			</div>
		</>
	);
};

export default TaskContainer;
