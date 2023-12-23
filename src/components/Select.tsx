import { useState, useEffect, useRef, forwardRef } from 'react';
import getId from '../utilities/getId';

export type Pokemon = {
    name: string;
};

type MultipleSelectProps = {
    multiple: true;
    value: Pokemon[];
    onChange: (value: Pokemon[]) => void;
};

type SingleSelectProps = {
    multiple?: false;
    value?: Pokemon;
    onChange: (value: Pokemon | undefined) => void;
};

type SelectProps = {
    options: Pokemon[];
} & (SingleSelectProps | MultipleSelectProps);

const Select = forwardRef<HTMLDivElement, SelectProps>(({ multiple, value, onChange, options }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const clearOptions = () => {
        multiple ? onChange([]) : onChange(undefined);
    };

    const selectOption = (option: Pokemon) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(o => o !== option));
            } else {
                onChange([...value, option]);
            }
        } else {
            if (option !== value) {
                onChange(option)
            }
        }
    };

    const isOptionSelected = (option: Pokemon) => {
        return multiple ? value.includes(option) : option === value;
    };

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return;
            switch (e.code) {
                case 'Enter':
                case 'Space':
                    setIsOpen(prev => !prev);
                    if (isOpen) {
                        selectOption(options[highlightedIndex]);
                    }
                    break;
                case 'ArrowUp':
                case 'ArrowDown': {
                    if (!isOpen) {
                        setIsOpen(true);
                        break;
                    }

                    const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
                    if (newValue >= 0 && newValue < options.length) {
                        setHighlightedIndex(newValue);
                    }
                    break;
                }
                case 'Escape':
                    setIsOpen(false);
                    break;
            }
        }
        containerRef.current?.addEventListener('keydown', handler);

        return () => {
            containerRef.current?.removeEventListener('keydown', handler);
        }
    }, [isOpen, highlightedIndex, options]);

    return (
        <div
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen((prev) => !prev)}
            tabIndex={0}
            className="relative w-80 min-h-6 border border-solid border-gray-700 flex items-center gap-2 p-2 rounded-md outline-none"
        >
            <span className="flex-grow flex gap-2 flex-wrap">
                {multiple
                    ? value.map((v) => (
                        <button
                            key={getId()}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectOption(v);
                            }}
                            className="border border-solid border-gray-700 rounded-md px-2 py-1 flex items-center gap-1 cursor-pointer"
                        >
                            {v.name}
                            <span className="text-sm cursor-pointer">&times;</span>
                        </button>
                    ))
                    : value?.name}
            </span>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    clearOptions();
                }}
                className="text-lg cursor-pointer"
            >
                &times;
            </button>
            <div className="bg-gray-700 h-6 w-0.5"></div>
            <div className="border-t-0.5 border-solid border-gray-700 w-0 h-0"></div>
            <ul className={`absolute mt-1.5 p-0 list-none max-h-36 overflow-y-auto border border-solid border-gray-700 rounded-md w-full left-0 bg-white z-50 ${isOpen ? 'block' : 'hidden'}`}>
                {options.map((option, index) => (
                    <li
                        onClick={(e) => {
                            e.stopPropagation();
                            selectOption(option);
                            setIsOpen(false);
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.name}
                        className={`px-2 py-1 cursor-pointer ${isOptionSelected(option) ? 'bg-indigo-300' : ''} ${index === highlightedIndex ? 'bg-indigo-500 text-white' : ''
                            }`}
                    >
                        {option.name}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default Select;
