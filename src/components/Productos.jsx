import { useState } from 'react';

const VACIO = { nombre: '', categoria: '', precio: '', stock: '' };

export default function Productos({ productos, onAgregar, onEliminar }) {
  const [busqueda, setBusqueda] = useState('');
  const [form, setForm] = useState(VACIO);
  const [error, setError] = useState('');

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();
    const precio = Number(form.precio);
    const stock = Number(form.stock);
    if (!form.nombre.trim()) return setError('El nombre es obligatorio');
    if (!(precio > 0)) return setError('El precio debe ser mayor a 0');
    if (!(stock >= 0) || form.stock === '') return setError('El stock debe ser 0 o más');
    onAgregar({ nombre: form.nombre.trim(), categoria: form.categoria.trim() || 'General', precio, stock, stockMinimo: 5 });
    setForm(VACIO);
    setError('');
  };

  const filtrados = productos.filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <section>
      <h2>Productos</h2>
      <input placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
      <form onSubmit={enviar}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={cambiar} />
        <input name="categoria" placeholder="Categoría" value={form.categoria} onChange={cambiar} />
        <input name="precio" type="number" step="0.01" placeholder="Precio" value={form.precio} onChange={cambiar} />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={cambiar} />
        <button>Agregar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th></th></tr>
        </thead>
        <tbody>
          {filtrados.map((p) => (
            <tr key={p.id} className={p.stock <= p.stockMinimo ? 'bajo' : ''}>
              <td>{p.id}</td><td>{p.nombre}</td><td>{p.categoria}</td><td>Q{p.precio}</td><td>{p.stock}</td>
              <td><button onClick={() => onEliminar(p.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <small>Las filas amarillas están en o bajo el stock mínimo.</small>
    </section>
  );
}
