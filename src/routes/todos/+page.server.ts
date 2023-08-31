import { User_Model } from '$lib/server/models';
import { v4 as uuidv4 } from 'uuid';
import type { Actions } from '@sveltejs/kit';

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
