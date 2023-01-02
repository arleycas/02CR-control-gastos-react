import { useState, useEffect } from 'react';
import iconCerrar from '../assets/cerrar.svg'
import Mensaje from './Mensaje';

export default function Modal({ setModal, animarModal, setAnimarModal, guardarGasto, objGastoEditar }) {
  const [mensaje, setMensaje] = useState('')
  const [nombreGasto, setNombreGasto] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')
  

  useEffect(() => {
    // Si el objGastoEditar está lleno que se abra el modal
    if(Object.keys(objGastoEditar).length > 0) {
      setNombreGasto(objGastoEditar.nombreGasto)
      setCantidad(objGastoEditar.cantidad)
      setCategoria(objGastoEditar.categoria)
      setId(objGastoEditar.id)
      setFecha(objGastoEditar.fecha)
    }
  }, []) // cuando el componente cargue

  const ocultarModal = () => {
    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombreGasto, cantidad, categoria].includes('')) {
      setMensaje('Todos los campos son obligatorios')

      setTimeout(() => {
        setMensaje('')
      }, 3000);
      return
    }

    guardarGasto({nombreGasto, cantidad, categoria, id, fecha})
  }

  return (
    <div 
      className='modal'>
      <div className="cerrar-modal">
        <img 
          src={iconCerrar}
          alt="Icono cerrar"
          onClick={ocultarModal} />
      </div>

      <form 
      className={`formulario ${ animarModal ? 'animar' : 'cerrar'}`}
      onSubmit={handleSubmit}>
        <legend>{objGastoEditar.nombreGasto ? 'Editar gasto' : 'Nuevo gasto'}</legend>

        { mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje> }

        <div className="campo">
          <label htmlFor="inpNombre">Nombre del gasto</label>
          <input
            id='inpNombre'
            type="text"
            placeholder='Añade el nombre del gasto'
            name=""
            value={nombreGasto}
            onChange={(e)=> {setNombreGasto(e.target.value)}} />
        </div>

        <div className="campo">
          <label htmlFor="inpCantidad">Cantidad</label>
          <input
            id='inpCantidad'
            type="number"
            placeholder='Añade la cantidad del gasto'
            name="" 
            value={cantidad}
            onChange={(e)=> {setCantidad(Number(e.target.value))}} />
        </div>

        <div className="campo">
          <label htmlFor="selCategoria">Categoría</label>
          <select
            id="selCategoria"
            name=""
            value={categoria}
            onChange={(e) => {setCategoria(e.target.value)}}>
              <option value="">-- Seleccione --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos varios</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
          </select>

          <input 
            type="submit"
            value={objGastoEditar.nombreGasto ? 'Guardar cambios' : 'Añadir gasto'} />
        </div>

      </form>
    </div>
  )
}
