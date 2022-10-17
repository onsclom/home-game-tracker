<script lang="ts">
	import CurrentlyPlaying from './CurrentlyPlaying.svelte';

	import History from './History.svelte';

	import BuyInModal from '$lib/BuyInModal.svelte';
	import AdminModal from '$lib/AdminModal.svelte';
	import CashOutModal from '$lib/CashOutModal.svelte';
	import { ledger } from '$lib/stores';

	$: totalOnTable = computeTableSum($ledger);
	let showBuyInModal = false;
	let showAdminModal = false;
	let showCashOutModal = false;

	function computeTableSum(ledger: Entry[]) {
		let sum = 0;
		ledger.forEach((entry) => {
			if (entry.type == 'buy in') sum += entry.amount;
			if (entry.type == 'cash out') sum -= entry.amount;
		});
		return sum;
	}
</script>

<BuyInModal bind:visible={showBuyInModal} />
<CashOutModal bind:visible={showCashOutModal} />
<AdminModal bind:visible={showAdminModal} />

<div class="playing-holder">
	<div class="ledger-scroll-view playing-row">
		<div class="overflow-hidden">
			<History />
		</div>
		<div>
			<button on:click={() => (showBuyInModal = true)}>add buy in</button>
			<button on:click={() => (showCashOutModal = true)}>add cash out</button>
			<button on:click={() => (showAdminModal = true)}>admin mode</button>
		</div>
	</div>
	<div class="playing-row">
		<h2><b>${totalOnTable.toFixed(2)}</b> <span>on table</span></h2>
		<CurrentlyPlaying />
	</div>
</div>

<style>
	.playing-holder {
		box-sizing: border-box;
		display: flex;
		height: 100%;
		justify-content: space-between;
	}

	.overflow-hidden {
		justify-content: end;
		overflow: auto;
		overflow-x: hidden;
	}

	.ledger-scroll-view {
		display: flex;
		flex-direction: column;
		justify-content: end;
	}

	.playing-row {
		flex-grow: 1;
		margin: 1rem;
	}
</style>
