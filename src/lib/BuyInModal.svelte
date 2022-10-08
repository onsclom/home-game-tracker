<script lang="ts">
	import { ledger } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	export let visible = false;

	function handleSumbit() {}
</script>

<Modal bind:visible>
	<h2>buy in</h2>
	<form on:submit|preventDefault={handleSumbit}>
		<button>existing player</button>
		<span>OR</span>
		<button>new player</button>
	</form>
</Modal>

<style>
</style>
