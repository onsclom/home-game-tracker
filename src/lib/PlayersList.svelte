<script lang="ts">
	import PlayerEquation from './PlayerEquation.svelte';

	import {
		sessionData,
		playersWithChips,
		playersSitting,
		playerNames,
		playerNets,
		playerBuyIns,
		playerCashOuts
	} from '$lib/stores';
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

<div>
	<button on:click={newPlayer}>add new player</button>
	{#if $playersWithChips.length > 0}
		<p>players with chips:</p>
	{/if}
	{#each $playersWithChips as player}
		<div class="player-div">
			{$playersSitting.includes(player) ? '' : '🧍 '}<b>{player}</b>
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
		<PlayerEquation {player} />
	{/each}
	{#if $playerNames.filter((player) => !$playersWithChips.includes(player)).length > 0}
		<p>players without chips:</p>
	{/if}
	{#each $playerNames.filter((player) => !$playersWithChips.includes(player)) as player}
		<div class="player-div">
			<b>{player}</b>
			<button
				on:click={() => {
					buyIn(player);
				}}>buy in</button
			>
		</div>
		<PlayerEquation {player} />
	{/each}
</div>

<style>
	.player-div {
		margin: 0.3rem;
	}
</style>
