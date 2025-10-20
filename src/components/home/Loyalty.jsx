import React from 'react';

function Loyalty() {
  const isLoggedIn = false;

  return (
    <section className="loyalty" aria-labelledby="fid-title">
      <div className="container">
        <h2 id="fid-title" className="section-title">Puntos & descuentos</h2>
        <div className="loyalty-grid">
          <article className="loyalty-card">
            <div className="loy-icon" aria-hidden="true">🏅</div>
            <h3>Gana puntos en cada compra</h3>
            <p>1 punto por cada $1.000. Canjea desde 100 pts = $1.000 de descuento.</p>
          </article>
          <article className="loyalty-card">
            <div className="loy-icon" aria-hidden="true">🎁</div>
            <h3>Bonos</h3>
            <ul className="loy-list">
              <li>Registro: +50 pts</li>
              <li>Primera compra: +100 pts</li>
              <li>Cumpleaños: +200 pts</li>
            </ul>
          </article>
          <article className="loyalty-card cta">
            <h3>{isLoggedIn ? '¡Bienvenido de vuelta!' : 'Únete gratis'}</h3>
            <p>
              {isLoggedIn
                ? '¡Ya eres parte! Revisa tu perfil y sigue sumando.'
                : 'Crea tu cuenta y comienza a acumular.'}
            </p>
            <div className="btns">
              {isLoggedIn ? (
                <>
                  <a className="btn-primary" href="/perfil">Ver mi perfil</a>
                  <a className="btn-outline" href="/productos">Empezar a comprar</a>
                </>
              ) : (
                <>
                  <a className="btn-primary" href="/registro">Crear cuenta</a>
                  <a className="btn-outline" href="/login">Iniciar sesión</a>
                </>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Loyalty;