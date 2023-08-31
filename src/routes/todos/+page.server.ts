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
	default: async (event) => {
		const email = event.cookies.get('email');
		const user = await User_Model.findOne({ 'user.email': email });
		const data = await event.request.formData();
		const todo = data.get('todo') as string;

		const todoId = uuidv4();

		if (user) {
			user.todos.push({
				id: todoId,
				todo: todo
			});

			await user.save();
			console.log(user);
		}
	}
};
