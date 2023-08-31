import { User_Model } from '$lib/server/models';
import { v4 as uuidv4 } from 'uuid';
import type { Actions } from '@sveltejs/kit';

export async function load(event) {
	const email = event.cookies.get('email');
	const user = await User_Model.findOne({ 'user.email': email });

	if (!user) {
		return { status: 400, error: new Error('User could not be found') };
	} else {
		const todos = user.todos.map((todo) => {
			const todoCopy = JSON.parse(JSON.stringify(todo));
			delete todoCopy._id; // Remove the _id field
			return todoCopy;
		});
		return { todos };
	}
}

export const actions: Actions = {
	add_todo: async (event) => {
		const email = event.cookies.get('email');
		const user = await User_Model.findOne({ 'user.email': email });
		const data = await event.request.formData();
		const todo = data.get('todo') as string;

		const todoId = uuidv4();

		if (user) {
			user.todos.push({
				id: todoId,
				todo: todo,
				isDone: false
			});

			await user.save();
			console.log(user);
		}
	},
	delete_todo: async (event) => {
		const email = event.cookies.get('email');
		const user = await User_Model.findOne({ 'user.email': email });
		const data = await event.request.formData();
		const id = data.get('id') as string;
		const todos = user?.todos;

		if (todos) {
			const updatedtodos = todos.filter((todo) => todo.id !== id);
			user.todos = updatedtodos;
			await user.save();
		}
	},
	delete_all: async (event) => {
		const email = event.cookies.get('email');

		try {
			const user = await User_Model.findOne({ 'user.email': email });

			if (!user) {
				return {
					status: 404,
					error: 'User not found'
				};
			}

			user.todos = [];

			console.log(user);

			await user.save();

			return {
				status: 200,
				message: 'Todos deleted succesfully'
			};
		} catch (error) {
			console.error(error);
			return {
				status: 500,
				error: 'Error saving game'
			};
		}
	},
	toggle_todo: async (event) => {
		const email = event.cookies.get('email');
		const user = await User_Model.findOne({ 'user.email': email });
		const data = await event.request.formData();
		const id = data.get('id') as string;
		const todos = user?.todos;

		if (todos) {
			const todo = todos.find((todo) => todo.id === id);
			if (todo) {
				if (todo.isDone == false) {
					todo.isDone = true;
				} else {
					todo.isDone = false;
				}
				await user.save();
			} else {
				return {
					status: 404,
					error: 'Todo not found'
				};
			}
		}

		console.log(id);
	}
};
