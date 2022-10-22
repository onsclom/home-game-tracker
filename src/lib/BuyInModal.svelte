<script lang="ts">
	import { ledger } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	export let visible = false;
	export let selectedPlayer: string;
	let amount: number = 0;

	function processBuyIn() {
		$ledger = [
			...$ledger,
			{ type: 'buy in', amount: amount, name: selectedPlayer, timestamp: new Date() }
		];
		visible = false;
	}

	$: visibleChanged(visible);

	function visibleChanged(visible: boolean) {
		amount = 0;
	}
</script>

<Modal bind:visible>
	<h2>buy in for {selectedPlayer}</h2>
	<form on:submit|preventDefault={processBuyIn}>
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
		<input disabled={!amount} type="submit" value="enter" />
	</form>
</Modal>

<style>
	div {
		margin: 1rem 0;
	}
</style>
