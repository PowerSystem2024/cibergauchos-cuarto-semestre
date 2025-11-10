import { Link, useLocation } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./navigation";
import { Conteiner } from "../ui";
import { useAuth } from "../../context/AuthContext";
import { twMerge } from "tailwind-merge";
import { BiLogOut } from "react-icons/bi";

function Navbar() {
  const location = useLocation();
  const { isAuth, signout, user } = useAuth();
  return (
    <nav className="bg-zinc-950 ">
      <Conteiner className="flex sm:justify-between justify-center px-20 py-3">
        <Link to="/">
          <h1 className="text-2xl font-bold text-sky-500">PROYECT PERN</h1>
        </Link>
        <ul className="flex gap-x-3 items-center justify-center">
          {isAuth ? (
            <>
              {PrivateRoutes.map(({ name, path, icon }) => (
                <li key={name}>
                  <Link
                    to={path}
                    className={twMerge(
                      "text-slate-300  items-center flex px-2 py-1",
                      location.pathname === path && "bg-sky-500"
                    )}
                  >
                    {icon}
                    <span className="hidden sm:block">{name}</span>
                  </Link>
                </li>
              ))}
              <li
                onClick={() => signout()}
                className="text-slate-300  cursor-pointer hover:bg-red-600 px-3 py-1"
              >
                <span className="hidden sm:block">Salir</span>
                <BiLogOut className="inline ml-1 mb-1" />
              </li>
              <li className="flex gap-x-2 items-center justify-center">
                <img
                  src={user?.gravatar}
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
                <span className="font-medium">{user?.name}</span>
              </li>
            </>
          ) : (
            PublicRoutes.map(({ name, path, icon }) => (
              <li key={name}>
                <Link
                  to={path}
                  className={twMerge(
                    "text-slate-300  items-center flex px-3 py-1",
                    location.pathname === path && "bg-sky-500"
                  )}
                >
                  {icon} {name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </Conteiner>
    </nav>
  );
}

export default Navbar;
