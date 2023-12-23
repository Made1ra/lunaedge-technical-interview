import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, { placeholder: string | undefined }>(
    ({ placeholder }: { placeholder: string | undefined }, ref) => {
        return (
            <input
                ref={ref}
                placeholder={placeholder}
                className="w-max h-10 rounded-lg border mx-2 px-3 py-4 gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
        );
    }
);

export default Input;
