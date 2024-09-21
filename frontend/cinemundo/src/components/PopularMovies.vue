<template>
    <div class="section">
        <h2 class="title">Populares entre amigos</h2>
        <div class="poster-grid">
            <div class="shape path arrow">
                <svg width="32" height="64" viewBox="10 451 50 63">
                    <path d="M59,451 L17,482.941 L59,514"/>
                </svg>
            </div>
            <div class="poster"><img src="@/assets/Dune_Part02.png" alt="Dune Part 2"/></div>
            <div class="poster">Em trabalho</div>
            <div class="poster">Em trabalho</div>
            <div class="poster">Em trabalho</div>
            <div class="shape path arrow">
                <svg width="32" height="64" viewBox="1135 774 48.405 63.928">
                    <path d="M1135,836.984 L1177.707,805.995 L1136.415,774"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>
.section {
    margin: 70px;
}

.title {
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-style: medium;
    font-size: 24px;

    display: flex;
    justify-content: center;

    margin-right: calc(650px + 40px);
    margin-bottom: 20px;
}

.poster-grid {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.poster {
    width: 224px;
    height: 340px;
    border-radius: 12px;
    background-color: #b1b2b5;
    border: 1px solid black;
    text-align: center;
}

.poster img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
}
</style>
