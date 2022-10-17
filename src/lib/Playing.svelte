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
	<div class="twitch-chat">
		<div class="overflow-hidden">
			<History />
		</div>
		<div>
			<button on:click={() => (showBuyInModal = true)}>add buy in</button>
			<button on:click={() => (showCashOutModal = true)}>add cash out</button>
			<button on:click={() => (showAdminModal = true)}>admin mode</button>
		</div>
	</div>
	<h2><b>${totalOnTable.toFixed(2)}</b> <span>on table</span></h2>
	<CurrentlyPlaying />
</div>

<style>
	.playing-holder {
		box-sizing: border-box;
		display: flex;
		height: 100%;
		justify-content: space-between;
		margin: 0 1rem;
	}

	.overflow-hidden {
		justify-content: end;
		flex-grow: 1;
		overflow: scroll;
		height: 10rem;
	}

	.twitch-chat {
		display: flex;
		flex-direction: column;
		justify-content: end;
	}
</style>
