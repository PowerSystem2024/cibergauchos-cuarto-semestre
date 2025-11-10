import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Conteiner, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { signin, errors } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);
    if (user) {
      navigate("/perfil");
    }
  });
  return (
    <Conteiner className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card className="w-[400px] p-6">
        {errors &&
          errors.map((error, index) => (
            <p
              key={index}
              className="text-white bg-red-500 text-center text-sm mb-2 py-2"
            >
              {error.message}
            </p>
          ))}
        <h2 className="text-4xl font-bold my-2 text-center">Iniciar sesión</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <Label htmlFor="password" className="mt-4">
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />
          <Button className="w-full mt-4 justify-center" type="submit">
            Iniciar sesión
          </Button>
        </form>
        <div className="flex justify-between my-4">
          <p className="text-sm text-gray-400 mt-4">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </Card>
    </Conteiner>
  );
}

export default LoginPage;
