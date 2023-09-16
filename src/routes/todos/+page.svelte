<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types.js';

	export let data;
	export let form: ActionData;
	let showMessage = true;

	setTimeout(() => {
		showMessage = false;
	}, 20000);

	function toggleTodoDone(todoId: string) {
		const todo = data.todos && data.todos.find((t) => t.id === todoId);
		if (todo) {
			todo.isDone = !todo.isDone;
			data.todos = data.todos; // Trigger a reactivity update
		}
	}
</script>

<svelte:head>
	<title>ToDos</title>
</svelte:head>

<h1>ToDo Dashboard</h1>
<h2>Welcome {data.name}</h2>

<p>Create a Todo and add it to your account to access it anywhere</p>

<form action="?/add_todo" method="POST" use:enhance>
	<input type="text" placeholder="Add a Todo" name="todo" />
	<button>Submit Todo</button>
</form>

{#if data.todos && data.todos.length > 0}
	<form action="?/delete_all" method="POST" use:enhance>
		<button>Delete All</button>
	</form>
	{#if showMessage == true && form?.message}
		<p class="success">{form?.message}</p>
	{/if}
	{#if showMessage == true && form?.error}
		<p class="error">{form?.error}</p>
	{/if}
{/if}
{#if data.todos && data.todos.length > 0}
	{#each data.todos as todo (todo.id)}
		<div>
			<p class:done={todo.isDone}>{todo.todo}</p>
			<div class="button-container">
				<form action="?/toggle_todo" method="POST" use:enhance>
					<input type="text" class="hidden" name="id" value={todo.id} />
					<button class="toggle-button" on:click={() => toggleTodoDone(todo.id)}>Toggle</button>
				</form>
				<form action="?/delete_todo" method="POST" use:enhance>
					<input type="text" class="hidden" name="id" value={todo.id} />
					<button class="delete-button">Delete Todo</button>
				</form>
			</div>
		</div>
	{/each}
{:else}
	<p class="error">No todos available.</p>
{/if}

<style lang="scss">
	div {
		background-color: var(--nav-color);
		max-width: 40rem;
		padding: 50px 50px;
		border-radius: 5px;
		border: 3px solid var(--border-color);
		margin-right: auto;
		margin-bottom: 20px;

		.button-container {
			display: flex;
			flex-direction: row;
		}

		p {
			border: 3px solid var(--border-color);
			max-width: max-content;
			margin: 0 auto;
			overflow-wrap: break-word;
		}

		.done {
			text-decoration: line-through;
		}

		.hidden {
			display: none;
		}

		.button-container {
			display: flex;
			gap: 10px; /* Adjust the gap as needed */
			align-items: center; /* Center buttons vertically */
		}
	}
</style>
