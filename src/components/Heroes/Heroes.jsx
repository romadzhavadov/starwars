import { useEffect, useState, useMemo, useCallback } from 'react';
import styles from './Heroes.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, fetchPeople } from '../../redux/peopleSlice';
import debounce from 'lodash.debounce'; 
import { Link } from 'react-router-dom';
import React from 'react';
import { Loading, Error } from '../Helpers/Helpers'

function Heroes() {
  const { data, isLoading, page, error } = useSelector((state) => state.people);
  const dispatch = useDispatch();

  // we make the state of heroes
  const [displayedHeroes, setDisplayedHeroes] = useState([]);

  // download the heroes page from the server
  useEffect(() => {
    dispatch(fetchPeople(page));
  }, [dispatch, page]);

  // we update the state of the heroes in accordance with the results obtained earlier in the request
  useEffect(() => {
    if (data?.results) {
      setDisplayedHeroes((prevHeroes) => [...prevHeroes, ...data.results]);
    }
  }, [data]);

  // we use and memoize the scroll processing function with debounce to get infinite scroll and reduce the number of requests to the server 
  // and smooth update of heroes

  const handleScroll = useCallback(
    debounce(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      // Checking if the user has reached the end of the page
      if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
        if (page >= 9) {
          return;
        }
        dispatch(setPage(page + 1));
      }
    }, 300), [isLoading, page, dispatch]
  );

  // add and remove the scroll event handler
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // memoization of the depicted heroes
  const renderedHeroes = useMemo(() => {
    return displayedHeroes.map((hero) => (
      <Link to={`/${hero.id}`} key={hero.id} className={styles.card}>
        <h2>{hero.name}</h2>
        <div className={styles.wrap}>
          <img
            className={styles.img}
            src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
            alt={hero.name}
          />
        </div>
        <p><strong>Height:</strong> {hero.height}</p>
        <p><strong>Mass:</strong> {hero.mass}</p>
        <p><strong>Gender:</strong> {hero.gender}</p>
        <p><strong>Birth Year:</strong> {hero.birth_year}</p>
      </Link>
    ));
  }, [displayedHeroes]);

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

  return (
    <div className='container'>
      <div className={styles.heroes}>
        <h1 className={styles.title}>Star Wars Heroes</h1>

        <div className={styles.cardContainer}>
          {renderedHeroes}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Heroes);

