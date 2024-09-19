<template>
    <div class="section">
      <h2 class="title">Populares da semana</h2>
      <div class="poster-grid">
        <div class="shape path arrow">
          <svg width="32" height="64" viewBox="10 451 50 63">
            <path d="M59,451 L17,482.941 L59,514"/>
          </svg>
        </div>
        <div class="poster">Em trabalho</div>
        <div class="poster">Em trabalho</div>
        <div class="poster">Em trabalho</div>
        <div class="poster">Em trabalho</div>
        <div class="shape path arrow">
          <svg width="32" height="64" viewBox="1135 774 49 65">
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
    font-size: 30px;
    color: black;
    margin-bottom: 20px;
    padding-left: 220px;
    text-align: start;
  }
  
  .poster-grid {
    gap: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .poster {
    width: 223.75px;
    height: 335px;
    border-radius: 12px;
    background-color: #b1b2b5;
    border: 1px solid black;
    text-align: center;
    padding-top: 150px;
  }
  </style>
  