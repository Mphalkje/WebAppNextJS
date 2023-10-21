import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import MovieForm from '../components/MovieForm';
import Link from 'next/link';

interface Movie {
    id: number;
    title: string;
    seen: boolean;
}

const Index = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetch('/api/movies')
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    const addNewMovie = async (title: string) => {
        const response = await fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: title }),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to My Movie List</h1>
            <Link href="/seenMovies">
                <button className={styles.button}>Seen Movies</button>
            </Link>
            <div className={styles.moviesContainer}>
                <h2 className={styles.moviesTitle}>Movies</h2>
                <ul className={styles.moviesList}>
                    {movies.map((movie) => (
                        <li key={movie.id} className={styles.movieItem}>
                            {movie.title}{' '}
                            <button
                                onClick={() => {
                                    fetch('/api/movies', {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ id: movie.id }),
                                    })
                                        .then((res) => res.json())
                                        .then(() => {
                                            setMovies(movies.filter((m) => m.id !== movie.id));
                                        })
                                        .catch((error) => console.error('Error:', error));
                                }}
                                className={styles.button}
                            >
                                Remove
                            </button>
                            <button
                                onClick={() => {
                                    fetch('/api/movies', {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ id: movie.id, seen: true }),
                                    })
                                        .then((res) => res.json())
                                        .then(() => {
                                            setMovies(
                                                movies.map((m) =>
                                                    m.id === movie.id ? { ...m, seen: true } : m
                                                )
                                            );
                                        })
                                        .catch((error) => console.error('Error:', error));
                                }}
                                className={styles.button}
                            >
                                Mark as Seen
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <MovieForm onAddMovie={addNewMovie} />
        </div>
    );
};

export default Index;
