import React from 'react';

function RecipeDetails() {
  return (
    <div>
      <p />
      <img data-testid="recipe-photo" src="hh" alt="" />
      <h2 data-testid="recipe-title">Titulo</h2>
      <button
        data-testid="share-btn"
        type="button"
      >
        Compartilhar
      </button>

      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favoritar
      </button>

      <p data-testid="recipe-category" />

      <ul>
        <li
          data-testid="0-ingredient-name-and-measure"
        >
          Ingredientes
        </li>
      </ul>
      <p data-testid="instructions">texto de instruções</p>

      <video
        width="320"
        height="240"
        controls
        data-testid="video"
      >
        <source
          src="movie.mp4"
          type="video/mp4"

        />
        <track
          default
          kind="captions"
          srcLang="en"
          src="/media/examples/friday.vtt"
        />
        Your browser does not support the video tag.
      </video>
      <div
        data-testid="0-recomendation-card"
      >
        <p data-testid="0-recomendation-title">Titulo</p>
        Card
      </div>
      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar
      </button>
    </div>

  );
}

export default RecipeDetails;
