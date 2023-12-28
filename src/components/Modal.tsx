import { XMarkIcon } from '@heroicons/react/24/outline';
import getId from '../utilities/getId';

export default function Modal({
    isOpen,
    onClose,
    pokemonSprites
}: {
    isOpen: boolean
    onClose: () => void
    pokemonSprites: Array<string>
}) {
    const handleClose = () => {
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="flex flex-col w-[47.5rem] h-[47.5rem] bg-white rounded-[1.25rem] z-20 fixed top-8 left-[36rem]
        max-sm:w-screen max-sm:top-0 max-sm:right-0 max-sm:rounded-none
        dark:bg-stone-800">
            <button
                className="flex items-center justify-center self-end m-16 w-10 h-10 z-10 rounded-[0.625rem] bg-white
                hover:bg-indigo-500
                active:bg-indigo-800"
                onClick={handleClose}
            >
                <XMarkIcon className="w-6 h-6 text-black" />
            </button>
            <span className="ml-8 mt-[-6.75rem] text-stone-900 text-4xl font-medium font-jost
                max-sm:text-xl
                dark:text-white">
                Modal title
            </span>
            {pokemonSprites.map((pokemonSprite, i) => (
                <div
                    key={getId()}
                    className={`flex justify-center self-center mt-8 -ml-14 w-[40rem] h-40 rounded-[1.25rem] border-2 border-dashed
                    hover:border-indigo-500
                    active:border-indigo-800
                    max-sm:w-[20.9375rem] max-sm:h-[10.46875rem]`}
                >
                    <img src={pokemonSprite} alt={`Pokemon sprite #${i + 1}`} />
                </div>
            ))}
            <div className="flex items-end justify-end mr-4">
                <button
                    onClick={handleClose}
                    className="flex items-center justify-center w-24 h-5 m-4 text-black bg-white rounded
                    sm:h-6
                    md:h-8
                    lg:h-10
                    xl:h-12
                    hover:border-2
                    hover:border-indigo-500
                    active:border-2
                    active:border-indigo-800"
                >
                    Cancel
                </button>
                <button
                    onClick={handleClose}
                    className="flex items-center justify-center w-24 h-5 m-4 text-white bg-indigo-800 rounded
                    sm:h-6
                    md:h-8
                    lg:h-10
                    xl:h-12
                    hover:opacity-90
                    active:opacity-90"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
