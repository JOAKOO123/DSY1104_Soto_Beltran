import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    USER_METRICS, 
    COMPRAS_POR_MES, 
    TOP_PRODUCTOS_COMPRADOS_USUARIO, 
    HISTORIAL_ORDENES 
} from '../data/user_profile_data';

const cardStyle = {
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    flex: '1 1 280px', // Changed for better mobile layout
    margin: '10px',
    textAlign: 'center',
};

const containerStyle = {
    padding: '15px',
    maxWidth: '1200px',
    margin: '0 auto',
    background: '#f8f9fa',
    '@media (max-width: 768px)': {
        padding: '10px',
    }
};

function UserProfilePage() {
    const { user } = useAuth();
    const maxMesTotal = Math.max(...COMPRAS_POR_MES.map(c => c.total));

    if (!user) {
        return <div style={{padding: '20px'}}><h2>Por favor, inicia sesión para ver tu perfil.</h2></div>;
    }

    return (
        <div style={containerStyle}>
            <h1 style={{ 
                color: '#1f2833', 
                marginBottom: '10px',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)' // Responsive font size
            }}>
                Hola, {user.nombre} 👋
            </h1>

            {/* Metrics Cards */}
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                marginBottom: '30px',
                gap: '15px', // Added gap for better spacing
                justifyContent: 'center' // Center cards on mobile
            }}>
                <div style={{...cardStyle, borderLeft: '5px solid #007bff'}}>
                    <p style={{ margin: 0, color: '#6c757d' }}>Total Gastado</p>
                    <h3 style={{ margin: '5px 0 0 0', color: '#007bff' }}>
                        ${USER_METRICS.totalGastado.toLocaleString('es-CL')}
                    </h3>
                </div>
                <div style={{...cardStyle, borderLeft: '5px solid #00d4d4'}}>
                    <p style={{ margin: 0, color: '#6c757d' }}>Total de Compras</p>
                    <h3 style={{ margin: '5px 0 0 0', color: '#00d4d4' }}>
                        {COMPRAS_POR_MES.length}
                    </h3>
                </div>
                <div style={{...cardStyle, borderLeft: '5px solid #00d4d4'}}>
                    <p style={{ margin: 0, color: '#6c757d' }}>Total de Productos Comprados</p>
                    <h3 style={{ margin: '5px 0 0 0', color: '#00d4d4' }}>
                        {TOP_PRODUCTOS_COMPRADOS_USUARIO.length}
                    </h3>
                </div>
                <div style={{...cardStyle, borderLeft: '5px solid #00d4d4'}}>
                    <p style={{ margin: 0, color: '#6c757d' }}>Total de Ordenes</p>
                    <h3 style={{ margin: '5px 0 0 0', color: '#00d4d4' }}>
                        {HISTORIAL_ORDENES.length}
                    </h3>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ 
                display: 'flex', 
                gap: '20px', 
                marginTop: '20px', 
                flexWrap: 'wrap'
            }}>
                {/* Monthly Purchases Panel */}
                <div style={{ 
                    flex: '1 1 300px', // Min width for mobile
                    minWidth: 'unset', // Remove fixed min-width
                    padding: '15px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ color: '#333' }}>Total Gastado por Mes</h3>
                    <p style={{ color: '#6c757d' }}>Aún no tienes compras registradas.</p>
                </div>

                {/* Top Products Panel */}
                <div style={{ 
                    flex: '1 1 300px', // Min width for mobile
                    minWidth: 'unset', // Remove fixed min-width
                    padding: '15px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ color: '#333' }}>Productos Comprados</h3>
                    <p style={{ color: '#6c757d' }}>Aún no tienes compras registradas.</p>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
