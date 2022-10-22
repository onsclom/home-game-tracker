<script lang="ts">
	import { sessionData } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	export let visible = false;
	let adminJSON = JSON.stringify($sessionData.ledger, null, 2);
	sessionData.subscribe((session) => {
		adminJSON = JSON.stringify(session.ledger, null, 2);
	});

	function updateFromAdmin() {
		navigator.clipboard.writeText(adminJSON);
		$sessionData.ledger = JSON.parse(adminJSON);
		$sessionData = $sessionData;
		visible = false;
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
