export const generarId = () => {
  const random = Math.random().toString(36).substring(2)
  const fecha = Date.now().toString(36).substring(2)
  return random + fecha
}

export const formatearFecha = fecha => {
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }

  const fechaNueva = new Date(fecha)

  return fechaNueva.toLocaleDateString('es-ES', opciones)

}

export const formatearMoneda = (cantidad) => {
  return cantidad.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
}