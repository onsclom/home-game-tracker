import { writable, type Writable } from 'svelte/store';

export const players: Writable<string[]> = writable([]);
export const ledger: Writable<Entry[]> = writable([]);
export const state: Writable<number> = writable(0);
