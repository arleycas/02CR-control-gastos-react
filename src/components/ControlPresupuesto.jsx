import { useState, useEffect } from "react"
import { formatearMoneda } from '../helpers'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ControlPresupuesto({ arrGastos, setArrGastos, presupuesto, setPresupuesto, setisValidPresupuesto }) {
  
  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {

    const totalGastado = arrGastos.reduce((total, objGasto) => objGasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado;

    // calcular porcentaje gastado
    const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

    setGastado(totalGastado)
    setDisponible(totalDisponible)
    
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000);

  }, [arrGastos])

  const handleResetApp = () => {
    const res = confirm('Seguro que seas reiniciar el presupuesto y la lista de gastos?')

    if(res) {
      setArrGastos([])
      setPresupuesto(0)
      setisValidPresupuesto(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
            trailColor: '#f5f5f5',
            textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6'
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

        <div className="contenido-presupuesto">
          <button 
            className="reset-app"
            type="button"
            onClick={handleResetApp}>
            Resetear App
          </button>
          
          <p>
            <span>Presupuesto: </span> {formatearMoneda(presupuesto)}
          </p>

          <p className={`${disponible < 0 ? 'negativo' : ''}`}>
            <span>Disponible: </span> {formatearMoneda(disponible)}
          </p>

          <p>
            <span>Gastado: </span> {formatearMoneda(gastado)}
          </p>
        </div>

    </div>
  )
}
