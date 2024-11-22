import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Play } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router';

export default function Anime() {
    const { id } = useParams()

    const [anime, setAnime] = useState({})

    async function pegarAnime(anime) {
        const API = `https://api.jikan.moe/v4/anime/${anime}`
        const resp = await axios.get(API)
        const data = resp.data
        setAnime(data.data)
    }

    useEffect(() => {
        pegarAnime(id)
    }, [id])






    return (
        <div className="flex flex-col items-center bg-zinc-950 min-h-screen text-white overflow-hidden">
            {/* Header */}
            <div className="bg-zinc-900 w-full h-16">
                <div className="bg-zinc-800 w-full h-14 flex items-center">
                    <div className="hover:scale-105 flex flex-row items-center duration-300 cursor-pointer">
                        <Link to={'/'}>
                            <div className="bg-orange-600 rounded-md w-14 flex justify-center items-center p-2 m-2 hover:scale-105 duration-300 cursor-pointer">
                                <Play className="text-black fill-black" />
                            </div>
                        </Link>
                        <Button
                            onClick={() => {
                                window.location.href = '/';
                            }}
                            className="font-[Faroeste] font-semibold text-2xl hover:scale-105 duration-300 cursor-pointer"
                        >
                            MyAnimeSite
                        </Button>
                    </div>
                    <Button onClick={() => {
                        window.location.href = "/profile"
                    }}>Profile</Button>
                </div>
            </div>

            {/* Anime */}
            {
                anime ? (
                    <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4">
                        <img
                            src={anime.images?.jpg?.image_url || '/placeholder-image.png'}
                            alt={anime.title || 'Anime'}
                            className="m-2 p-2 w-72"
                        />
                        <div>
                            <h1 className="font-bold m-2 p-2">{anime.title || 'Título não disponível'}</h1>
                            <ol className="list-disc pl-5">
                                <li className="m-2 p-2">Ano: {anime.year || 'Desconhecido'}</li>
                                <li className="m-2 p-2">Rank: #{anime.rank || 'N/A'}</li>
                                <li className="m-2 p-2">Gêneros: {anime.genres?.map(g => g.name).join(', ') || 'N/A'}</li>
                                <li className="m-2 p-2">Nota: {anime.score || 'N/A'}</li>
                                <li className="m-2 p-2">Classificação: {anime.rating || 'N/A'}</li>
                                <li className="m-2 p-2">Produtores: {anime.producers?.map(p => p.name).join(', ') || 'N/A'}</li>
                                <li className="m-2 p-2">Temas: {anime.themes?.map(t => t.name).join(', ') || 'N/A'}</li>
                            </ol>
                            <p className="m-2 p-2">{anime.synopsis || 'Sinopse indisponível.'}</p>
                        </div>
                    </div>

                )
                    : (
                        "Error"
                    )
            }

        </div>
    )
}
