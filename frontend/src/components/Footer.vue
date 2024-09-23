<template>
    <div class="container">
        <div class="main-content">
            <!-- Seu conteúdo principal aqui -->
        </div>
        <footer class="footer">
            <div class="footer-content">
                <span>Copyright (c) 2024 CineMundo All Rights Reserved</span><br/>
                <span>TV data from</span>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 60vh;
}

.main-content {
    flex-grow: 1;
}

.footer {
    width: 100vw;
    height: 100px;

    background-color: #deb31b;
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-content {
    font-family: "Quicksand", sans-serif;
    font-weight: 600;
    font-style: medium;
    font-size: 20px;

    margin-right: 560px;
}

.footer a {
    text-decoration: underline;
    color: black;
}
</style>
