<script lang="ts">
	import { fade } from 'svelte/transition';
	export let visible = false;

	function hide() {
		visible = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			hide();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if visible}
	<div class="background" on:click={hide} transition:fade={{ duration: 100 }}>
		<div class="inner" on:click|stopPropagation>
			<button class='text-slate-300' on:click={hide}>
				<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3Zm1 15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1Z"/><path fill="currentColor" d="M14.71 9.29a1 1 0 0 0-1.42 0L12 10.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l1.3 1.29l-1.3 1.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l1.29-1.3l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L13.41 12l1.3-1.29a1 1 0 0 0 0-1.42Z"/></svg>
			</button>
			<div class="content">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style>
	.background {
		position: absolute;
		display: flex;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.inner {
		position: relative;
		margin: auto;
		padding: 1rem;
		@apply bg-slate-800;
	}

	button {
		position: absolute;
		margin: 0;
		top: 1rem;
		right: 1rem;
	}

	.content {
		padding: 2rem;
	}
</style>
