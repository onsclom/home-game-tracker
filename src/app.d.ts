// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

type Entry =
	| { type: 'buy in' | 'cash out'; name: string; amount: number; timestamp: Date }
	| { type: 'stand up' | 'sit down'; name: string; timestamp: Date };

type Session = {
	name: string;
	tags: string[];
	ledger: Entry[];
};
