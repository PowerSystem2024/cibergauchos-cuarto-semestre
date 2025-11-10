import { MdTaskAlt, MdAdd, MdVerifiedUser } from "react-icons/md";
import { BiTask, BiUser } from "react-icons/bi";

export const PublicRoutes = [
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Registro",
    path: "/register",
  },
];

export const PrivateRoutes = [
  {
    name: "Perfil",
    path: "/perfil",
    icon: <BiUser />,
  },
  {
    name: "Tareas",
    path: "/tareas",
    icon: <BiTask />,
  },
  {
    name: "Agregar",
    path: "/tareas/crear",
    icon: <MdAdd />,
  },
];
