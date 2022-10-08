<script lang="ts">
	import BuyInModal from './BuyInModal.svelte';
	import AdminModal from './AdminModal.svelte';
	import { ledger } from '$lib/stores';
	import CashOutModal from './CashOutModal.svelte';

	$: totalOnTable = computeTableSum($ledger);
	let showBuyInModal = false;
	let showAdminModal = false;
	let showCashOutModal = false;

	function computeTableSum(ledger: Entry[]) {
		return ledger.reduce(
			(sum, entry) => sum + (entry.type == 'buy in' ? entry.amount : -entry.amount),
			0
		);
	}
</script>

<BuyInModal bind:visible={showBuyInModal} />
<CashOutModal bind:visible={showCashOutModal} />
<AdminModal bind:visible={showAdminModal} />

<h2><b>${parseFloat(totalOnTable.toFixed(2))}</b> <span>currently on table</span></h2>

<div>
	<button on:click={() => (showBuyInModal = true)}>add buy in</button>
	<button on:click={() => (showCashOutModal = true)}>add cash out</button>
	<button on:click={() => (showAdminModal = true)}>admin mode</button>
</div>

<div id="history">
	{#each $ledger as event}
		<div>
			<p><b>{event.name}</b> did a <b>{event.type}</b> for <b>${event.amount}</b></p>
		</div>
	{/each}
</div>

<style>
</style>
