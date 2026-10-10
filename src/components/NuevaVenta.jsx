import { useState } from 'react';

export default function NuevaVenta({ productos, onVender }) {
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [carrito, setCarrito] = useState([]);
  const [error, setError] = useState('');

  const agregar = () => {
    const id = Number(productoId || productos[0]?.id);
    const p = productos.find((x) => x.id === id);
    if (!p) return;
    const yaEnCarrito = carrito.find((i) => i.productoId === id)?.cantidad || 0;
    if (cantidad < 1) return setError('Cantidad inválida');
    if (yaEnCarrito + cantidad > p.stock) return setError(`Stock insuficiente de ${p.nombre} (disponible: ${p.stock})`);
    setError('');
    setCarrito((prev) => {
      const existe = prev.find((i) => i.productoId === id);
      return existe
        ? prev.map((i) => (i.productoId === id ? { ...i, cantidad: i.cantidad + cantidad } : i))
        : [...prev, { productoId: id, cantidad }];
    });
  };

  const detalle = carrito.map((i) => ({ ...i, producto: productos.find((p) => p.id === i.productoId) }));
  const total = detalle.reduce((s, i) => s + i.cantidad * i.producto.precio, 0);

  const cobrar = () => {
    if (carrito.length === 0) return setError('El carrito está vacío');
    onVender(carrito);
    setCarrito([]);
    setError('');
  };

  return (
    <section>
      <h2>Nueva venta</h2>
      <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
        {productos.map((p) => (
          <option key={p.id} value={p.id}>{p.nombre} (Q{p.precio}, stock {p.stock})</option>
        ))}
      </select>
      <input type="number" min="1" value={cantidad} style={{ width: 70 }} onChange={(e) => setCantidad(Number(e.target.value))} />
      <button onClick={agregar}>Agregar al carrito</button>
      {error && <p className="error">{error}</p>}
      <ul>
        {detalle.map((i) => (
          <li key={i.productoId}>{i.cantidad} × {i.producto.nombre} = Q{i.cantidad * i.producto.precio}</li>
        ))}
      </ul>
      <strong>Total: Q{total}</strong> <button onClick={cobrar}>Cobrar</button>
    </section>
  );
}
