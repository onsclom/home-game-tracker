import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export const ledger: Writable<Entry[]> = writable(
	browser && localStorage.ledger ? JSON.parse(localStorage.ledger) : []
);

if (browser) {
	ledger.subscribe((ledger) => (localStorage.ledger = JSON.stringify(ledger)));
}
