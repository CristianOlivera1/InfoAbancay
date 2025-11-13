import { useState } from "react";
import { TagsInput } from "react-tag-input-component";

export default function TagInput() {
  const [selected, setSelected] = useState(["Información"]);
  const maxTags = 10;

  const handleChange = (tags: string[]) => {
    // Permite editar y borrar, pero no agregar más de maxTags
    if (tags.length <= maxTags) {
      setSelected(tags);
    } else {
      // Ignora el intento de agregar más
      setSelected(tags.slice(0, maxTags));
    }
  };

  return (
    <div>
      <TagsInput
        value={selected}
        onChange={handleChange}
        name="etiquetas"
        placeHolder="Ingrese etiquetas"
        separators={["Enter", " ", ","]}
        classNames={{
          tag: "text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded",
          input: "text-sm px-1", // 👈 el input sigue activo
        }}
      />
      <p className="text-xs text-gray-500 pt-2">
        Separa las etiquetas espacio, comas o pulsando Enter.
      </p>
      {selected.length >= maxTags && (
        <p className="text-xs text-red-600 pt-2">
          Has alcanzado el máximo de {maxTags} etiquetas.
        </p>
      )}
    </div>
  );
}