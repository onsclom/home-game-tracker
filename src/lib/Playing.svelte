<script lang="ts">
	import BuyInModal from '$lib/BuyInModal.svelte';
	import AdminModal from '$lib/AdminModal.svelte';
	import CashOutModal from '$lib/CashOutModal.svelte';
	import { ledger } from '$lib/stores';

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
<br />
<div id="history">
	<div class="event-holder">
		{#each $ledger as event}
			<div>
				<p>
					<b>{event.name}</b> did a <b class={event.type.split(' ')[0]}>{event.type}</b> for
					<b>${event.amount} </b>
					<span><i>({new Date(event.timestamp).toLocaleTimeString()}</i>)</span>
				</p>
			</div>
		{/each}
	</div>
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
		flex-direction: column-reverse;
	}

	p {
		margin: 0.25rem;
	}
</style>
