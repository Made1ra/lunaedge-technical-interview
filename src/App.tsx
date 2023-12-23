import { useState, useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Input from './components/Input';
import Select from './components/Select';
import Button from './components/Button';
import Modal from './components/Modal';

type FormData = {
  firstName: string;
  lastName: string;
  pokemonTeam: {
    pokemon: string;
  }[];
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
  const [value, setValue] = useState<Array<Pokemon>>([{ name: 'bulbasaur' }]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const ref = useRef<HTMLDivElement>(null);

  const baseUrl = 'https://pokeapi.co/api/v2';

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col align-center justify-center"
      >
        <div className="flex flex-col align-center justify-center mt-8">
          <label htmlFor="firstName">First Name</label>
          <Input
            {...register('firstName', {
              required: 'This information is required.',
              minLength: 2,
              maxLength: 12,
              pattern: /^[A-Za-z]+$/i,
            })}
            placeholder="First Name"
            ref={firstNameInputRef}
          />
          {errors.firstName && <span>This information is required.</span>}
        </div>
        <div className="flex flex-col align-center justify-center mt-4">
          <label htmlFor="lastName">Last Name</label>
          <Input
            {...register('lastName', {
              required: 'This information is required.',
              minLength: 2,
              maxLength: 12,
              pattern: /^[A-Za-z]+$/i,
            })}
            placeholder="Last Name"
            ref={lastNameInputRef}
          />
          {errors.lastName && <span>This information is required.</span>}
        </div>
        <div className="flex flex-col align-center justify-center mt-4">
          <label htmlFor="pokemonTeam">Select your Pokemon Team (4 Pokemon)</label>
          <Select
            {...register('pokemonTeam', {
              required: 'This information is required.',
              validate: (value) => value?.length === 4 || 'Select exactly 4 Pokemon'
            })}
            ref={ref}
            multiple
            options={pokemons}
            value={value}
            onChange={(o) => setValue(o)}
          />
          {errors.pokemonTeam && <span>{errors.pokemonTeam.message}</span>}
        </div>
        <div className="flex align-center justify-center">
          <Button>Submit</Button>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
