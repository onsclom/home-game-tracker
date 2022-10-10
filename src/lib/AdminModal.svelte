<script lang="ts">
	import { ledger, state } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	export let visible = false;
	let adminJSON = JSON.stringify($ledger, null, 2);
	ledger.subscribe((value) => {
		adminJSON = JSON.stringify(value, null, 2);
	});

	function updateFromAdmin() {
		navigator.clipboard.writeText(adminJSON);
		$ledger = JSON.parse(adminJSON);
		visible = false;
	}

	function reset() {
		$ledger = [];
		visible = false;
		$state = 0;
	}
</script>

<Modal bind:visible>
	<form on:submit|preventDefault={updateFromAdmin}>
		<textarea bind:value={adminJSON} />
		<div>
			<input type="submit" value="update" />
		</div>
		<form />
	</form>
	<div>
		<button on:click={reset}>reset all</button>
	</div>
</Modal>

<style>
	textarea {
		width: 100%;
		height: 10rem;
	}
	div {
		margin: 1rem 0;
	}
</style>
