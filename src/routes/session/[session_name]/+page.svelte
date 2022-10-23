<script lang="ts">
	import PlayersList from '$lib/PlayersList.svelte';
	import History from '$lib/History.svelte';
	import BuyInModal from '$lib/BuyInModal.svelte';
	import AdminModal from '$lib/AdminModal.svelte';
	import NewPlayerModal from '$lib/NewPlayerModal.svelte';
	import { fade } from 'svelte/transition';
	import CashOutModal from '$lib/CashOutModal.svelte';
	import { page } from '$app/stores';
	import { sessionData, tableSum } from '$lib/stores';
	import { tick } from 'svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

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

	let time = new Date();

	function newPlayer() {
		showNewPlayerModal = true;
	}

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 500);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div in:fade={{ delay: 250, duration: 250 }} out:fade={{ duration: 250 }} class="">
	<a href="/" class="text-2xl underline"> Home </a>
	<div class="font-thin italic tracking-widest text-3xl">
		{time.toLocaleTimeString()}
	</div>
	<div class="playing-holder ">
		<div class="ledger-scroll-view playing-row fade-out bg-slate-800 max-h-[40rem]">
			<div class="overflow-hidden " bind:this={historyHolder} id="test">
				<History />
			</div>
		</div>
		<div class="playing-row w-1/2">
			<div>
				<button
					on:click={() => {
						showAdminModal = true;
					}}>admin panel</button
				>
			</div>
			<h2><b>${$tableSum.toFixed(2)}</b> <span>on table</span></h2>
			<div class="overflow-hidden bg-slate-800">
				<PlayersList {newPlayer} {buyIn} {cashOut} />
			</div>
		</div>
	</div>
</div>

<BuyInModal {selectedPlayer} bind:visible={showBuyInModal} />
<CashOutModal {selectedPlayer} bind:visible={showCashOutModal} />
<NewPlayerModal bind:visible={showNewPlayerModal} />
<AdminModal bind:visible={showAdminModal} />

<style>

	.fade-out{
		-webkit-mask-image: linear-gradient(0, #000000 80%, transparent);

	}
	.playing-holder {
		display: flex;
		flex-direction: row;
		height: 100%;
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
	.playing-row:before{
	}
</style>
