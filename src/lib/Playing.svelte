<script lang="ts">
	import CurrentlyPlaying from './CurrentlyPlaying.svelte';
	import History from './History.svelte';
	import BuyInModal from '$lib/BuyInModal.svelte';
	import AdminModal from '$lib/AdminModal.svelte';
	import CashOutModal from '$lib/CashOutModal.svelte';
	import { tableSum, ledger } from '$lib/stores';
	import { tick } from 'svelte';

	let showBuyInModal = false;
	let showAdminModal = false;
	let showCashOutModal = false;
	let historyHolder: HTMLElement;

	$: {
		$ledger;
		scrollToBottom();
	}

	async function scrollToBottom() {
		await tick();
		if (historyHolder != undefined) {
			historyHolder.scrollTo(0, historyHolder.scrollHeight);
		}
	}
	let test = 0;
</script>

<div class="playing-holder">
	<div class="ledger-scroll-view playing-row">
		<div class="overflow-hidden" bind:this={historyHolder} id="test">
			<History />
		</div>
		<div>
			<button on:click={() => (showBuyInModal = true)}>add buy in</button>
			<button on:click={() => (showCashOutModal = true)}>add cash out</button>
			<button on:click={() => (showAdminModal = true)}>admin mode</button>
		</div>
	</div>
	<div class="playing-row">
		<h2><b>${$tableSum.toFixed(2)}</b> <span>on table</span></h2>
		<CurrentlyPlaying />
	</div>
</div>

<BuyInModal bind:visible={showBuyInModal} />
<CashOutModal bind:visible={showCashOutModal} />
<AdminModal bind:visible={showAdminModal} />

<style>
	.playing-holder {
		box-sizing: border-box;
		display: flex;
		height: 100%;
		justify-content: space-between;
	}

	.overflow-hidden {
		justify-content: flex-end;
		overflow: auto;
		overflow-x: hidden;
	}

	.ledger-scroll-view {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.playing-row {
		flex-grow: 1;
		margin: 1rem;
	}
</style>
