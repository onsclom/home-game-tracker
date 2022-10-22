<script lang="ts">
	import { sessionNames } from '$lib/stores';
	import { fade } from 'svelte/transition';
	import RightArrow from '$lib/RightArrow.svelte';
</script>

<main
	in:fade={{ delay: 250, duration: 250 }}
	out:fade={{ duration: 250 }}
	class="p-10  flex flex-col"
>
	<h1>home game tracker</h1>

	<span class="text-slate-400"
		>this is an app that makes it easier to be a banker and collect stats for home games</span
	>

	<p class="my-10 ">
		<a href="/create-session">
			<div
				class="bg-transparent hover:bg-slate-300/20 transition-colors text-slate-100 font-semibold  py-3 px-6  hover:border-transparent rounded flex flex-row max-w-fit"
			>
				Create a new session
				<RightArrow class="text-slate-100 ml-2 item" />
			</div>
		</a>
	</p>
	<div class="px-6 w-1/2">
		<label class="text-3xl border-b-2 border-slate-300/40 min-w-max" for="sessions">Sessions</label>
		<ul id="sessions">
			{#each $sessionNames as sessionName}
				<li
					class="bg-transparent hover:bg-slate-300/20 transition-colors text-slate-100 font-semibold py-3 px-6  hover:border-transparent rounded max-w-full"
				>
					<a
						class="grid grid-flow-col justify-between"
						href={`/session/${encodeURIComponent(sessionName)}`}
					>
						<p>
							{sessionName}
						</p>
						<RightArrow class="" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</main>

<style>
	h1 {
		font-size: 4rem;
		font-style: italic;
		justify-self: end;
	}
</style>
