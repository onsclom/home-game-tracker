import { writable, type Writable } from 'svelte/store';
import type { Entry } from './types';

export const players: Writable<string[]> = writable([])
export const ledger: Writable<Entry[]> = writable([])
export const state: Writable<number> = writable(0)