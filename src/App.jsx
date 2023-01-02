import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Filtro from "./components/Filtro";
import Modal from './components/Modal'
import { generarId } from './helpers'
import iconNuevoGasto from './assets/nuevo-gasto.svg'

function App() {
  const INITIAL_PRESUPUESTO = Number(localStorage.getItem('presupuesto')) ?? 0;
  const [presupuesto, setPresupuesto] = useState(INITIAL_PRESUPUESTO)
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false)

  const docRef = useRef(null); // para hacer referencia al objeto "document"
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const INITIAL_GASTOS = JSON.parse(localStorage.getItem('arrGastos')) ?? []
  const [arrGastos, setArrGastos] = useState(INITIAL_GASTOS)
  const [objGastoEditar, setObjGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [arrGastosFiltrados, setArrGastosFiltrados] = useState([])

  // para ocultar el modal con la tecla "Escape"
  useEffect(() => {
    docRef.current = document; // aqui se le asigna el objeto document nativo de JS

    docRef.current.addEventListener('keyup', (e) => {
      if (modal && e.key === 'Escape') {
        setAnimarModal(false)

        setTimeout(() => {
          setModal(false)
        }, 500);
      }
    }, true)
  }, [modal])

  useEffect(() => {
    // Si el objGastoEditar está lleno que se abra el modal
    if(Object.keys(objGastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 100);
    }
  }, [objGastoEditar])
  
  useEffect(() => {
    if(filtro) {
      const arrFiltrados = arrGastos.filter(objGasto => objGasto.categoria === filtro)
      setArrGastosFiltrados(arrFiltrados)
    } 

  }, [filtro])
  
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])
  
  useEffect(() => {
    localStorage.setItem('arrGastos', JSON.stringify(arrGastos) ?? [])
  }, [arrGastos])
  

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0) setisValidPresupuesto(true)
  }, [])

  // para abrir el modal
  const handleNuevoGasto = (e) => {
    setModal(true)
    setObjGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 100);
  }

  const guardarGasto = objGasto => {

    if (objGasto.id) {
      // si viene con id, es porque se debe actualizar el gasto
      const arrGastosActualizados = arrGastos.map(objGastoState => objGastoState.id === objGasto.id ? objGasto : objGastoState)
      setArrGastos(arrGastosActualizados)
    } else {
      // si no viene con id, es porque se va a agregar un nuevo gasto
      objGasto.id = generarId();
      objGasto.fecha = Date.now();
      setArrGastos([...arrGastos, objGasto])
    }

    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const arrGastosActualizados = arrGastos.filter(objGastoState => objGastoState.id !== id )
    setArrGastos(arrGastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        arrGastos={arrGastos}
        setArrGastos={setArrGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto} />

      {
        isValidPresupuesto && (
          <>
            <main>
              <Filtro 
                filtro={filtro}
                setFiltro={setFiltro} />

              <ListadoGastos 
                arrGastos={arrGastos} 
                setObjGastoEditar={setObjGastoEditar} 
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                arrGastosFiltrados={arrGastosFiltrados} />
            </main>

            <div className="nuevo-gasto">
              <img 
                src={iconNuevoGasto} 
                alt="Icono nuevo gasto"
                onClick={handleNuevoGasto} />
                
            </div>
          </> )
      }

      { modal && (
        <Modal 
          setModal={setModal}
          setAnimarModal={setAnimarModal}
          animarModal={animarModal}
          guardarGasto={guardarGasto}
          objGastoEditar={objGastoEditar} />
      )}

    </div>
  )
}

export default App
