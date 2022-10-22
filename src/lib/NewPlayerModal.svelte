<script lang="ts">
	import { sessionData } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	export let visible = false;
	export let selectedPlayer: string = '';
	let amount: number = 0;

	function processBuyIn() {
		$sessionData.ledger = [
			...$sessionData.ledger,
			{ type: 'buy in', amount: amount, name: selectedPlayer, timestamp: new Date() }
		];
		$sessionData = $sessionData;
		visible = false;
	}

	$: visibleChanged(visible);

	function visibleChanged(visible: boolean) {
		amount = 0;
		selectedPlayer = '';
	}
</script>

<Modal bind:visible>
	<h2>add new player</h2>
	<form on:submit|preventDefault={processBuyIn}>
		<div>
			<label for="playerName">new player name:</label>
			<input id="playerName" bind:value={selectedPlayer} />
		</div>
		<div>
			<label for="existingBuyinAmount">buy in amount:</label>
			<input
				type="number"
				inputmode="decimal"
				id="existingBuyinAmount"
				step="0.01"
				bind:value={amount}
			/>
		</div>
		<input disabled={!amount || selectedPlayer == ''} type="submit" value="enter" />
	</form>
</Modal>

<style>
	div {
		margin: 1rem 0;
	}
</style>
