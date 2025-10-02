
export default function Hero({ message }) {

    return (

        <section class="hero">
            <div class="container hero-grid">
                <div class="hero-copy">
                    <h1>hola</h1>
                    <p class="lead">{message}</p>
                    <div class="cta-buttons">
                        <a class="btn-primary" href="./productos.html">Explorar Productos</a>
                        <a class="btn-secondary" href="./productos.html?cat=OF">Ver Ofertas</a>
                    </div>
                </div>
                <div class="hero-visual" aria-hidden="true">
                </div>
            </div>
        </section>
    )
}