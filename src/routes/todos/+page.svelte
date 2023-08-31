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
		<p>{todo.todo}</p>
	{/each}
{:else}
	<p class="error">No todos available.</p>
{/if}
