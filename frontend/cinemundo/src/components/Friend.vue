<template>
      <section class="amigos-section">
        <div class="amigo" v-for="(amigo, index) in amigos" :key="index">
          <div class="foto"></div>
          <div class="nome">{{ amigo }}</div>
        </div>
      </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        amigos: [
          'Nome 1',
          'Nome 2',
          'Nome 3',
          'Nome 4',
          'Nome 5',
          'Nome 6',
          'Nome 7',
          'Nome 8',
          'Nome 9',
          'Nome 10',
          'Nome 11',
          'Nome 12',
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* ---------- FONTES DE TEXTO DA PÁGINA ---------- */
  .ranchers-regular {
    font-family: 'Ranchers', sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  
  .pragati-narrow-regular {
    font-family: 'Pragati Narrow', sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  
  .quicksand-medium {
    font-family: 'Quicksand', sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: medium;
  }
  
  /* ---------- FORMATO DO BODY/PÁGINA ---------- */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Quicksand', sans-serif;
    background-color: #e4e4e4;
  }
  
  .container {
    width: 100%;
    height: 100%;
  }

  /* ---------- SEÇÃO DE AMIGOS ---------- */
  .amigos-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
  }
  
  .amigo {
    display: flex;
    align-items: center;
    background: #790c0c;
    border-radius: 42px;
    padding: 10px;
    gap: 10px;
    width: 372.93px;
    height: 118.80px;
  }
  
  .amigo .foto {
    width: 63.96px;
    height: 63.96px;
    background: #d9d9d9;
    border-radius: 9999px;
  }
  
  .amigo .nome {
    font-size: 50px;
    font-family: 'Ranchers', sans-serif;
    font-weight: 400;
    word-wrap: break-word;
  }
  </style>
  