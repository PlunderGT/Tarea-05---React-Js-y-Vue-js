export default function Historial({ ventas }) {
  return (
    <section>
      <h2>Historial de ventas</h2>
      {ventas.length === 0 ? (
        <p>Aún no hay ventas.</p>
      ) : (
        <table>
          <thead><tr><th>#</th><th>Fecha</th><th>Detalle</th><th>Total</th></tr></thead>
          <tbody>
            {[...ventas].reverse().map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{new Date(v.fecha).toLocaleString()}</td>
                <td>{v.items.map((i) => `${i.cantidad}× ${i.nombre}`).join(', ')}</td>
                <td>Q{v.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
