import React, { useEffect, useMemo, useState } from 'react';
import { fetchOffers } from '../api/client';

const fallbackOffers = [
    {
        id: 1,
        nom: 'Panier boulangerie mixte',
        description: 'Pains artisanaux et viennoiseries de la veille, parfaits pour le petit-déjeuner.',
        prixOrigine: 12,
        prixReduit: 3.99,
        quantite: 6,
        distance: '500m',
        deadline: '02h 15m',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 2,
        nom: 'Panier primeur saison',
        description: 'Fruits et légumes de saison légèrement imparfaits, idéals pour soupes et compotes.',
        prixOrigine: 15,
        prixReduit: 4.5,
        quantite: 4,
        distance: '1.2km',
        deadline: '01h 45m',
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 3,
        nom: 'Panier épicerie fine',
        description: 'Sélection de produits secs et frais proches de la date limite, haute qualité.',
        prixOrigine: 25,
        prixReduit: 8.99,
        quantite: 5,
        distance: '800m',
        deadline: '03h 00m',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 4,
        nom: 'Plat du jour resto',
        description: 'Plats préparés invendus du service du midi, à réchauffer chez soi.',
        prixOrigine: 14.5,
        prixReduit: 4,
        quantite: 3,
        distance: '2.5km',
        deadline: '00h 45m',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80'
    }
];

const formatPrice = (value) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);

const OffersPage = () => {
    const [offers, setOffers] = useState(fallbackOffers);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const displayOffers = useMemo(() => offers.slice(0, 6), [offers]);

    useEffect(() => {
        let isMounted = true;

        fetchOffers()
            .then((data) => {
                if (isMounted) {
                    setOffers(Array.isArray(data) && data.length > 0 ? data : fallbackOffers);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message);
                    setOffers(fallbackOffers);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="offers-page">
            <header className="topbar">
                <div className="brand">
                    <span className="brand-icon">♻</span>
                    <span>ZéroGaspi</span>
                </div>
                <nav className="topnav">
                    <a href="#">Accueil</a>
                    <a href="#" className="active">Paniers</a>
                    <a href="#">Impact</a>
                    <a href="#">À propos</a>
                </nav>
                <button className="login-button">Connexion</button>
            </header>

            <main>
                <section className="hero-section">
                    <div className="hero-copy">
                        <p className="eyebrow">Sauver les repas</p>
                        <h1>Tous les paniers anti-gaspi à portée de main</h1>
                        <p>Parcourez les bonnes affaires près de chez vous et réservez dès maintenant.</p>
                        <div className="hero-actions">
                            <button className="primary-button">Explorer les paniers</button>
                            <button className="secondary-button">Comment ça marche</button>
                        </div>
                    </div>
                </section>

                <section className="toolbar-card">
                    <div className="search-box">
                        <span>📍</span>
                        <input type="text" placeholder="Entrez votre ville ou adresse..." />
                        <button>🔎</button>
                    </div>
                    <div className="chip-row">
                        <button className="chip chip-active">Boulangerie</button>
                        <button className="chip">Primeur</button>
                        <button className="chip">Épicerie</button>
                        <button className="chip">Restauration</button>
                    </div>
                </section>

                <section className="offers-section">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Tous les paniers</p>
                            <h2>Près de chez vous</h2>
                        </div>
                        <button className="ghost-button">Voir la carte</button>
                    </div>

                    {loading && <p className="status">Chargement des paniers…</p>}
                    {error && <p className="status error">{error}</p>}

                    <div className="offers-grid">
                        {displayOffers.map((offer, index) => {
                            const title = offer.nom || offer.title || `Panier ${index + 1}`;
                            const description = offer.description || 'Produit de qualité à prix réduit.';
                            const originalPrice = Number(offer.prixOrigine ?? offer.original_price ?? 0);
                            const discountedPrice = Number(offer.prixReduit ?? offer.discounted_price ?? 0);
                            const quantity = offer.quantite ?? offer.quantity_available ?? 1;
                            const distance = offer.distance || ['500m', '1.2km', '800m', '2.5km'][index % 4];
                            const deadline = offer.deadline || ['02h 15m', '01h 45m', '03h 00m', '00h 45m'][index % 4];
                            const image = offer.image || fallbackOffers[index % fallbackOffers.length].image;

                            return (
                                <article className="offer-card" key={offer.id ?? title}>
                                    <div className="offer-badge">Expire: {deadline}</div>
                                    <img src={image} alt={title} />
                                    <div className="offer-content">
                                        <div className="offer-topline">
                                            <h3>{title}</h3>
                                            <span>📍 {distance}</span>
                                        </div>
                                        <p>{description}</p>
                                        <div className="offer-meta">
                                            <span>{quantity} restants</span>
                                            <span>Économie {formatPrice(originalPrice - discountedPrice)}</span>
                                        </div>
                                        <div className="offer-footer">
                                            <div>
                                                <span className="old-price">{formatPrice(originalPrice)}</span>
                                                <span className="new-price">{formatPrice(discountedPrice)}</span>
                                            </div>
                                            <button>Réserver</button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default OffersPage;