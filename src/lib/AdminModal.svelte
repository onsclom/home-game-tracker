<script lang="ts">
	import { ledger } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	export let visible = false;
	let adminJSON = JSON.stringify($ledger, null, 2);

	function updateFromAdmin() {
		navigator.clipboard.writeText(adminJSON);
		$ledger = JSON.parse(adminJSON);
		visible = false;
	}
</script>

<Modal bind:visible>
	<p>if you are not austin then pppoof please</p>
	<form on:submit|preventDefault={updateFromAdmin}>
		<textarea bind:value={adminJSON} />
		<input type="submit" value="update" />
		<form />
	</form>
</Modal>

<style>
	div {
		margin: 1rem 0;
	}

	textarea {
		width: 100%;
		height: 10rem;
	}
</style>
