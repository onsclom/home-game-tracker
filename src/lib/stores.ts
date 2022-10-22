import { browser } from '$app/environment';
import { derived, writable, type Writable, type Readable } from 'svelte/store';

export const sessionData: Writable<Session> = writable({
	name: '',
	ledger: [],
	tags: []
});

// browser && localStorage.ledger ? JSON.parse(localStorage.ledger) : []
export const sessionNames: Writable<string[]> = writable(
	browser && localStorage.sessionNames ? JSON.parse(localStorage.sessionNames) : []
);

if (browser) {
	sessionData.subscribe((session) => {
		localStorage[session.name] = JSON.stringify(session);
	});
	sessionNames.subscribe((names) => {
		localStorage.sessionNames = JSON.stringify(names);
	});
}

export const playerNames: Readable<string[]> = derived(sessionData, ($sessionData) => [
	...new Set($sessionData.ledger.map((entry) => entry.name))
]);

export const playerNets: Readable<{ [key: string]: number }> = derived(
	sessionData,
	($sessionData) => {
		const totals: { [key: string]: number } = {};
		$sessionData.ledger.forEach((entry) => {
			if (entry.type == 'buy in') totals[entry.name] = (totals[entry.name] || 0) - entry.amount;
			else if (entry.type == 'cash out')
				totals[entry.name] = (totals[entry.name] || 0) + entry.amount;
		});
		return totals;
	}
);

export const playerBuyIns: Readable<{ [key: string]: number }> = derived(
	sessionData,
	($sessionData) => {
		const totals: { [key: string]: number } = {};
		$sessionData.ledger.forEach((entry) => {
			if (entry.type == 'buy in') totals[entry.name] = (totals[entry.name] || 0) + entry.amount;
		});
		return totals;
	}
);

export const playerCashOuts: Readable<{ [key: string]: number }> = derived(
	sessionData,
	($sessionData) => {
		const totals: { [key: string]: number } = {};
		$sessionData.ledger.forEach((entry) => {
			if (entry.type == 'cash out') totals[entry.name] = (totals[entry.name] || 0) + entry.amount;
		});
		return totals;
	}
);

export const tableSum: Readable<number> = derived(sessionData, ($sessionData) => {
	let sum = 0;
	$sessionData.ledger.forEach((entry) => {
		if (entry.type == 'buy in') sum += entry.amount;
		else if (entry.type == 'cash out') sum -= entry.amount;
	});
	return sum;
});

export const playersWithChips: Readable<string[]> = derived(sessionData, ($sessionData) => {
	const players: Set<string> = new Set();
	$sessionData.ledger.forEach((entry) => {
		if (entry.type == 'buy in') players.add(entry.name);
		else if (entry.type == 'cash out') players.delete(entry.name);
	});
	return [...players];
});

export const playersSitting: Readable<string[]> = derived(sessionData, ($sessionData) => {
	let playersSitting: Set<string> = new Set();
	$sessionData.ledger.forEach((entry) => {
		if (entry.type == 'buy in' || entry.type == 'sit down') playersSitting.add(entry.name);
		else if (entry.type == 'cash out' || entry.type == 'stand up')
			playersSitting.delete(entry.name);
	});
	return [...playersSitting];
});
