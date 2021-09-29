import {Injectable} from '@angular/core';
import {SQLiteObject} from '@ionic-native/sqlite/ngx';

@Injectable({providedIn: 'root'})
export class ContactProvider {

    // public properties

    db: SQLiteObject = null;

    constructor() {
    }

    setDatabase(db: SQLiteObject) {
        if (this.db === null) {
            this.db = db;
        }
    }

    create(owner: string, name: string, address: string, chain: 'nem' | 'symbol' | 'bitcoin') {
        let sql = 'INSERT INTO contact(owner, name, address, chain) VALUES(?,?,?,?)';
        return this.db.executeSql(sql, [owner, name, address, chain]);
    }

    createTable() {
        let sql = 'CREATE TABLE IF NOT EXISTS contact(id INTEGER PRIMARY KEY AUTOINCREMENT, owner TEXT, name TEXT, address TEXT, chain TEXT)';
        return this.db.executeSql(sql, []);
    }

    delete(id: number, chain: 'nem' | 'symbol' | 'bitcoin') {
        let sql = 'DELETE FROM contact WHERE id=? AND chain=?';
        return this.db.executeSql(sql, [id, chain]);
    }

    getAllByOwner(owner: string, chain: 'nem' | 'symbol' | 'bitcoin') {
        let sql = 'SELECT * FROM contact WHERE owner = ? AND chain=?';
        return this.db.executeSql(sql, [owner, chain])
            .then(response => {
                let contacts = [];
                for (let index = 0; index < response.rows.length; index++) {
                    contacts.push(response.rows.item(index));
                }
                return Promise.resolve(contacts);
            })
            .catch(error => Promise.reject(error));
    }

    update(id: number, name: string, address: string, chain: 'nem' | 'symbol' | 'bitcoin') {
        let sql = 'UPDATE contact SET name=?, address=? WHERE id=? AND chain=?';
        return this.db.executeSql(sql, [name, address, id, chain]);
    }

    searchContactName(owner: string, address: string, chain: 'nem' | 'symbol' | 'bitcoin') {
        let sql = 'SELECT * FROM contact WHERE owner = ? AND address=? AND chain=?';
        return this.db.executeSql(sql, [owner, address, chain])
            .then(response => {
                let contacts = [];
                for (let index = 0; index < response.rows.length; index++) {
                    contacts.push(response.rows.item(index));
                }
                return Promise.resolve(contacts);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
}
