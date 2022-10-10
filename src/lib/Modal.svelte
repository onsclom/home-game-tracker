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
			<button on:click={hide}>exit</button>
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
		background-color: white;
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
