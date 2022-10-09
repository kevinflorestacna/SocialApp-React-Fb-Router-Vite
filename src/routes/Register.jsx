import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";

import FormAlert from "../components/FormAlert";
import FormInput from "../components/FormInput";

const Register = () => {
    const navegate = useNavigate();
    const { registerUser } = useContext(UserContext);
    const { required, patternEmail, minLength, validateTrim, validateEquals } =
        formValidate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            await registerUser(email, password);
            navegate("/");
        } catch (error) {
            const { code, message } = errorsFirebase(error);
            setError(code, { message });
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingresa un email"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                >
                    <FormAlert error={errors.email} />
                </FormInput>

                <FormInput
                    type="password"
                    placeholder="Ingresa un password"
                    {...register("password", {
                        minLength,
                        validate: validateTrim,
                    })}
                >
                    <FormAlert error={errors.password} />
                </FormInput>

                <FormInput
                    type="password"
                    placeholder="Repita password"
                    {...register("repassword", {
                        validate: validateEquals(getValues("password")),
                    })}
                >
                    <FormAlert error={errors.repassword} />
                </FormInput>
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;