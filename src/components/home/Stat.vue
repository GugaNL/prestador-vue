<template>
    <router-link :to="route" class="stat">
      <div class="stat-icon">
        <i :class="icon" :style="style"></i>
      </div>
      <div class="stat-info">
        <span class="stat-title">{{ title }}</span>
        <span class="stat-value">{{ value }}</span>
      </div>
    </router-link>
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'icon', 'color', 'value', 'route'],
    computed: {
        style() {
            return "color: " + (this.color || "#000")
        }
    }
}
</script>

<style>
    .stat, .stat:hover {
        flex: 1; /*Cresce diante da necessidade */
        display: flex;
        flex-direction: row;
        border-radius: 8px;
        margin-right: 20px;
        margin-bottom: 20px; /*Para garantir que caso quebre a linha não fiquem juntos grudados */
        background-color: #fff;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
        text-decoration: none;
    }

    .stat-icon {
        display: flex;
        align-items: center;
    }

    .stat-icon i {
        font-size: 4rem;
    }

    .stat-info {
        flex: 1; /* Significa que vai crescer dentro de um flex container, que no caso é o .stat */
        display: flex; /*Colocando display flex o torna um flex container */
        flex-direction: column;
        align-items: flex-end;
    }

    .stat-title {
        font-size: 1rem;
    }

    .stat-value {
        font-size: 2.5rem;
    }

</style>