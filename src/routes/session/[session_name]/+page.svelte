<script lang="ts">
	import PlayersList from '$lib/PlayersList.svelte';
	import History from '$lib/History.svelte';
	import BuyInModal from '$lib/BuyInModal.svelte';
	import AdminModal from '$lib/AdminModal.svelte';
	import NewPlayerModal from '$lib/NewPlayerModal.svelte';
	import CashOutModal from '$lib/CashOutModal.svelte';
	import { page } from '$app/stores';
	import { sessionData, tableSum } from '$lib/stores';
	import { onDestroy, tick } from 'svelte';
	import { browser } from '$app/environment';

	if (browser) {
		$sessionData = JSON.parse(localStorage[$page.params.session_name]);
	}

	let showBuyInModal = false;
	let showAdminModal = false;
	let showCashOutModal = false;
	let showNewPlayerModal = false;
	let selectedPlayer = '';
	let historyHolder: HTMLElement;

	$: {
		$sessionData;
		scrollToBottom();
	}

	async function scrollToBottom() {
		await tick();
		if (historyHolder != undefined) {
			historyHolder.scrollTo(0, historyHolder.scrollHeight);
		}
	}

	function buyIn(player: string) {
		selectedPlayer = player;
		showBuyInModal = true;
	}

	function cashOut(player: string) {
		selectedPlayer = player;
		showCashOutModal = true;
	}

	function newPlayer() {
		showNewPlayerModal = true;
	}

	let date: Date = new Date();
	let interval = setInterval(() => {
		date = new Date();
	}, 1000);
	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="playing-holder">
	<div class="ledger-scroll-view playing-row ">
		<h2>
			{$sessionData.name} -
			{date.toLocaleTimeString('en-us', {
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
				hour12: true
			})}
		</h2>
		<div class="overflow-hidden border" bind:this={historyHolder} id="test">
			<History />
		</div>
	</div>
	<div class="playing-row ledger-scroll-view">
		<div>
			<h2>
				<b>${$tableSum.toFixed(2)}</b> <span>on table</span>
				<button
					style="float: right;"
					on:click={() => {
						showAdminModal = true;
					}}>admin panel</button
				>
			</h2>
		</div>
		<div class="overflow-hidden border">
			<PlayersList {newPlayer} {buyIn} {cashOut} />
		</div>
	</div>
</div>

<BuyInModal {selectedPlayer} bind:visible={showBuyInModal} />
<CashOutModal {selectedPlayer} bind:visible={showCashOutModal} />
<NewPlayerModal bind:visible={showNewPlayerModal} />
<AdminModal bind:visible={showAdminModal} />

<style>
	.playing-holder {
		box-sizing: border-box;
		display: flex;
		height: 100%;
		justify-content: space-between;
		padding: 0 0.25rem;

		/* flex-direction: column; */
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

	.border {
		border: 2px solid black;
	}

	.playing-row {
		flex-grow: 1;
		padding: 0.25rem;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}

	h2 {
		margin: 0.2rem 0;
	}

	@media only screen and (max-width: 600px) {
		.playing-holder {
			flex-direction: column;
		}

		.playing-row {
			max-height: 50%;
		}
	}
</style>
