import Gasto from "./Gasto"

export default function ListadoGastos({ arrGastos, setObjGastoEditar, eliminarGasto, filtro, arrGastosFiltrados }) {
  return (
    <div className="listado-gastos contenedor">
      
        {
          filtro ? (
            <>
              <h2> { arrGastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoría'} </h2>

              {
                arrGastosFiltrados.map(objGasto => (
                <Gasto
                  key={objGasto.id}
                  objGasto={objGasto}
                  setObjGastoEditar={setObjGastoEditar}
                  eliminarGasto={eliminarGasto} />
                ))
              }
            </>
          ) : (
            <>
              <h2> { arrGastos.length ? 'Gastos' : 'No hay gastos aún'} </h2>

              {
                arrGastos.map(objGasto => (
                  <Gasto
                    key={objGasto.id}
                    objGasto={objGasto}
                    setObjGastoEditar={setObjGastoEditar}
                    eliminarGasto={eliminarGasto} />
                ))
              }
            </>
          )
        }

    </div>
  )
}
