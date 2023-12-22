export default function Modal({
    isOpen,
    onClose
}: {
    isOpen: boolean
    onClose: () => void
}) {
    const handleClose = () => {
        onClose();
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="flex flex-col w-[47.5rem] h-[57.5rem] bg-stone-50 rounded-[1.25rem] z-20 fixed top-5 right-24
        max-sm:w-screen max-sm:top-0 max-sm:right-0 max-sm:rounded-none
        dark:bg-stone-800">
            <button
                className="self-end m-5 w-10 h-10 rounded-[0.625rem] bg-white bg-center bg-no-repeat
                sm:m-[1.875rem]
                lg:m-5
                hover:bg-indigo-400"
                onClick={handleClose}
            />
        </div>
    );
}
