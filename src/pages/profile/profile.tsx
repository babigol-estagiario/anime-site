import { Button } from '@/components/ui/button';
import { HeartIcon, Play } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

export default function Profile() {
  const [favoritos, setFavoritos] = useState([]);

  
  function favoritar(favoritos) {
    setFavoritos((animesFavoritos) => {
      const animeExistente = animesFavoritos.find((fav) => fav.mal_id === favoritos.mal_id);
      let novosFavoritos;

      if (animeExistente) {
        novosFavoritos = animesFavoritos.filter((fav) => fav.mal_id !== favoritos.mal_id);
        Swal.fire({
          title: "Concluido",
          text: "Você excluiu com sucesso!",
          icon: "warning"
        });
      } else {
        novosFavoritos = [...animesFavoritos, favoritos];
      }
      localStorage.setItem('animesFavoritos', JSON.stringify(novosFavoritos));
      return novosFavoritos;
    });
  }

  useEffect(() => {
    const favoritosSalvos = localStorage.getItem('animesFavoritos');
    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos));
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-zinc-950 min-h-screen text-white">
      {/* Header */}
      <div className="bg-zinc-900 w-full h-16 shadow-md">
        <div className="bg-zinc-800 w-full h-14 flex items-center px-4">
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 duration-300 cursor-pointer">
            <div className="bg-orange-600 rounded-md w-12 h-12 flex justify-center items-center p-2 hover:shadow-lg">
              <Play className="text-black" />
            </div>
            <Button
              onClick={() => (window.location.href = '/')}
              className="text-2xl font-semibold hover:scale-105 hover:text-orange-400 duration-300"
            >
              MyAnimeSite
            </Button>
          </Link>
          <Button
            onClick={() => (window.location.href = '/profile')}
            className="ml-auto text-white bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-md"
          >
            Profile
          </Button>
        </div>
      </div>


      {/* Favorite Animes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6">
        {favoritos.map((favorito, index) => (
          <div
            key={favorito.mal_id}
            className="bg-zinc-800 rounded-lg shadow-lg hover:shadow-xl p-4 flex flex-col items-center space-y-3 overflow-hidden"
          >
            <img
              src={favorito.images?.jpg?.image_url}
              alt={favorito.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-bold text-center truncate">{favorito.title}</h3>
            <HeartIcon
              className={`hover:scale-110 hover:cursor-pointer hover:text-red-500 ${favoritos.some((fav) => fav.mal_id === favorito.mal_id)
                ? 'fill-red-500 text-red-500'
                : ''
                }`}
              onClick={() => favoritar(favorito)}
            />            <Link to={`/anime/${favorito.mal_id}`}>
              <Button className="bg-orange-600 hover:bg-orange-500 text-sm px-4 py-2 rounded-md">
                View Details
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
