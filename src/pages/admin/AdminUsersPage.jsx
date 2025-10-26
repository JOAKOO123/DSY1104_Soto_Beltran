import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { USUARIOS } from '../../data/usuarios.js';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsers(USUARIOS);
    setLoading(false);
  }, []);

  if (loading) {
    return <div style={{padding: '20px'}}>Cargando usuarios...</div>;
  }

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <Link to="/admin/usuarios/nuevo" className="btn-primary" 
        style={{ display: 'inline-block', marginBottom: '1rem', padding: '10px 15px', textDecoration: 'none' }}>
        + Nuevo Usuario
      </Link>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', background: '#fff' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Role</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.correo}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/admin/usuarios/${user.id}/editar`} className="btn-secondary">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsersPage;
