<script lang="ts">
	import { sessionData } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	export let visible = false;
	export let selectedPlayer: string;

	let amount: number = 0;

	function processCashOut() {
		$sessionData.ledger = [
			...$sessionData.ledger,
			{ type: 'cash out', amount: amount, name: selectedPlayer, timestamp: new Date() }
		];
		$sessionData = $sessionData;
		visible = false;
	}

	$: visibleChanged(visible);

	function visibleChanged(visible: boolean) {
		amount = 0;
	}
</script>

<Modal bind:visible>
	<h2>cash out for {selectedPlayer}</h2>
	<form on:submit|preventDefault={processCashOut}>
		<div class='input-wrapper'>
			<input class='input' type="number" inputmode="decimal" step="0.01" id="cashInAmount" bind:value={amount} />
			<label class='input-label bg-slate-800' for="cashInAmount">cash out amount:</label>
		</div>
		<button disabled={!amount}>Cash out </button>
	</form>
</Modal>

<style>
	div {
		margin: 1rem 0;
	}
</style>
