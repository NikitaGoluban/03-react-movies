import { useCallback, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => requestRef.current?.abort();
  }, []);

  async function handleSearch(query: string): Promise<void> {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;

    setMovies([]);
    setSelectedMovie(null);
    setIsError(false);
    setIsLoading(true);
    toast.dismiss('movie-search');

    try {
      const results = await fetchMovies(query, controller.signal);

      if (controller.signal.aborted) return;

      setMovies(results);

      if (results.length === 0) {
        toast('No movies found for your request.', { id: 'movie-search' });
      }
    } catch {
      if (!controller.signal.aborted) setIsError(true);
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
  }

  const handleCloseModal = useCallback((): void => {
    setSelectedMovie(null);
  }, []);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <main>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {!isLoading && !isError && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        )}
      </main>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      <Toaster position="top-right" />
    </div>
  );
}
