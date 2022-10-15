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

<h2><b>${parseFloat(totalOnTable.toFixed(2))}</b> <span>currently on table</span></h2>

<div class="playing-holder">
	<div>
		<History />
		<div>
			<button on:click={() => (showBuyInModal = true)}>add buy in</button>
			<button on:click={() => (showCashOutModal = true)}>add cash out</button>
			<button on:click={() => (showAdminModal = true)}>admin mode</button>
		</div>
	</div>
	<CurrentlyPlaying />
</div>

<style>
	.buy {
		color: #a00;
	}

	.cash {
		color: #0a0;
	}

	.event-holder {
		display: flex;
		flex-direction: column;
	}

	.playing-holder {
		display: flex;
	}
</style>
