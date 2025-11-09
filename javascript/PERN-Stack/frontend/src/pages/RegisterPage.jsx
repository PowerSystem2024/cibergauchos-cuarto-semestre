import { Button, Input, Card, Label, Conteiner } from "../components/ui";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signup, errors: setUserErrors } = useAuth();
  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);
    if (user) {
      navigate("/perfil");
    }
  });
  return (
    <Conteiner className="h-[calc(100vh-10rem)] flex justify-center items-center">
      <Card className="w-[400px] p-6">
        {setUserErrors &&
          setUserErrors.map((error, index) => (
            <p
              key={index}
              className="text-white bg-red-500 text-center text-sm mb-2 py-2"
            >
              {error}
            </p>
          ))}
        <h3 className="text-4xl font-bold  my-2 text-center">Registro</h3>
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <Label htmlFor="name">Nombre</Label>
          <Input
            type="text"
            placeholder="Nombre"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500">El nombre es requerido</span>
          )}
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">El email es requerido</span>
          )}
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500">La contraseña es requerida</span>
          )}
          <Button className="w-full mt-4 justify-center">Registrarse</Button>
        </form>
        <div className="flex justify-between my-4">
          <p className="text-sm text-gray-400 mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </Card>
    </Conteiner>
  );
}

export default RegisterPage;
