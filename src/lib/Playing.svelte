<script lang="ts">
	import AdminModal from './AdminModal.svelte';
	import { ledger } from '$lib/stores';

	$: totalOnTable = computeTableSum($ledger);
	let showAdminModal = false;

	function computeTableSum(ledger: Entry[]) {
		return ledger.reduce(
			(sum, entry) => sum + (entry.type == 'buy in' ? entry.amount : -entry.amount),
			0
		);
	}
</script>

<AdminModal bind:visible={showAdminModal} />

<p><b>${parseFloat(totalOnTable.toFixed(2))}</b> <span>currently on table</span></p>

<div>
	<button>add buy in</button>
	<button>add cash out</button>
	<button on:click={() => (showAdminModal = true)}>admin mode</button>
	<button>download as csv</button>
</div>

<ul id="history">
	{#each $ledger as event}
		<li>{event.name} had a {event.type} for ${event.amount}</li>
	{/each}
</ul>

<style>
</style>
