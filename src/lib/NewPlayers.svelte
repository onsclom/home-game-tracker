<script lang="ts">
    import {fade, scale} from 'svelte/transition'
    import { flip } from 'svelte/animate';

    export let allPlayers: string[];
    let playerBuyIns: {[key: string]: number} = {}
    export let startBuyin;
</script>

<div class="p-5">


        <div  class="input-wrapper">
        <input placeholder=" " id="new-name" class="name-input"  on:submit|preventDefault on:keydown={(e) => {
            if(e.code === 'Enter' && e.currentTarget.value.replace(/\s/g, "") !== ""){
                allPlayers = [...new Set([...allPlayers, e.currentTarget.value] )]
                e.currentTarget.value = ''}}}>
            <label class='name-input-label' for='new-name'>New Player</label>
    </div>

    <div class='grid grid-flow-row w-72 '>
        {#each allPlayers as player, i (player)}
            <div animate:flip="{{ delay:200, duration: 300 }}" out:fade="{{ duration: 250 }}" in:fade="{{ duration: 250 }}" class="grid grid-rows-1 grid-cols-6 grid-flow-col items-center w-10/12 ">
                <div class='col-span-5 overflow-auto '>
                    <p>{player}</p>
                </div>
                <button class="col-span-1 w-1/2 flex justify-end" on:click|preventDefault={() => {
                    allPlayers.splice(i, 1)
                    allPlayers = allPlayers}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="#cbd5e1"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></g></svg>
                </button>
            </div>
        {/each}
    </div>



</div>

<style>
    .input-wrapper{
        position: relative;
        width: 20rem;
        height: 3rem;
        margin-block: 1rem;
    }

    .name-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 2px solid gray;
        border-radius: 0.25rem;
        font-family: inherit;
        font-size: inherit;
        color: white;
        outline: none;
        padding: 1.25rem;
        background: none;
    }


    .name-input-label{
        @apply bg-slate-900;
        position: absolute;
        left: 1rem;
        top: 0.8rem;
        padding: 0 0.5rem;
        border-radius: 1rem;
        color: white;
        cursor: text;
        transition: top 100ms ease-in-out, left 100ms ease-in-out, font-size 100ms ease-in-out;
    }
    .name-input:focus{
        @apply border-cyan-200
    }

    .name-input:focus ~ .name-input-label,
    .name-input:not(:placeholder-shown).name-input:not(:focus) ~ .name-input-label {
        top: -0.5rem;
        font-size: 0.8rem;
        left: 0.8rem;
    }

</style>