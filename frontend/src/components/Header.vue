<template>
    <div id="app">
        <header>
            
            <nav class="logo-title">
                <a href="#" class="logo">
                <router-link><img src="@/assets/CineMundo-Logo.png" alt="CineMundo Logo" /></router-link></a>
                    <a href="#" class="cine-mundo">CineMundo</a>
            </nav>

            <nav class="menu">
                <router-link to="/login" class="menu-item">Login</router-link>

                <router-link to="/films" class="menu-item">Filmes</router-link>
                
                <router-link to="/register" class="menu-item">Lista</router-link>
            
                <div class="menu-rectangle">
                    <input type="text" placeholder="Buscar..." class="search-input" />
                    <img src="@/assets/Lupa.png" alt="Buscar" />
                </div>
            </nav>
        </header>
    </div>
</template>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: 100%;
}

header {
    width: 100vw;

    padding-top: 20px;
    padding-bottom: 20px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.router-link{
    text-decoration: none;
}

.logo-title {
    padding-left: 60px;
    text-decoration: none;

}

.cine-mundo {
    padding-left: 21px;
    font-family: 'Ranchers', sans-serif;
    text-decoration: none;
    font-size: 50px;
    color: black;
}

.menu {
    display: flex;
    gap: 30px;
    align-items: center;
    padding-left: 600px;
}

.menu-item {
    font-family: 'Pragati Narrow', sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: black;
    text-decoration: none;
}

.menu-rectangle {
    margin-right: 60px;
    display: flex;

    height: 40px;
    background: #a1a5b1;
    
    border-radius: 75px;
    width: 239px;
}

.menu-rectangle img {
    padding-top: 2px;

    height: 35px;
    margin-right: 15px;
}

.search-input {
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 24px;
    
    border: none;
    background: none;
    outline: none;

    padding: 5px;
    padding-left: 12px;
    width: 100%;
}
</style>