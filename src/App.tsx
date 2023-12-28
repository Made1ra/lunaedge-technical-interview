import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StarIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Modal from './components/Modal';

type FormData = {
  firstName: string;
  lastName: string;
  pokemonTeam: string[];
};

type Pokemon = {
  name: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [pokemonSprites, setPokemonSprites] = useState<Array<string>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseUrl = 'https://pokeapi.co/api/v2';

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const selectedPokemons = data.pokemonTeam;
    const spritePromises = selectedPokemons.map(async (pokemonName) => {
      try {
        const response = await axios.get(`${baseUrl}/pokemon/${pokemonName}`);
        return response.data.sprites.front_default;
      } catch (error) {
        console.error(`Error fetching sprite for ${pokemonName}:`, error);
        return null;
      }
    });

    const sprites = await Promise.all(spritePromises);
    setPokemonSprites(sprites.filter((sprite) => sprite !== null));

    openModal();
    reset();
  };

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await axios.get(`${baseUrl}/pokemon`);
        setPokemons(response.data.results);
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };
    getPokemons();
  }, []);

  return (
    <div className="flex align-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col align-center justify-center">
        <div className="flex flex-col align-center justify-center mt-8">
          <label htmlFor="firstName" className="ml-2">First Name</label>
          <input
            {...register('firstName', {
              required: 'This information is required.',
              minLength: 2,
              maxLength: 12,
              pattern: /^[A-Za-z]+$/i,
            })}
            placeholder="First Name"
            className="w-max h-10 rounded-lg border mx-2 px-3 py-4 gap-2
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
          {errors.firstName && <span>This information is required.</span>}
        </div>
        <div className="flex flex-col align-center justify-center mt-4">
          <label htmlFor="lastName" className="ml-2">Last Name</label>
          <input
            {...register('lastName', {
              required: 'This information is required.',
              minLength: 2,
              maxLength: 12,
              pattern: /^[A-Za-z]+$/i,
            })}
            placeholder="Last Name"
            className="w-max h-10 rounded-lg border mx-2 px-3 py-4 gap-2
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
          {errors.lastName && <span>This information is required.</span>}
        </div>
        <div className="flex flex-col align-center justify-center mt-4">
          <label htmlFor="pokemonTeam">Select your Pokemon Team (4 Pokemon)</label>
          <select
            {...register('pokemonTeam', {
              validate: (value) => value?.length === 4 || 'Select exactly 4 Pokemon',
            })}
            multiple
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {pokemons.map((pokemon) => (
              <option key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
          {errors.pokemonTeam && <span>{errors.pokemonTeam.message}</span>}
        </div>
        <div className="flex align-center justify-center">
          <button
            type="submit"
            className="flex items-center justify-center w-32 h-5 mt-4 text-white bg-indigo-800 rounded-sm
            sm:h-6 md:h-8 lg:h-10 xl:h-12
            hover:opacity-90
            active:opacity-90"
          >
            <StarIcon className="w-6 h-6 fill-current mx-2" />
            Submit
            <ChevronDownIcon className="w-6 h-6 mx-2" />
          </button>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        pokemonSprites={pokemonSprites}
      />
    </div>
  );
};
