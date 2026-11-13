import { useCarritoStore } from "../sesiones/05-EstadosGlobales/stores/useCarritoStore"

const formatoMoneda = new Intl.NumberFormat('es-Cl', {
    style: 'currency',
    currency: 'CLP'
}) 

export function Header() {

    const cantidadProductos = useCarritoStore((estado) => 
        estado.items.reduce((total, item) => total + item.cantidad, 0)
    )

    const montoCarrito = useCarritoStore((estado) => 
        estado.items.reduce((total, item) => total + (item.cantidad * item.producto.precio), 0)
    )

    return (
        <header className="site-header">
            <a href="#">Bootcamp de React</a>
            <span className="badge" role="status" >Carrito: {cantidadProductos} - Monto: {formatoMoneda.format(montoCarrito)}</span>
        </header> 
    )
}