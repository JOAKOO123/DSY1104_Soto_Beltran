import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Oops!</h1>
      <p>Lo sentimos, ha ocurrido un error.</p>
      <p><i>{error.statusText || error.message}</i></p>
    </div>
  );
}

// pp