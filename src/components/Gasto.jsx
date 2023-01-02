import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatearFecha } from "../helpers";
import iconoAhorro from '../assets/icono_ahorro.svg';
import iconoCasa from '../assets/icono_casa.svg';
import iconoComida from '../assets/icono_comida.svg';
import iconoGastos from '../assets/icono_gastos.svg';
import iconoOcio from '../assets/icono_ocio.svg';
import iconoSalud from '../assets/icono_salud.svg';
import iconoSuscripciones from '../assets/icono_suscripciones.svg';

const diccionarioIconos = {
  ahorro: iconoAhorro,
  comida: iconoComida,
  casa: iconoCasa,
  gastos: iconoGastos,
  ocio: iconoOcio,
  salud: iconoSalud,
  suscripciones: iconoSuscripciones,
}

export default function Gasto({objGasto, setObjGastoEditar, eliminarGasto}) {
  const { categoria, nombreGasto, cantidad, fecha, id } = objGasto;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => { setObjGastoEditar(objGasto) }}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        onClick={() => { eliminarGasto(id) }}
        destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}>
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img 
              src={diccionarioIconos[categoria]}
              alt="Icono gasto" />
            <div className="descripcion-gasto">
              <p className="categoria"> {categoria} </p>
              <p className="nombre-gasto"> {nombreGasto} </p>
              <p className="fecha-gasto">
                Agregado el: <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>

          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
