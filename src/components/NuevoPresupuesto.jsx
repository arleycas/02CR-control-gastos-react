import { useState } from "react";
import Mensaje from "./Mensaje";

export default function NuevoPresupuesto({ presupuesto, setPresupuesto, setisValidPresupuesto }) {

  const [mensaje, setMensaje] = useState('');

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!Number(presupuesto) || Number(presupuesto) < 0) {
      return setMensaje('No es un presupuesto valido'); 
    }

    setMensaje('')
    setisValidPresupuesto(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>

      <form onSubmit={handlePresupuesto} className='formulario' action="">
        <div className="campo">
          <label htmlFor="">Definir presupuesto</label>
          <input 
            className='nuevo-presupuesto'
            type="number"
            placeholder='Añade tu presupuesto'
            value={presupuesto}
            onChange={(e) => {
              setPresupuesto(Number(e.target.value))
            }} />
        </div>

        <input type="submit" value="Añadir" />

        { mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje> }

      </form>
    </div>
  )
}
