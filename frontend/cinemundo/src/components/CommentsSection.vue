<template>
    <div class="container-comentario">
      <h2 class="title">Comentários populares da semana</h2>
      <div class="comment-section">
        <div class="comment-item">
          <div class="poster-comentario">
            <img src="" alt="Poster do filme">
          </div>
          <div class="comment">
            <div class="comment-header">
              <div class="comment-author">Juca Sincerão</div>
              <div class="rating">
                <div></div><div></div><div></div><div></div><div></div>
              </div>
            </div>
            <div class="comment-content">
              Além de romantizar a vida mafiosa, potencialmente glorificando criminosos, o filme apresenta um ritmo lento e uma duração excessiva que podem testar muito a paciência do espectador. Além disso, as personagens femininas são subdesenvolvidas.
            </div>
          </div>
        </div>
  
        <div class="comment-item">
          <div class="poster-comentario">
            <img src="" alt="Poster do filme">
          </div>
          <div class="comment">
            <div class="comment-header">
              <div class="comment-author">Gerald</div>
              <div class="rating">
                <div></div><div></div><div></div><div></div><div></div>
              </div>
            </div>
            <div class="comment-content">
              Uma obra-prima animada que combina uma narrativa rica e simbólica com visuais deslumbrantes. A jornada de crescimento e autodescoberta de Chihiro em um mundo espiritual reflete críticas ao consumismo e à degradação ambiental.
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container-comentario {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .comment-section {
    display: flex;
    justify-content: space-between;
    max-width: 1250px;
    width: 100%;
    gap: 20px;
    padding-left: 280px;
    padding-bottom: 50px;
  }
  
  .comment-item {
    display: flex;
    gap: 10px;
    flex-direction: row;
    width: 48%;
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 8px;
  }
  
  .poster-comentario {
    width: 111.875px;
    height: 167.5px;
    border-radius: 12px;
    background-color: #b1b2b5;
    border: 1px solid black;
    text-align: center;
    padding-top: 50px;
  }
  
  .comment {
    flex: 1;
    background-color: #d9d9d9;
    border-radius: 20px;
    padding: 20px;
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .comment-author {
    font-size: 24px;
    color: #201d1d;
    font-family: 'Quicksand', sans-serif;
    font-weight: 500;
  }
  
  .comment-content {
    font-size: 12px;
    color: black;
    font-family: 'Quicksand', sans-serif;
    font-weight: 500;
  }
  
  .rating {
    display: flex;
    gap: 5px;
  }
  
  .rating div {
    width: 11.5px;
    height: 11px;
    background-color: #c2a404;
    border-radius: 50%;
  }
  </style>
  