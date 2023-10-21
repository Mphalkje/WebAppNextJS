import { NextApiRequest, NextApiResponse } from 'next';

let movies = [
    { id: 1, title: 'Død Snø', seen: false },
    { id: 2, title: 'Max Manus', seen: false },
    { id: 3, title: 'Black Hawk Down', seen: false },
    { id: 4, title: 'American Made', seen: true },
    { id: 5, title: 'Fury', seen: false },
    { id: 6, title: 'Gemini Man', seen: false },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(movies);
  } else if (req.method === 'POST') {
    const { title } = req.body;
    const id = movies.length + 1;
    movies.push({ id, title, seen: false });
    res.status(201).json({ message: 'Movie added successfully' });
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    movies = movies.filter((movie) => movie.id !== id);
    res.status(200).json({ message: 'Movie deleted successfully' });
  } else if (req.method === 'PUT') {
    const { id, seen } = req.body;
    movies = movies.map((movie) =>
      movie.id === id ? { ...movie, seen: seen } : movie
    );
    res.status(200).json({ message: 'Movie updated successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
