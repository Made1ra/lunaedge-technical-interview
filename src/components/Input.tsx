import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, { placeholder: string | undefined }>(
    ({ placeholder }: { placeholder: string | undefined }, ref) => {
        return (
            <input
                ref={ref}
                placeholder={placeholder}
                className="w-max h-10 rounded-lg border mx-2 px-3 py-4 gap-2"
            />
        );
    }
);

export default Input;
