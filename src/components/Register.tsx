import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const registerInDb = async (data: any, password: string) => {
  try {
    const response =  await fetch(`http://192.168.5.181:3000/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: password,
    }),
  });
  if (response.ok){
    console.log("FETCH OKAY");
    return true; 
  }
} catch (error){
  console.log("FETCH PAS OKAY");
  return false;
}
};

const sendRegistrationForm = async (data: any, setterRegistration: any, setterError: any ) => {
  const hashedPassword = hashPassword(data.password);
  const requete = await registerInDb(data, hashedPassword);
  console.log("IN TRY")
  requete ? setterRegistration(true) : setterError(true); 
 }



const Register = () => {
  const navigate = useNavigate();

  const [registrationStatus, setRegistrationStatus] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: object) => sendRegistrationForm(data, setRegistrationStatus, setError);
  return (
    <>
    {!registrationStatus ? 
      <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col items-center p-10">
          <div className="flex flex-col gap-4 w-3/4 pb-4">
            <div>
              <label htmlFor="lastname">Nom : </label>
              <input
                type="text"
                className="border w-full"
                {...register("lastname")}
              ></input>
            </div>
            <div>
              <label htmlFor="firstname">Prénom : </label>
              <input
                type="text"
                className="border w-full"
                {...register("firstname")}
              ></input>
            </div>
            <div>
              <label htmlFor="username">Nom d'utilisateur : </label>
              <input
                type="text"
                className="border w-full"
                {...register("username")}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email : </label>
              <input
                type="text"
                className="border w-full"
                {...register("email")}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Mot de passe : </label>
              <input
                type="password"
                className="border w-full"
                {...register("password")}
              ></input>
            </div>
          </div>
          <a href="/register">
            <button className="border py-4 px-8" type="submit">
              Créer mon compte
            </button>
          </a>
          {error && <p className="m-4">Vous avez déjà un compte ! Connectez-vous <Link to="/login" className="underline font-semibold">ici</Link>.</p>}
        </div>
      </form>
      : <div className="flex w-full flex-col items-center p-10 gap-90">
          <p>Félicitations ! Votre compte a bien été créé.</p>
          <button onClick={() => navigate(-2)} className="border py-4 px-8 m-6">Retour</button>
        </div>} 
    </>
  );
};

export default Register;
