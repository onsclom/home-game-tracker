<script lang="ts">
	import { ledger, playersPlaying, playersStanding } from '$lib/stores';

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
	{#each $playersPlaying as player}
		<div class="player-div">
			{$playersStanding.includes(player) ? '🧍 ' : ''}{player}
			{#if $playersStanding.includes(player)}
				<button
					on:click={() => {
						sitDown(player);
					}}>sit</button
				>
			{:else}
				<button
					on:click={() => {
						standUp(player);
					}}>stand</button
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
