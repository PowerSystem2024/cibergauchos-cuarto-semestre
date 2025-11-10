import { Card, Button } from "../ui";
import { useTareas } from "../../context/TareasContext";
import { useNavigate } from "react-router-dom";
import { PiTrashSimple, PiPencil } from "react-icons/pi";

export function CardTareas({ tarea }) {
  const { eliminarTarea } = useTareas();
  const navigate = useNavigate();
  return (
    <Card key={tarea.id} className="py-4 px-7 flex justify-center flex-col">
      <div>
        <h1 className="text-2xl font-bold">{tarea.titulo}</h1>
        <p className="py-4">{tarea.descripcion}</p>
      </div>
      <div className="flex justify-end gap-x-2">
        <Button onClick={() => navigate(`/tareas/editar/${tarea.id}`)}>
          <PiPencil size={20} />
          Editar
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-700"
          onClick={async () => {
            if (confirm("¿Estás seguro de eliminar esta tarea?")) {
              await eliminarTarea(tarea.id);
            }
          }}
        >
          <PiTrashSimple size={20} />
          Eliminar
        </Button>
      </div>
    </Card>
  );
}

export default CardTareas;
