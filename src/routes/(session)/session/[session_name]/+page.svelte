<script lang="ts">
	import PlayersList from '$lib/PlayersList.svelte';
	import History from '$lib/History.svelte';
	import BuyInModal from '$lib/BuyInModal.svelte';
	import AdminModal from '$lib/AdminModal.svelte';
	import NewPlayerModal from '$lib/NewPlayerModal.svelte';
	import CashOutModal from '$lib/CashOutModal.svelte';
	import { page } from '$app/stores';
	import { sessionData, tableSum } from '$lib/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import '../../../../app.css';

	if (browser) {
		$sessionData = JSON.parse(localStorage[$page.params.session_name]);
	}

	let showBuyInModal = false;
	let showAdminModal = false;
	let showCashOutModal = false;
	let showNewPlayerModal = false;
	let selectedPlayer = '';

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
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div
	class="flex shrink h-screen max-h-screen grow-0 flex-col md:flex-row bg-slate-900 text-slate-300"
>
	<div
		class="h-56 md:h-full flex shrink flex-row md:flex-col md:overflow-hidden pl-4 md:pr-10 md:pb-10 pb-5"
	>
		<div class="w-48">
			<a href="/" class="text-2xl underline"> Home </a>
			<div class="font-thin italic tracking-widest text-3xl ">
				{time.toLocaleTimeString()}
			</div>
		</div>
		<div class="h-full pb-10">
			<History />
		</div>
	</div>
	<div class="basis-auto flex flex-col shrink w-full overflow-hidden">
		<div class="flex flex-col">
			<div>
				<button
					on:click={() => {
						showAdminModal = true;
					}}>admin panel</button
				>
			</div>
			<h2><b>${$tableSum.toFixed(2)}</b> <span>on table</span></h2>
		</div>
		<PlayersList {newPlayer} {buyIn} {cashOut} />
	</div>
</div>

<BuyInModal {selectedPlayer} bind:visible={showBuyInModal} />
<CashOutModal {selectedPlayer} bind:visible={showCashOutModal} />
<NewPlayerModal bind:visible={showNewPlayerModal} />
<AdminModal bind:visible={showAdminModal} />

<style>
</style>
