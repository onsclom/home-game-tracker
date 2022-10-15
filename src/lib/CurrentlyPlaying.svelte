<script lang="ts">
	import { ledger } from '$lib/stores';

	let currentlyPlaying: string[];
	$: currentlyPlaying = getCurrentlyPlayingPlayers($ledger);
	let standingPlayers: string[];
	$: standingPlayers = getCurrentlyStandingPlayers($ledger, currentlyPlaying);

	function getCurrentlyPlayingPlayers(history: Entry[]): string[] {
		let curPlayers: Set<string> = new Set();
		history.forEach((entry) => {
			if (entry.type == 'buy in') curPlayers.add(entry.name);
			if (entry.type == 'cash out') curPlayers.delete(entry.name);
		});
		return [...curPlayers];
	}

	//if player's last action is standing, they are a standing player
	function getCurrentlyStandingPlayers(history: Entry[], currentlyPlaying: string[]): string[] {
		let standing: string[] = [];
		currentlyPlaying.forEach((player) => {
			let playerHistory = history.filter((entry) => entry.name == player);
			if (playerHistory[playerHistory.length - 1].type == 'stand up') standing.push(player);
		});
		return standing;
	}

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
	<h2>players with chips:</h2>
	<div class="player-div">
		{#each currentlyPlaying as player}
			<div>
				{player}
				{#if standingPlayers.includes(player)}
					<button
						on:click={() => {
							sitDown(player);
						}}>sit down</button
					>
				{:else}
					<button
						on:click={() => {
							standUp(player);
						}}>stand up</button
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
</div>

<style>
	.player-div {
		margin: 0.3rem;
	}
</style>
