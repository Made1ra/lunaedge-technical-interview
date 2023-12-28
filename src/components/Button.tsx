export default function Button({
    className,
    children,
    onClick
}: {
    className?: string
    children?: React.ReactNode
    onClick?: () => void
}) {
    return (
        <button
            type="submit"
            onClick={onClick}
            className={`flex items-center justify-center w-24 h-5 mt-4 text-white bg-indigo-800 rounded-sm
            sm:h-6 md:h-8 lg:h-10 xl:h-12
            ${className}`}
        >
            {children}
        </button>
    );
}
