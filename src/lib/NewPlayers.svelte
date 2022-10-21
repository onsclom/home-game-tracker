<script lang="ts">
    export let allPlayers: string[];
</script>


<div>
    {#each allPlayers as player}
        <div class='rounded bg-red-600 p-2 text-white w-20 text-2xl my-5 h-10 min-w-max m-2 flex items-center justify-center shadow-sm'>
            <p>{player}</p>
        </div>
    {/each}
    <input on:submit|preventDefault on:keydown={(e) => {
        if(e.code === 'Enter' && e.currentTarget.value.replace(/\s/g, "") !== "")
        {        
        allPlayers = [...new Set([...allPlayers, e.currentTarget.value] )]
        e.currentTarget.value = ''}} }/>

</div>