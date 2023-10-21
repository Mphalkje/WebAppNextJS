import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

interface Movie {
    id: number;
    title: string;
    seen: boolean;
}

const SeenMovies = () => {
    const [seenMovies, setSeenMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetch('/api/movies')
            .then((res) => res.json())
            .then((data) => {
                const filteredMovies = data.filter((movie: Movie) => movie.seen);
                setSeenMovies(filteredMovies);
            })
            .catch((error) => console.error('Error:', error));
    }, []);

    const removeFromBothLists = async (id: number) => {
        try {
            await fetch('/api/movies', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });
            const remainingMovies = seenMovies.filter((movie) => movie.id !== id);
            setSeenMovies(remainingMovies);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const removeFromSeenList = async (id: number) => {
        try {
            await fetch('/api/movies', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id, seen: false }),
            });
            const remainingMovies = seenMovies.filter((movie) => movie.id !== id);
            setSeenMovies(remainingMovies);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Seen Movies</h1>
            <div className={styles.moviesContainer}>
                <ul className={styles.moviesList}>
                    {seenMovies.map((movie) => (
                        <li key={movie.id} className={styles.movieItem}>
                            {movie.title}
                            <button
                                onClick={() => {
                                    removeFromBothLists(movie.id);
                                }}
                                className={styles.button}
                            >
                                Remove from Both Lists
                            </button>
                            <button
                                onClick={() => {
                                    removeFromSeenList(movie.id);
                                }}
                                className={styles.button}
                            >
                                Remove from Seen List
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <Link href="/">
                <button className={styles.button}>Back to Index</button>
            </Link>
        </div>
    );
};

export default SeenMovies;
