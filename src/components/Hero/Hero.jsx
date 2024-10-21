import { useParams } from 'react-router-dom';
import styles from './Hero.module.scss';
import { useEffect, useCallback, useMemo } from 'react';
import { fetchHeroWithFilmsAndStarships } from '../../redux/heroSlice';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { Loading, NotFound, Error } from '../Helpers/Helpers'

function Hero() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, films, starships, isLoading, error } = useSelector((state) => state.hero);

  // Memorize the dispatch function
  const fetchData = useCallback(() => {
    dispatch(fetchHeroWithFilmsAndStarships(id));
  }, [id, dispatch]);

  // Get Data Poople
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // We memorize movies and ships
  const renderedFilms = useMemo(() => (
    films.length > 0 
      ? films.map((film) => (
          <div key={film.id}>{film.title}</div>
        )) 
      : 'No films found.'
  ), [films]);

  const renderedStarships = useMemo(() => (
    starships.length > 0 
      ? starships.map((starship) => (
          <div key={starship.id}>{starship.name}</div>
        )) 
      : 'No starships found.'
  ), [starships]);

  // add Loading Component if loading
  if (isLoading) {
    return (
      <Loading />
    );
  }
  // add Error Component if error
  if (error) {
    return (
      <Error />
    );
  }

 // add NotFound Component if not found hero or incorrect id
  if (!data) {
    return (
      <NotFound />
    );
  }

  return (
    <div className={styles.heroContainer}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.heroImage}
          src={`https://starwars-visualguide.com/assets/img/characters/${data.id}.jpg`}
          alt={data.name}
        />
      </div>
      <div className={styles.heroDetails}>
        <h1 className={styles.heroName}>{data.name}</h1>
        <p><strong>Height:</strong> {data.height}</p>
        <p><strong>Mass:</strong> {data.mass}</p>
        <p><strong>Gender:</strong> {data.gender}</p>
        <p><strong>Birth Year:</strong> {data.birth_year}</p>
        <p><strong>Films:</strong>{renderedFilms}</p>
        <p><strong>Starships:</strong>{renderedStarships}</p>
      </div>
    </div>
  );
}

export default React.memo(Hero);

