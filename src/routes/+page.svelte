<script lang="ts">
	import Initial from '$lib/Initial.svelte';
	import Playing from '$lib/Playing.svelte';
	import { state } from '$lib/stores';

	let states = [Initial, Playing];
</script>

<svelte:component this={states[$state]} />
