// src/pages/contact/index.jsx (¡Traducido de tu contacto.js!)

import React, { useState } from 'react';
// 1. Importamos tu archivo de usuarios (asumiendo que está en la misma carpeta)
import { USUARIOS } from './usuarios.js'; 

function ContactPage() {
  
  // --- Estados para los campos (reemplaza a .value) ---
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  // --- Estados para el feedback (reemplaza a setMsg) ---
  const [feedback, setFeedback] = useState('');
  const [feedbackError, setFeedbackError] = useState(false);

  // --- Estados para marcar campos inválidos (reemplaza a mark()) ---
  const [invalidNombre, setInvalidNombre] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidMensaje, setInvalidMensaje] = useState(false);

  // --- Constantes de tu archivo JS ---
  const ALLOWED_DOMAINS = ['duocuc.cl'];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  
  // Esta es la función que se ejecuta al enviar
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- Reseteamos los errores (como tu setMsg('', '')) ---
    setFeedback('');
    setFeedbackError(false);
    setInvalidNombre(false);
    setInvalidEmail(false);
    setInvalidMensaje(false);

    // --- Obtenemos los valores (reemplaza a trim(nombre.value)) ---
    const n = nombre.trim();
    const em = email.trim().toLowerCase();
    const tx = mensaje.trim();

    // ——— Tus Validaciones (Copiadas 1:1 y "traducidas") ———
    
    // Nombre: requerido, máx 100
    if (!n) { 
      setFeedback('❌ Nombre requerido'); 
      setFeedbackError(true); 
      setInvalidNombre(true); 
      return; 
    }
    if (n.length > 100) { 
      setFeedback('❌ El nombre debe tener máximo 100 caracteres'); 
      setFeedbackError(true); 
      setInvalidNombre(true); 
      return; 
    }

    // Correo: requerido, máx 100, formato válido y dominio permitido
    if (!em) { 
      setFeedback('❌ Correo requerido'); 
      setFeedbackError(true); 
      setInvalidEmail(true); 
      return; 
    }
    if (em.length > 100) { 
      setFeedback('❌ El correo debe tener máximo 100 caracteres'); 
      setFeedbackError(true); 
      setInvalidEmail(true); 
      return; 
    }
    if (!emailRegex.test(em)) { 
      setFeedback('❌ Correo inválido'); 
      setFeedbackError(true); 
      setInvalidEmail(true); 
      return; 
    }
    const domain = em.split('@')[1] || '';
    if (!ALLOWED_DOMAINS.includes(domain)) {
      setFeedback(`❌ Dominio no permitido. Permitidos: ${ALLOWED_DOMAINS.join(', ')}`);
      setFeedbackError(true); 
      setInvalidEmail(true); 
      return;
    }

    // Comentario: requerido
    if (!tx) { 
      setFeedback('❌ Comentario obligatorio'); 
      setFeedbackError(true); 
      setInvalidMensaje(true); 
      return; 
    }

    // ✅ EXTRA: el correo debe existir en la lista de usuarios
    const existe = Array.isArray(USUARIOS) && USUARIOS.some(
      u => String(u.correo || '').toLowerCase() === em
    );
    if (!existe) {
      setFeedback('❌ Este correo no está registrado en HuertoHogar.');
      setFeedbackError(true); 
      setInvalidEmail(true); 
      return;
    }

    // ——— Envío simulado (Éxito) ———
    setFeedback('✅ Mensaje enviado. ¡Gracias por contactarnos!');
    setFeedbackError(false);

    // Guardar en localStorage (tu lógica)
    try {
      const payload = { nombre: n, email: em, comentario: tx, ts: Date.now() };
      localStorage.setItem('contacto_last', JSON.stringify(payload));
    } catch {}

    // Limpiamos el formulario (reemplaza a form.reset())
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  // --- El JSX ---
  return (
    <main id="contenido" className="container" style={{ padding: '2rem 0 3rem' }}>
      <h1 className="section-title" style={{ fontSize: '1.8rem' }}>Contacto</h1>
      <p className="muted" style={{ margin: '.25rem 0 1.25rem' }}>¿Dudas, sugerencias o soporte? Escríbenos.</p>

      <div className="contact-brand" aria-label="Marca HuertoHogar">
        <img src="/assets/LogoTienda/LogoHuertoHogar.png" alt="Logo HuertoHogar" className="brand-logo" />
        <h2 className="brand-title">HuertoHogar</h2>
      </div>

      {/* 2. Conectamos la función al "onSubmit" */}
      <form id="contactoForm" className="contact-form" noValidate onSubmit={handleSubmit}>
        
        <label htmlFor="c-nombre">Nombre</label>
        <input 
          id="c-nombre" 
          type="text" 
          placeholder="Tu nombre" 
          autoComplete="name"
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)}
          // 3. Añadimos la clase de error si el estado es inválido
          className={invalidNombre ? 'is-invalid' : ''}
          aria-invalid={invalidNombre}
        />

        <label htmlFor="c-email">Correo</label>
        <input 
          id="c-email" 
          type="email" 
          placeholder="usuario@duocuc.cl" 
          autoComplete="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={invalidEmail ? 'is-invalid' : ''}
          aria-invalid={invalidEmail}
        />

        <label htmlFor="c-mensaje">Comentario</label>
        <textarea 
          id="c-mensaje" 
          placeholder="Escribe tu comentario"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={invalidMensaje ? 'is-invalid' : ''}
          aria-invalid={invalidMensaje}
        />

        {/* 4. Mostramos el mensaje de feedback */}
        <p 
          id="contacto-msg" 
          aria-live="polite" 
          className={feedbackError ? 'error' : 'ok'} // (Tu CSS ya tiene .error y .ok)
        >
          {feedback}
        </p>
        
        <button type="submit" className="btn-primary" style={{ border: 0 }}>Enviar</button>
      </form>

    </main>
  );
}

export default ContactPage;