const crypto = require('crypto');
const { db } = require('./db/database');

/**
 * Utilitaire simple pour transformer une fonction de callback SQLite en Promise.
 */
const runQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve({ id: this.lastID, changes: this.changes });
        });
    });
};

const getRows = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

/**
 * Classe de base pour les modèles SQLite.
 */
class BaseModel {
    constructor(tableName, data = {}) {
        this.tableName = tableName;
        this._fields = Object.keys(data);
        Object.assign(this, data);
    }

    async save() {
        const fields = this.getDbFields();
        const columns = Object.keys(fields);
        const placeholders = columns.map(() => '?').join(', ');
        const values = columns.map((column) => fields[column]);

        if (this.id) {
            const assignments = columns.filter((column) => column !== 'id').map((column) => `${column} = ?`).join(', ');
            const updateValues = columns.filter((column) => column !== 'id').map((column) => fields[column]);
            await runQuery(`UPDATE ${this.tableName} SET ${assignments} WHERE id = ?`, [...updateValues, this.id]);
            return this;
        }

        const result = await runQuery(`INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`, values);
        this.id = result.id;
        return this;
    }

    getDbFields() {
        return Object.entries(this)
            .filter(([key]) => !['_fields', 'tableName'].includes(key))
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
    }

    static async find(filter = {}) {
        const entries = Object.entries(filter);
        const whereClause = entries.length > 0 ? `WHERE ${entries.map(([key]) => `${key} = ?`).join(' AND ')}` : '';
        const values = entries.map(([, value]) => value);
        const rows = await getRows(`SELECT * FROM ${this.tableName} ${whereClause}`.trim(), values);
        return rows.map((row) => new this(row));
    }

    static async findOne(filter = {}) {
        const rows = await this.find(filter);
        return rows[0] || null;
    }

    static async findById(id) {
        const rows = await this.find({ id });
        return rows[0] || null;
    }

    static async findByIdAndUpdate(id, data, options = {}) {
        const instance = await this.findById(id);
        if (!instance) {
            return null;
        }

        Object.assign(instance, data);
        await instance.save();
        return instance;
    }

    static async findByIdAndDelete(id) {
        const instance = await this.findById(id);
        if (!instance) {
            return null;
        }
        await runQuery(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
        return instance;
    }
}

/**
 * Modèle utilisateur utilisé pour les comptes clients, commerçants et administrateurs.
 */
class User extends BaseModel {
    constructor(data = {}) {
        super('Users', data);
        this.email = data.email || '';
        this.password_hash = data.password_hash || '';
        this.role = data.role || 'client';
        this.created_at = data.created_at || null;
    }

    async save() {
        if (!this.password_hash && this.password) {
            this.password_hash = this.hashPassword(this.password);
        }

        return super.save();
    }

    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    comparePassword(password) {
        return this.hashPassword(password) === this.password_hash;
    }
}

/**
 * Modèle représentant un commerce partenaire.
 */
class Business extends BaseModel {
    constructor(data = {}) {
        super('Businesses', data);
        this.user_id = data.user_id || null;
        this.name = data.name || '';
        this.type = data.type || '';
        this.address = data.address || '';
        this.latitude = data.latitude || null;
        this.longitude = data.longitude || null;
        this.pickup_instructions = data.pickup_instructions || '';
    }
}

/**
 * Modèle représentant une offre de panier surprise.
 */
class Offer extends BaseModel {
    constructor(data = {}) {
        super('Offers', data);
        this.business_id = data.business_id || null;
        this.title = data.title || '';
        this.description = data.description || '';
        this.original_price = data.original_price || 0;
        this.discounted_price = data.discounted_price || 0;
        this.quantity_available = data.quantity_available || 0;
        this.pickup_start = data.pickup_start || null;
        this.pickup_end = data.pickup_end || null;
        this.status = data.status || 'active';
    }
}

/**
 * Modèle représentant une réservation faite par un client.
 */
class Reservation extends BaseModel {
    constructor(data = {}) {
        super('Reservations', data);
        this.user_id = data.user_id || null;
        this.offer_id = data.offer_id || null;
        this.quantity = data.quantity || 0;
        this.secure_code = data.secure_code || '';
        this.status = data.status || 'pending';
        this.created_at = data.created_at || null;
    }
}

module.exports = {
    User,
    Business,
    Offer,
    Reservation,
};
