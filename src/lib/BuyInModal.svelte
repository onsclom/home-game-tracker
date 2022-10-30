<script lang="ts">
	import { sessionData } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	export let visible = false;
	export let selectedPlayer: string;
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
	}
</script>

<Modal bind:visible>
	<h2>buy in for {selectedPlayer}</h2>
	<form on:submit|preventDefault={processBuyIn}>
		<div class="input-wrapper">
			<input
				placeholder="0"
				class="input"
				type="number"
				inputmode="decimal"
				id="existingBuyinAmount"
				step="0.01"
				bind:value={amount}
			/>
			<label class="input-label bg-slate-800" for="existingBuyinAmount">buy in amount:</label>
		</div>
		<input disabled={!amount} type="submit" value="enter" />
	</form>
</Modal>

<style>
	div {
		margin: 1rem 0;
	}
</style>
