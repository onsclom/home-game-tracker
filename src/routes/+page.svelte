<script lang="ts">
	import Initial from '$lib/Initial.svelte';
	import Playing from '$lib/Playing.svelte';
	import { state } from '$lib/stores';

	let states = [Initial, Playing];
</script>

<h1>poker buy in and cash out tracker</h1>
<svelte:component this={states[$state]} />

<style>
</style>
