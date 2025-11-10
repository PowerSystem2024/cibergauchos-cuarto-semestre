import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Card } from "../components/ui/Card.jsx";

function HomePage() {
  const data = useContext(AuthContext);

  return (
    <Card>
      <h2 className="font-bold justify-center text-2xl py-4">
        Desarrollando una Aplicación PERN con Autenticación de Usuarios y CRUD
      </h2>
      <h3>
        El stack Pern (PostgreSQL, Express, React, Node) es una combinación de
        tecnologías utilizada para desarrollar aplicaciones web completas.{" "}
        <br />
        PostgreSQL es un sistema de gestión de bases de datos relacional,
        Express es un framework web para Node.js, React es una biblioteca de
        JavaScript para construir interfaces de usuario y Node.js es un entorno
        de ejecución para JavaScript en el servidor.
      </h3>
    </Card>
  );
}

export default HomePage;
