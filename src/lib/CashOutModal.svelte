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
		<div>
			<label for="cashInAmount">cash out amount:</label>
			<input type="number" inputmode="decimal" step="0.01" id="cashInAmount" bind:value={amount} />
		</div>
		<input disabled={!amount} type="submit" value="enter cash out" />
	</form>
</Modal>

<style>
	div {
		margin: 1rem 0;
	}
</style>
