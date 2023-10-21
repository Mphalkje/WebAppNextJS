import { useState } from 'react';
import styles from 'pages/styles.module.css';

type MovieFormProps = {
    onAddMovie: (title: string) => void;
};

const MovieForm: React.FC<MovieFormProps> = ({ onAddMovie }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title) {
            onAddMovie(title);
            setTitle('');
            window.location.reload();
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.movieForm}>
            <input
                type="text"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                }
                placeholder="Enter movie title"
                className={styles.movieInput}
            />
            <button type="submit" className={styles.button}>
                Submit Movie
            </button>
        </form>
    );
};

export default MovieForm;
