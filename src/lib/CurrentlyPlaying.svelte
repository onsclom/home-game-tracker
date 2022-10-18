<script lang="ts">
	import { ledger, playersWithChips, playersSitting } from '$lib/stores';

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
		</div>
	{/each}
</div>

<style>
	.player-div {
		margin: 0.3rem;
	}
</style>
