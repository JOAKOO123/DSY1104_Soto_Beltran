import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from '../../components/root/Header';
import Footer from '../../components/root/Footer';
import { CartPanel } from '../../components/root/CartPanel';
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
    <div className="admin-wrapper" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5' // Add light gray background
    }}>
      <Header onCartClick={openCart} />
      
      <div className="admin-layout-content container" style={{ 
        display: 'flex', 
        flex: 1, 
        paddingTop: '60px',
        paddingBottom: '2rem' // Add some bottom padding
      }}>
        <aside style={{ 
          width: '250px', 
          background: '#343a40', // Dark background
          color: 'white',      // White text
          padding: '15px', 
          flexShrink: 0,
          borderRadius: '8px',
          marginTop: '20px' 
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
        
        <main style={{ 
          flex: 1, 
          padding: '20px', 
          background: '#fff',
          borderRadius: '8px',
          marginTop: '20px',
          marginLeft: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          color: '#000000' // Add black text color
        }}>
          <Outlet />
        </main>
      </div>
      
      <Footer />
      <CartPanel isOpen={isOpen} onClose={closeCart} />
    </div>
  );
}

export default AdminLayout;
