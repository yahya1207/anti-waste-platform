const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Création d'une base SQLite en mémoire
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Erreur lors de l’ouverture de la base SQLite :', err.message);
    } else {
        console.log('Base SQLite en mémoire initialisée.');
    }
});

// Initialisation de la table des paniers surprise
const initDatabase = () => {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS panier_surprises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom TEXT NOT NULL,
                prixOrigine REAL NOT NULL,
                prixReduit REAL NOT NULL,
                quantite INTEGER NOT NULL
            )
        `);
    });
};

initDatabase();

// Route POST : ajouter un panier surprise
app.post('/api/paniers', (req, res) => {
    const { nom, prixOrigine, prixReduit, quantite } = req.body;

    if (!nom || typeof prixOrigine !== 'number' || typeof prixReduit !== 'number' || typeof quantite !== 'number') {
        return res.status(400).json({
            message: 'Données invalides. Attendu : nom, prixOrigine, prixReduit, quantite.'
        });
    }

    const query = `
        INSERT INTO panier_surprises (nom, prixOrigine, prixReduit, quantite)
        VALUES (?, ?, ?, ?)
    `;

    db.run(query, [nom, prixOrigine, prixReduit, quantite], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l’ajout du panier.', error: err.message });
        }

        res.status(201).json({
            id: this.lastID,
            nom,
            prixOrigine,
            prixReduit,
            quantite
        });
    });
});

// Route GET : lister tous les paniers surprise
app.get('/api/paniers', (req, res) => {
    const query = 'SELECT * FROM panier_surprises ORDER BY id DESC';

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des paniers.', error: err.message });
        }

        res.status(200).json(rows);
    });
});

// Route de santé pour vérifier que l’API tourne
app.get('/', (req, res) => {
    res.send('API ZéroGaspi opérationnelle');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});