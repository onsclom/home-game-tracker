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

<div class="p-4">
	<button class='py-4 ' on:click={newPlayer}>+ new player</button>
	{#if $playersWithChips.length > 0}
		<p><b class='italic text-slate-400 '>with chips:</b></p>
	{/if}
	{#each $playersWithChips as player}
		<div class="flex flex-row space-x-4">
			<div class="w-3/6 flex flex-row">
				<b class='pr-5'>{player}</b> {$playersSitting.includes(player) ? '' : '🧍 '}
				(<PlayerEquation {player} />)
			</div>
			
			{#if $playersSitting.includes(player)}
				<button
					class='button'
					on:click={() => {
						standUp(player);
					}}>stand</button
				>
			{:else}
				<button
					class='button'
					on:click={() => {
						sitDown(player);
					}}>sit</button
				>
			{/if}
			<button
					class='button'
					on:click={() => {
					stacked(player);
				}}>stacked</button
			>
			<button
					class='button'
					on:click={() => {
					buyIn(player);
				}}>buy in</button
			>
			<button
					class='button'
					on:click={() => {
					cashOut(player);
				}}>cash out</button
			>
		</div>
	{/each}
	{#if $playerNames.filter((player) => !$playersWithChips.includes(player)).length > 0}
		<p class='pt-5'><b class='italic text-slate-400 '>without chips:</b></p>
	{/if}
	{#each $playerNames.filter((player) => !$playersWithChips.includes(player)) as player}
		<div class="flex flex-row space-x-4">
			<div class="w-3/6 flex flex-row">
				<b class='pr-5'>{player}</b>
				(<PlayerEquation {player} />)
				
			</div>
			<button
				on:click={() => {
					buyIn(player);
				}}>buy in</button
			>
		</div>
	{/each}
</div>

<style>
	.button{
		min-width: 5rem;
	}
</style>
