import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from '../../components/root/Header';
import Footer from '../../components/root/Footer';
import { CartPanel } from '../../components/CartPanel';
import { useCart } from '../../context/CartContext';

const adminNavLinks = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/productos', label: 'Productos' },
  { to: '/admin/categorias', label: 'Categorías' },
  { to: '/admin/usuarios', label: 'Usuarios' },
  { to: '/admin/ordenes', label: 'Órdenes / Boletas' },
  { to: '/admin/reportes', label: 'Reportes' },
];

function AdminLayout() {
  const { isOpen, openCart, closeCart } = useCart();

  return (
    <div className="admin-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onCartClick={openCart} />
      
      <main className="admin-layout" style={{ display: 'flex', flex: 1, paddingTop: '60px' }}> 
        <aside style={{ 
          width: '250px', 
          background: '#343a40', 
          color: 'white',      
          padding: '15px', 
          flexShrink: 0,
        }}>
          <h3 style={{ borderBottom: '1px solid #495057', paddingBottom: '10px', marginBottom: '15px' }}>ADMIN</h3>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {adminNavLinks.map(link => (
                <li key={link.to} style={{ marginBottom: '10px' }}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => isActive ? 'text-warning' : 'text-light'}
                    style={{ textDecoration: 'none', display: 'block', padding: '8px 0' }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        
        <section className="admin-content" style={{ flex: 1, padding: '20px' }}> 
          <Outlet />
        </section>
      </main>
      
      <Footer />
      <CartPanel isOpen={isOpen} onClose={closeCart} />
    </div>
  );
}

export default AdminLayout;
