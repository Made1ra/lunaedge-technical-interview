export default function Badge({ children }: { children?: React.ReactNode }) {
    return (
        <div className="w-[0.125rem] h-[0.625rem]">
            {children}
        </div>
    );
}
