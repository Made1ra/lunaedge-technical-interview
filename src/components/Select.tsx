import { useState, forwardRef, ChangeEvent } from 'react';

type Pokemon = {
    name: string;
};

type SelectProps = {
    multiple?: boolean;
    options: Pokemon[];
    onSelectChange?: (selectedPokemon: Pokemon[]) => void;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ multiple, options, onSelectChange }: SelectProps, ref) => {
        const [filter, setFilter] = useState('');
        const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);

        const filteredOptions = options.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(filter.toLowerCase())
        );

        const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
            const selectedOptions = Array.from(e.target.selectedOptions).map(
                (option) => options.find((pokemon) => pokemon.name === option.value) as Pokemon
            );

            setSelectedPokemon(selectedOptions);

            if (onSelectChange) {
                onSelectChange(selectedOptions);
            }
        };
        
        return (
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search Pokemon"
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-max h-8 rounded px-2 py-1"
                />
                <select
                    ref={ref}
                    multiple={multiple}
                    className="w-max h-8 rounded mx-2 px-2 py-1"
                    onChange={handleSelectChange}
                >
                    {filteredOptions.map((pokemon) => (
                        <option key={pokemon.name}>{pokemon.name}</option>
                    ))}
                </select>
            </div>
        );
    }
);

export default Select;
