import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import axios from 'axios';
import { HeartIcon, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function Home() {
  const [animes, setAnimes] = useState([]);
  const [animesTemp, setAnimesTemp] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null)

  async function pegarAnimes(nome = '', genre = '') {
    const API = `https://api.jikan.moe/v4/anime?q=${nome}&genres=${genre}`;
    const resp = await axios.get(API);
    const data = resp.data;
    setAnimes(data.data);
  }

  async function pegarAnimesTemp() {
    const API = `https://api.jikan.moe/v4/seasons/now`;
    const resp = await axios.get(API);
    const data = resp.data;
    setAnimesTemp(data.data);
  }

  async function pegarGeneros() {
    const API = `https://api.jikan.moe/v4/genres/anime`;
    const resp = await axios.get(API);
    const data = resp.data;
    setGenres(data.data);
  }

  function salvar() {

  }


  function handleInputChange(e) {
    const value = e.target.value;
    setPesquisa(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      pegarAnimes(value, selectedGenre); 
    }, 10000); 

    setDebounceTimer(timer);
  }

  function blur() {
    if (pesquisa.trim() === "") {
      pegarAnimes();
      console.log("Pesquisa Feito")
    } else {
      pegarAnimes(pesquisa)
    }
  }

  useEffect(() => {
    pegarAnimes();
    pegarAnimesTemp();
    pegarGeneros();
  }, []);

  useEffect(() => {
    pegarAnimes(pesquisa, selectedGenre);
  }, [pesquisa, selectedGenre]);

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
      {/* Carrossel */}
      <div className="flex justify-center items-center w-48 p-6 rounded-md shadow-lg mt-6">
        <Carousel>
          <CarouselContent>
            {animesTemp.map((animeTemp) => (
              <CarouselItem
                key={animeTemp.mal_id}
                className="flex justify-center p-2"
              >
                <Link to={`/anime/${animeTemp.mal_id}`}>
                  <img
                    src={animeTemp.images.jpg.image_url}
                    alt={animeTemp.title}
                    className="rounded-md shadow-lg w-56 transition hover:scale-105 duration-300"
                  />
                </Link>
              </CarouselItem>
            ))}

          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Pesquisa */}
      <div className="flex flex-row p-2 m-2 gap-2 items-center justify-center">
        <Input
          className="w-64"
          value={pesquisa}
          onChange={handleInputChange}
          onBlur={blur}
          placeholder="Pesquise por nome"
        />
        <Button
          onClick={() => pegarAnimes(pesquisa, selectedGenre)}
          className="bg-zinc-800"
        >
          Pesquisar
        </Button>
        <Select
          onValueChange={(value) => setSelectedGenre(value)}
        >
          <SelectTrigger className="w-[180px] bg-zinc-800 h-10 rounded-md">
            <SelectValue placeholder="Genres" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 p-2 space-y-2 overflow-auto">
            {genres.map((genre) => (
              <SelectGroup key={genre.mal_id}>
                <SelectItem
                  key={genre.mal_id}
                  value={genre.mal_id.toString()}
                  className="outline-none hover:bg-zinc-900 cursor-pointer p-2"
                >
                  {genre.name}
                </SelectItem>
              </SelectGroup>
            ))}

          </SelectContent>
        </Select>
      </div>

      {/* Lista de Animes */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 px-4 w-full max-w-7xl">
        {animes.map((anime) => (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <div className="bg-orange-500 p-4 rounded-md shadow-lg hover:shadow-2xl transition hover:scale-105 duration-300 w-72 flex flex-col items-center">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="rounded-md w-full h-fit object-cover"
              />
              <h1 className="font-bold mt-2 text-lg text-center">{anime.title}</h1>
              <span><HeartIcon /></span>
              <p className="font-semibold mt-1">
                Episodes: {anime.episodes || 'N/A'}
              </p>
              <p className="font-semibold text-sm">
                Rank: #{anime.rank || 'N/A'}
              </p>
              <p className="text-sm">
                Genres: {anime.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
              </p>
              <p className="text-sm">
                {anime.year ? `Year: ${anime.year}` : 'Year: Not Found'}
              </p>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}
