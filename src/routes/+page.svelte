<script lang="ts">
	import { sessionNames } from '$lib/stores';
</script>

<main>
	<h1>home game tracker</h1>
	<p>this is an app that makes it easier to be a banker and collect stats for home games</p>

	<p>
		<a href="/create-session">create new session</a>
	</p>
	<div>
		<label for="sessions">sessions:</label>
		<ul id="sessions">
			{#each $sessionNames as sessionName}
				<li><a href={`/session/${encodeURIComponent(sessionName)}`}>{sessionName}</a></li>
			{/each}
		</ul>
	</div>
</main>

<style>
</style>
