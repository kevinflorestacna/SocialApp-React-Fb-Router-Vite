import { forwardRef } from "react";
const FormInput = forwardRef(
    ({ children, type, placeholder, onChange, onBlur, name }, ref) => {
        return (
            <div className="md:w-2/3">
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                />
                {children}
            </div>
        );
    }
);
export default FormInput;