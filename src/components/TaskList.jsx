import React from "react";
import Checkbox from "./Checkbox";

const TaskList = props => {
	// (C)
	const { list, setList } = props;

	const onChangeStatus = e => {
		const { name, checked } = e.target;

		// (E)
		const updateList = list.map(item => ({
			...item,
			done: item.id === name ? checked : item.done
		}));
		setList(updateList);
	};

	// (D)
	const onClickRemoveItem = e => {
		const updateList = list.filter(item => !item.done);
		setList(updateList);
	};

	// (A-2)
	const chk = list.map(item => (
		<Checkbox key={item.id} data={item} onChange={onChangeStatus} />
	));
	return (
		<div className="todo-list">
			{/*(A-1)*/}
			{list.length ? chk : "No hay tareas"}
			{/*(B)*/}
			{list.length ? (
				<p>
					<button className="button blue" onClick={onClickRemoveItem}>
						Borrar Tareas Completadas
					</button>
				</p>
			) : null}
		</div>
	);
};

export default TaskList;
