import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

export default function Header({ 
  presupuesto, 
  setArrGastos, 
  setPresupuesto, 
  isValidPresupuesto, 
  setisValidPresupuesto, 
  arrGastos }) {
  return (
    <header>
      <h1>Planificador de gastos arlo</h1>

      { isValidPresupuesto ? (
        <ControlPresupuesto 
          arrGastos={arrGastos}
          setArrGastos={setArrGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setisValidPresupuesto={setisValidPresupuesto} />
      ) : (
        <NuevoPresupuesto 
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setisValidPresupuesto={setisValidPresupuesto} />
      )}

    </header>
  )
}
