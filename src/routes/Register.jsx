import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { formValidate } from "../utils/formValidate";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import { errorsFirebase } from "../utils/errorsFirebase";

import FormAlert from "../components/FormAlert";
import FormInput from "../components/FormInput";

import bgregister from "./../img/bgregister.svg"
import bgregister2 from "./../img/bgregister2.svg"
import { FcGoogle } from "react-icons/fc";
import {NavLink} from 'react-router-dom'

const Register = () => {
    const navegate = useNavigate();
    const { registerUser , registergoogle,user} = useContext(UserContext);
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
        <section className="flex flex-row md:flex-row h-screen items-center bg-white">
            <div className="h-screen hidden items-center justify-center bg-rose-600 lg:flex md:w-1/2 xl:w-1/2 ">
                <div className="flex flex-col items-center justify-end">
                    <h3 className="text-white text-semibold text-2xl underline decoration-solid underline-offset-8">Bienvenido a Social - React - App - Firebase</h3>
                    <img src={bgregister} className="w-auto h-auto" alt=""/>
                    <img src={bgregister2} className="w-auto h-auto" alt=""/>
                </div>
            </div>
            <div className="bg-white items-center justify-center flex flex-col md:mx-auto md:max-w-md lg:max-w-full w-full md:w-1/2 xl:w-1/2 px-6 lg:px-16 xl:px-12">
                <div className="w-full h-full">
                    <h1 className="text-gray-700 text-semibold text-2xl underline decoration-solid underline-offset-8 text-center font-bold">Registro</h1>
                    <form onSubmit={handleSubmit(onSubmit)}className="mt-6">
                        <div className="md:flex-row md:items-center py-3">
                        <label className="block text-gray-700 py-2">Correo</label>
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
                        <div className="md:flex-row md:items-center py-3">
                        <label className="block text-gray-700 py-2">Contraseña</label>
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
                        <div className="md:flex-row md:items-center py-3">
                        <label className="block text-gray-700 py-2">Repetir Contraseña</label>
                            <FormInput
                                type="password"
                                placeholder="Repita password"
                                {...register("repassword", {
                                    validate: validateEquals(getValues),
                                })}
                            >
                                <FormAlert error={errors.repassword} />
                            </FormInput>
                        </div>
                        <button type="submit" className="w-full block bg-blue-500 hover:bg-blue-400 px-4 py-3 mt-6 runded-lg font-semibold text-white focus:bg-blue-400 focus:outline-none">Registrarse</button>
                        <hr className="my-6 border-x-gray-300 w-full"/>
                    </form>
                    <button onClick={handleClickGoogle} className="w-full block bg-rose-500 hover:bg-rose-400 px-4 py-3 mt-6 runded-lg font-semibold text-white focus:bg-rose-400 focus:outline-none">
                            <div>
                                <FcGoogle className="inline"></FcGoogle>
                                <span className="ml-4">
                                    Registrate usando Google
                                </span>
                            </div>
                        </button>
                        <p className="flex justify-between py-3">
                            Ya Tienes cuenta?
                            <NavLink to="/login"><span className="text-blue-500 hover:text-rose-500">Ingresa Aqui</span></NavLink>
                        </p>
                        <p className="py-5 text-center">&copy; 2022 SocialApp</p>
                </div>
            </div>
        </section>
    );
};

export default Register;