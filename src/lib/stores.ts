import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export const ledger: Writable<Entry[]> = writable(
	browser && localStorage.ledger ? JSON.parse(localStorage.ledger) : []
);
export const state: Writable<number> = writable(
	browser && !isNaN(+localStorage.state) ? +localStorage.state : 0
);

if (browser) {
	ledger.subscribe((ledger) => (localStorage.ledger = JSON.stringify(ledger)));
	state.subscribe((state) => (localStorage.state = +state));
}
