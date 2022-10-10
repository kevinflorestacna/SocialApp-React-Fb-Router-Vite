import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";
import bg from './../img/bglogin.jpg'
import { FcGoogle } from "react-icons/fc";

import FormAlert from "../components/FormAlert";
import FormInput from "../components/FormInput";
import { useEffect } from "react";

const Login = () => {
    const navegate = useNavigate();
    const { loginUser,registergoogle,user} = useContext(UserContext);
    const { required, patternEmail, minLength, validateTrim } = formValidate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            await loginUser(email, password);
            navegate("/");
        } catch (error) {
            const { code, message } = errorsFirebase(error);
            setError(code, { message });
        }
    };
    const handleClickGoogle=async() =>{
        try{
            await registergoogle();
        } catch(error){
            console.log(error.code)
        }
      }
    useEffect(()=>{
        if(user!=null){
            navegate('/')
        }
    },[user])  

    return (
        <section className="flex flex-row md:flex-row h-screen items-center">
            <div className="h-screen hidden bg-blue-600 lg:block md:w-1/2 xl:w-2/3">
                <img src={bg} className="w-full h-full object-cover" alt=""/>
            </div>
            <div className="bg-white items-center justify-center flex md:mx-auto md:max-w-md lg:max-w-full w-full md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12">
                <div className="w-full h-full">
                    <h1 className="text-xl md:text-2xl text-center font-bold mb-12">SOCIAL REACT APP FIREBASE</h1>
                    <h1 className="text-xl font-bold leading-tight mb-6">Ingresar</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-6">
                            <label>Correo</label>
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
                        </div>
                        <div className="mt-4">
                            <label>Contraseña</label>
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
                        </div>
                        <div>
                            <a href="#">Olvidaste tu contraseña</a>
                        </div>
                        <button type="submit">Acceder</button>
                        <hr className="my-6 border-x-gray-300 w-full"/>
                    </form>
                    <button onClick={handleClickGoogle}>
                            <div>
                                <FcGoogle className="inline"></FcGoogle>
                                <span className="ml-4">
                                    Ingresar usando Google
                                </span>
                            </div>
                        </button>
                        <p>
                            No tienes cuenta?
                            <a>Crear una cuenta Aquí</a>
                        </p>
                        <p>&copy; 2022 SocialApp</p>
                </div>
            </div>
        </section>
    );
};

export default Login;