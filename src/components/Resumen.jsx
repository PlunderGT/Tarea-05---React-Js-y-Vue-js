export default function Resumen({ productos, ventas }) {
  const ingresos = ventas.reduce((s, v) => s + v.total, 0);
  const bajoStock = productos.filter((p) => p.stock <= p.stockMinimo).length;

  const conteo = {};
  ventas.forEach((v) => v.items.forEach((i) => (conteo[i.nombre] = (conteo[i.nombre] || 0) + i.cantidad)));
  const masVendido = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="resumen">
      <div><span>Ventas</span><b>{ventas.length}</b></div>
      <div><span>Ingresos</span><b>Q{ingresos}</b></div>
      <div><span>Más vendido</span><b>{masVendido ? masVendido[0] : '—'}</b></div>
      <div><span>Bajo stock</span><b>{bajoStock}</b></div>
    </div>
  );
}
