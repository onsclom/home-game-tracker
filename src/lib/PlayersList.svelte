<script lang="ts">
	import PlayerEquation from './PlayerEquation.svelte';

	import { sessionData, playersWithChips, playersSitting, playerNames } from '$lib/stores';
	export let buyIn: (player: string) => void;
	export let cashOut: (player: string) => void;
	export let newPlayer: () => void;

	function standUp(player: string) {
		$sessionData.ledger = [
			...$sessionData.ledger,
			{ type: 'stand up', name: player, timestamp: new Date() }
		];
		$sessionData = $sessionData;
	}

	function sitDown(player: string) {
		$sessionData.ledger = [
			...$sessionData.ledger,
			{ type: 'sit down', name: player, timestamp: new Date() }
		];
		$sessionData = $sessionData;
	}

	function stacked(player: string) {
		$sessionData.ledger = [
			...$sessionData.ledger,
			{ type: 'cash out', name: player, amount: 0, timestamp: new Date() }
		];
		$sessionData = $sessionData;
	}
</script>

<div class="mainContainer">
	<button on:click={newPlayer}>+ new player</button>
	{#if $playersWithChips.length > 0}
		<p style="text-align: center;"><b>with chips:</b></p>
	{/if}
	{#each $playersWithChips as player}
		<div class="player-div">
			{$playersSitting.includes(player) ? '' : '🧍 '}<b>{player}</b>
			(<PlayerEquation {player} />)
			<br />
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
	{#if $playerNames.filter((player) => !$playersWithChips.includes(player)).length > 0}
		<p style="text-align: center;"><b>without chips:</b></p>
	{/if}
	{#each $playerNames.filter((player) => !$playersWithChips.includes(player)) as player}
		<div class="player-div">
			<b>{player}</b>
			(<PlayerEquation {player} />)
			<br />
			<button
				on:click={() => {
					buyIn(player);
				}}>buy in</button
			>
		</div>
	{/each}
</div>

<style>
	.player-div {
		margin: 0.3rem;
	}

	.mainContainer {
		padding: 0.3rem;
	}

	p {
		margin: 0.3rem;
	}
</style>
