<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
</script>

<svelte:head>
	<title>ToDos</title>
</svelte:head>

<h1>ToDo Dashboard</h1>
<h2>Welcome {data.name}</h2>

<p>Create an Todo and add it to your account to access it anywhere</p>

<form method="POST" use:enhance>
	<input type="text" placeholder="Add a Todo" name="todo" />
	<button>Submit Todo</button>
</form>

{#if data.todos && data.todos.length > 0}
	{#each data.todos as todo}
		<div>
			<p>{todo.todo}</p>
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
		// button {
		// 	margin: 10px 0px;
		// }
		p {
			border: 3px solid var(--border-color);
			max-width: max-content;
			margin: 0 auto;
			overflow-wrap: break-word; /* Erzwingt Wortumbrüche */
		}

		// .hidden {
		// 	display: none;
		// }
	}
</style>
