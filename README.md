# 🔧 Sistema de Ferretería (React + Vite)

Aplicación web para gestionar inventario y ventas de una ferretería. Los datos se guardan en el navegador (localStorage).

## Cómo ejecutarlo
```bash
npm install
npm run dev     # abre la URL que muestra (normalmente http://localhost:5173)
npm run build   # versión de producción en /dist
```
> En PowerShell, si `npm` da error de scripts, usa `npm.cmd install` y `npm.cmd run dev`.

## Funcionalidad
- **Productos:** agregar (con validación), buscar por nombre y eliminar.
- **Alerta de stock:** las filas se marcan en amarillo si el stock ≤ stock mínimo.
- **Nueva venta:** carrito con varios productos; no deja agregar más de lo que hay en stock; al cobrar descuenta el inventario.
- **Historial:** lista de ventas con fecha, detalle y total.
- **Resumen:** total de ventas, ingresos, producto más vendido y productos bajo stock.
- Todo se conserva al recargar la página.

## Conceptos de React usados
| Concepto | Dónde |
|---|---|
| Componentes y props | `App` pasa datos y funciones a `Productos`, `NuevaVenta`, `Historial`, `Resumen` |
| `useState` | formularios, carrito, búsqueda, mensajes de error |
| `useEffect` | guardar en localStorage (`useLocalStorage.js`) |
| Hook personalizado | `useLocalStorage` |
| Renderizado de listas con `key` | tablas y carrito |
| Renderizado condicional | mensajes de error, "Aún no hay ventas", filas amarillas |
| Estado inmutable | `setProductos(prev => prev.map(...))` al descontar stock |
| Estado elevado ("lifting state up") | `productos` y `ventas` viven en `App` |

## Estructura
```
src/App.jsx                 estado principal y lógica de ventas
src/useLocalStorage.js      hook personalizado
src/components/             Resumen, Productos, NuevaVenta, Historial
```

---

## 🎬 Guion del video (≈3 min)
1. **(20 s)** Presentación: sistema de ferretería hecho con React + Vite.
2. **(60 s)** Demo: agregar producto, buscarlo, hacer una venta con 2 productos y ver stock, historial y resumen actualizarse.
3. **(30 s)** Probar un error: intentar vender más que el stock, o agregar un producto con precio 0.
4. **(40 s)** Mostrar código: `App.jsx` (estado y `registrarVenta`) y explicar props.
5. **(30 s)** Lo aprendido (ver plantilla).

## 📝 Plantilla del informe (con TUS palabras)
1. **Descripción del sistema:** resume la sección Funcionalidad.
2. **Qué aprendí o reforcé:** _(ej.: componentes, props, useState)_
3. **Lo más interesante:** _(ej.: ver que al cambiar el estado la pantalla se actualiza sola)_
4. **Lo que no sabía cómo funcionaba y ahora tengo claro:** _(ej.: por qué no se debe modificar el estado directamente; para qué sirve `key`; cómo funciona `useEffect`)_
5. **Conclusión.**
