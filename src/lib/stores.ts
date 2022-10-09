import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export const players: Writable<string[]> = writable([]);
const ledgerVal = browser && localStorage.ledger ? JSON.parse(localStorage.ledger) : [];
export const ledger: Writable<Entry[]> = writable(ledgerVal);
if (browser) ledger.subscribe((ledger) => (localStorage.ledger = JSON.stringify(ledger)));
const stateVal = browser && !isNaN(+localStorage.state) ? +localStorage.state : 0;
export const state: Writable<number> = writable(stateVal);
if (browser) state.subscribe((state) => (localStorage.state = +state));
