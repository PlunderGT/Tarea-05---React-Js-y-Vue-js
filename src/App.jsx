import useLocalStorage from './useLocalStorage';
import Resumen from './components/Resumen';
import Productos from './components/Productos';
import NuevaVenta from './components/NuevaVenta';
import Historial from './components/Historial';

const PRODUCTOS_INICIALES = [
  { id: 1, nombre: 'Martillo 16oz', categoria: 'Herramientas', precio: 85, stock: 20, stockMinimo: 5 },
  { id: 2, nombre: 'Clavos 2" (libra)', categoria: 'Fijación', precio: 12, stock: 100, stockMinimo: 30 },
  { id: 3, nombre: 'Cemento 42.5kg', categoria: 'Construcción', precio: 95, stock: 8, stockMinimo: 10 },
  { id: 4, nombre: 'Pintura blanca galón', categoria: 'Pintura', precio: 160, stock: 15, stockMinimo: 4 },
];

export default function App() {
  // Estado principal: vive en el componente padre y se pasa a los hijos por props
  const [productos, setProductos] = useLocalStorage('ferreteria-productos', PRODUCTOS_INICIALES);
  const [ventas, setVentas] = useLocalStorage('ferreteria-ventas', []);

  const agregarProducto = (p) =>
    setProductos((prev) => [...prev, { ...p, id: Math.max(0, ...prev.map((x) => x.id)) + 1 }]);

  const eliminarProducto = (id) => setProductos((prev) => prev.filter((p) => p.id !== id));

  const registrarVenta = (items) => {
    // items: [{ productoId, cantidad }]
    const lineas = items.map((i) => {
      const p = productos.find((x) => x.id === i.productoId);
      return { nombre: p.nombre, cantidad: i.cantidad, precio: p.precio, productoId: p.id };
    });
    const total = lineas.reduce((s, l) => s + l.cantidad * l.precio, 0);

    // Descontar stock sin mutar el estado (se crea un arreglo nuevo)
    setProductos((prev) =>
      prev.map((p) => {
        const it = items.find((i) => i.productoId === p.id);
        return it ? { ...p, stock: p.stock - it.cantidad } : p;
      })
    );
    setVentas((prev) => [...prev, { id: prev.length + 1, fecha: new Date().toISOString(), items: lineas, total }]);
  };

  return (
    <main className="contenedor">
      <h1>🔧 Sistema de Ferretería</h1>
      <Resumen productos={productos} ventas={ventas} />
      <Productos productos={productos} onAgregar={agregarProducto} onEliminar={eliminarProducto} />
      <NuevaVenta productos={productos} onVender={registrarVenta} />
      <Historial ventas={ventas} />
    </main>
  );
}
