<script lang="ts">
	import { ledger } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	export let visible = false;
	let state: 'choosing' | 'existing' | 'new' = 'choosing';
	$: people = [...new Set($ledger.map((entry) => entry.name))];
	let selected: string = '';
	let amount: number = 0;

	function processBuyIn() {
		$ledger = [
			...$ledger,
			{ type: 'buy in', amount: +amount, name: selected, timestamp: new Date() }
		];
		visible = false;
	}

	$: visibleChanged(visible);

	function visibleChanged(visible: boolean) {
		if (visible) return;
		state = 'choosing';
		selected = '';
		amount = 0;
	}
</script>

<Modal bind:visible>
	<h2>buy in</h2>
	{#if state == 'choosing'}
		<button on:click={() => (state = 'existing')}>existing player</button>
		<span>OR</span>
		<button on:click={() => (state = 'new')}>new player</button>
	{:else if state == 'existing'}
		<form on:submit|preventDefault={processBuyIn}>
			<div>
				<label for="personSelector">person:</label>
				<select id="personSelector" bind:value={selected}>
					{#each people as person}
						<option value={person}>
							{person}
						</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="existingBuyinAmount">buy in amount:</label>
				<input inputmode="decimal" id="existingBuyinAmount" bind:value={amount} />
			</div>
			<input disabled={!amount || !selected} type="submit" value="I have venmo'd austin!" />
		</form>
	{:else if state == 'new'}
		<form on:submit|preventDefault={processBuyIn}>
			<div>
				<label for="personSelector">person:</label>
				<input bind:value={selected} />
			</div>
			<div>
				<label for="existingBuyinAmount">buy in amount:</label>
				<input inputmode="decimal" id="existingBuyinAmount" bind:value={amount} />
			</div>
			<input disabled={!amount || !selected} type="submit" value="I have venmo'd austin!" />
		</form>
	{/if}
</Modal>

<style>
	div {
		margin: 1rem 0;
	}
</style>
