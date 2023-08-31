<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>ToDo Dashboard</h1>
<h2>Welcome {data.name}</h2>

<p>Create an Todo and add it to your account to access it anywhere</p>

<form method="POST" use:enhance>
	<input type="text" placeholder="Add a Todo" name="todo" />
	<button>Submit Todo</button>
</form>
