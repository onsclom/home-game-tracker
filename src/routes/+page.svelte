<script lang="ts">
	import Initial from '$lib/Initial.svelte';
	import Playing from '$lib/Playing.svelte';
	import { ledger } from '$lib/stores';

</script>

{#if $ledger.length == 0}
	<Initial />
{:else}
	<Playing />
{/if}
