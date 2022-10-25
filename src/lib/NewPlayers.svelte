<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let allPlayers: string[];
</script>

<div class="flex justify-end ">
	<div class="grid grid-flow-row min-h-fit pb-20 pt-10 w-[50rem]">
		{#each allPlayers as player, i (player)}
			<div
				animate:flip={{ delay: 200, duration: 300 }}
				out:fade={{ duration: 250 }}
				in:fade={{ duration: 250 }}
				class="grid grid-rows-1 grid-cols-6 grid-flow-col border-b-2 border-slate-500 p-2 m-3"
			>
				<div class="col-span-5 overflow-auto text-4xl ">
					<p>{player}</p>
				</div>
				<button
					class="col-span-1 justify-end flex"
					on:click|preventDefault={() => {
						allPlayers.splice(i, 1);
						allPlayers = allPlayers;
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="3rem"
						height="3rem"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 16 16"
						><g fill="#cbd5e1"
							><path
								d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
							/><path
								fill-rule="evenodd"
								d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
							/></g
						></svg
					>
				</button>
			</div>
		{/each}
	</div>
</div>

<style>
</style>
