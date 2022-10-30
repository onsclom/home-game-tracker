<script lang="ts">
	import PlayerEquation from './PlayerEquation.svelte';
	import Icon from '@iconify/svelte';
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

<div class="overflow-y-scroll min-h-0 w-full flex flex-col shrink">
	<button class="py-4 " on:click={newPlayer}>+ new player</button>
	{#if $playersWithChips.length > 0}
		<p><b class="italic text-slate-400 ">with chips:</b></p>
	{/if}
	{#each $playersWithChips as player}
		<div class="grid grid-flow-col grid-cols-3 border-b-2 hover:bg-slate-800">
			<div class="grid grid-flow-row grid-rows-2 justify-between">
				<div class="grid grid-flow-row sm:grid-flow-col grid-rows-1">
					<b class="md:pr-5">{player + ($playersSitting.includes(player) ? '' : '  🧍')}</b>
				</div>
				<PlayerEquation {player} />
			</div>
			<div
				class="grid grid-flow-col justify-items-end col-span-2 grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-4"
			>
				{#if $playersSitting.includes(player)}
					<button
						class="button"
						on:click={() => {
							standUp(player);
						}}
					>
						<p class="">stand</p>
					</button>
				{:else}
					<button
						class="button"
						on:click={() => {
							sitDown(player);
						}}
						><p class="">sit</p>
					</button>
				{/if}
				<button
					class="button"
					on:click={() => {
						stacked(player);
					}}
					><p class="">stacked</p>
				</button>
				<button
					class="button"
					on:click={() => {
						buyIn(player);
					}}
					><p class="">buy in</p>
				</button>
				<button
					class="button"
					on:click={() => {
						cashOut(player);
					}}
					><p class="">cash out</p>
				</button>
			</div>
		</div>
	{/each}
	{#if $playerNames.filter((player) => !$playersWithChips.includes(player)).length > 0}
		<p class="pt-5"><b class="italic text-slate-400 ">without chips:</b></p>
	{/if}
	<div class="grid grid-flow-row ">
		{#each $playerNames.filter((player) => !$playersWithChips.includes(player)) as player}
			<div class="grid grid-flow-col col-span-3 hover:bg-slate-800">
				<div class="grid grid-flow-row grid-rows-2 justify-between">
					<div class="grid grid-flow-row sm:grid-flow-col">
						<b class="md:pr-5">{player}</b>
						{$playersSitting.includes(player) ? '' : '🧍 '}
					</div>
					<PlayerEquation {player} />
				</div>
				<div class="grid grid-flow-col justify-items-end col-span-2">
					<button
						class="button  "
						on:click={() => {
							buyIn(player);
						}}>buy in</button
					>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.button {
		@apply text-sm md:text-base;
		padding-inline: 1rem;
	}
</style>
