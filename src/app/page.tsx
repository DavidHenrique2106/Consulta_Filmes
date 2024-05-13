'use client'

import React, { useState } from 'react';
import axios from 'axios';

const apiKey = "e1ba7419"; 

interface MovieData {
    title: string;
    year: string;
    poster: string;
    plot: string;
    actors: string;
    director: string;
    genre: string;
    rated: string;
    runtime: string;
    imdbRating: string;
    imdbVotes: string;
}

async function searchMovie(movieTitle: string): Promise<MovieData> {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`);
        const data = response.data;

        if (data.Response === "True") {
            return {
                title: data.Title,
                year: data.Year,
                poster: data.Poster,
                plot: data.Plot,
                actors: data.Actors,
                director: data.Director,
                genre: data.Genre,
                rated: data.Rated,
                runtime: data.Runtime,
                imdbRating: data.imdbRating,
                imdbVotes: data.imdbVotes,
            };
        } else {
            throw new Error(data.Error);
        }
    } catch (error) {
        throw new Error("Ocorreu um erro ao buscar o filme. Por favor, tente novamente.");
    }
}

export default function Home() {
    const [movieTitle, setMovieTitle] = useState("");
    const [movieData, setMovieData] = useState<MovieData | null>(null);
    const [error, setError] = useState("");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
            const data = await searchMovie(movieTitle);
            setMovieData(data);
            setError("");
        } catch (error) {
            setMovieData(null);
            setError((error as Error).message);
        }
    }

    return (
        <div className='App' style={{textAlign: 'center'}}>
            <h1>Consulta filmes ( Atividade Faculdade )</h1>
            <h1>Feito com TypeScript e Next.js</h1> <br /><br /><br />
            <h1>Pesquisar Filme</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={movieTitle} 
                    onChange={(e) => setMovieTitle(e.target.value)} 
                    placeholder="Digite o nome do filme"
                />
                <button type="submit">Pesquisar Filmes</button>
            </form>
            {error && <p>{error}</p>}
            {movieData && (
                <div>
                    <h2>{movieData.title} ({movieData.year})</h2>
                    <p>{movieData.plot}</p>
                    <p>Diretor: {movieData.director}</p>
                    <p>Atores: {movieData.actors}</p>
                    <p>Gênero: {movieData.genre}</p>
                    <p>Classificação: {movieData.rated}</p>
                    <p>Duração: {movieData.runtime}</p>
                    <p>IMDb Rating: {movieData.imdbRating} ({movieData.imdbVotes} votos)</p>
                    <img src={movieData.poster} alt={movieData.title} />
                </div>
            )}
        </div>
    );
}
