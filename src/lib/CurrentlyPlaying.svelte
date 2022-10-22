<script lang="ts">
	import { ledger, playersWithChips, playersSitting, playerNames } from '$lib/stores';
	export let buyIn: (player: string) => void;
	export let cashOut: (player: string) => void;

	function standUp(player: string) {
		$ledger = [...$ledger, { type: 'stand up', name: player, timestamp: new Date() }];
	}

	function sitDown(player: string) {
		$ledger = [...$ledger, { type: 'sit down', name: player, timestamp: new Date() }];
	}

	function stacked(player: string) {
		$ledger = [...$ledger, { type: 'cash out', name: player, amount: 0, timestamp: new Date() }];
	}
</script>

<div>
	<p>players with chips:</p>
	{#each $playersWithChips as player}
		<div class="player-div">
			{$playersSitting.includes(player) ? '' : '🧍 '}{player}
			{#if $playersSitting.includes(player)}
				<button
					on:click={() => {
						standUp(player);
					}}>stand</button
				>
			{:else}
				<button
					on:click={() => {
						sitDown(player);
					}}>sit</button
				>
			{/if}
			<button
				on:click={() => {
					stacked(player);
				}}>stacked</button
			>
			<button
				on:click={() => {
					buyIn(player);
				}}>buy in</button
			>
			<button
				on:click={() => {
					cashOut(player);
				}}>cash out</button
			>
		</div>
	{/each}
	<p>players without chips:</p>
	{#each $playerNames as player}
		{#if !$playersWithChips.includes(player)}
			<div>
				{player}
			</div>
		{/if}
	{/each}
</div>

<style>
	.player-div {
		margin: 0.3rem;
	}
</style>
