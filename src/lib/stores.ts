import { browser } from '$app/environment';
import { derived, writable, type Writable, type Readable } from 'svelte/store';

export const ledger: Writable<Entry[]> = writable(
	browser && localStorage.ledger ? JSON.parse(localStorage.ledger) : []
);

if (browser) {
	ledger.subscribe((ledger) => (localStorage.ledger = JSON.stringify(ledger)));
}

export const playerNames: Readable<string[]> = derived(ledger, ($ledger) => [
	...new Set($ledger.map((entry) => entry.name))
]);

export const playerTotals: Readable<{ [key: string]: number }> = derived(ledger, ($ledger) => {
	const totals: { [key: string]: number } = {};
	$ledger.forEach((entry) => {
		if (entry.type == 'buy in') totals[entry.name] = (totals[entry.name] || 0) + entry.amount;
		else if (entry.type == 'cash out')
			totals[entry.name] = (totals[entry.name] || 0) - entry.amount;
	});
	return totals;
});

export const tableSum: Readable<number> = derived(ledger, ($ledger) => {
	let sum = 0;
	$ledger.forEach((entry) => {
		if (entry.type == 'buy in') sum += entry.amount;
		else if (entry.type == 'cash out') sum -= entry.amount;
	});
	return sum;
});

export const playersWithChips: Readable<string[]> = derived(ledger, ($ledger) => {
	const players: Set<string> = new Set();
	$ledger.forEach((entry) => {
		if (entry.type == 'buy in') players.add(entry.name);
		else if (entry.type == 'cash out') players.delete(entry.name);
	});
	return [...players];
});

export const playersSitting: Readable<string[]> = derived(ledger, ($ledger) => {
	let playersSitting: Set<string> = new Set();
	$ledger.forEach((entry) => {
		if (entry.type == 'buy in' || entry.type == 'sit down') playersSitting.add(entry.name);
		else if (entry.type == 'cash out' || entry.type == 'stand up')
			playersSitting.delete(entry.name);
	});
	return [...playersSitting];
});
