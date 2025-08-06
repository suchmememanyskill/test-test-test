<script lang="ts">
    import type { CardEntry } from "./types";
    
    let props: { card: CardEntry, hide_number: boolean } = $props();

    let backgroundColor = $derived.by(() => {
        if (props.card.background_gradient.length <= 1) {
            return props.card.background_gradient[0];
        }

        return `linear-gradient(45deg, ${props.card.background_gradient[0]} 0%, ${props.card.background_gradient[1]} 100%);`
    })
</script>

<div class="card" style={`background: ${backgroundColor};`}>
    <div class="card-content">
        <h1>{props.card.name}</h1>
        <img src={props.card.foreground_image} alt="Image of {props.card.foreground_image}" />
        {#if !props.hide_number}
            <h1 class="number">Count: {props.card.count}</h1>
        {:else}
            <h1 class="number">Count: ?</h1>
        {/if}
    </div>
</div>

<style>
    .card {
        width: 100%;
        height: 100%;
        display: flex;
    }

    .card-content {
        margin: auto;
    }
</style>