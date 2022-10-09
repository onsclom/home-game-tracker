<script lang="ts">
	import { ledger } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	export let visible = false;
	let people = [...new Set($ledger.map((entry) => entry.name))];
	let selected: string = '';
	let amount: number = 0;

	function processCashOut() {
		$ledger = [
			...$ledger,
			{ type: 'cash out', amount: +amount, name: selected, timestamp: new Date() }
		];
		visible = false;
	}

	$: visibleChanged(visible);

	function visibleChanged(visible: boolean) {
		if (visible) return;
		selected = '';
		amount = 0;
	}
</script>

<Modal bind:visible>
	<h2>cash out</h2>
	<form on:submit|preventDefault={processCashOut}>
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
			<label for="cashInAmount">cash out amount:</label>
			<input inputmode="decimal" id="cashInAmount" bind:value={amount} />
		</div>
		<input disabled={!amount || !selected} type="submit" value="enter cash out" />
	</form>
</Modal>

<style>
	div {
		margin: 1rem 0;
	}
</style>
