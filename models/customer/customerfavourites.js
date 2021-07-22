class CustomerFavourites{
    constructor(dao){
        this.dao = dao
    }

    createFavouritesTable(){
        const sql = `CREATE TABLE IF NOT EXISTS customerfavourites(
            fav_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            product_id INTEGER NOT NULL
        )`

        return this.dao.run(sql)
    }

    addFavourites(user_id, product_id){
        const sql = `INSERT INTO customerfavourites (user_id, product_id) VALUES (?, ?)`
        const params = [user_id, product_id]
        return this.dao.run(sql, params)
    }

    viewUserFavourites(user_id){
        const sql = `SELECT * FROM customerfavourites WHERE user_id = ?`
        const params = [user_id]
        return this.dao.all(sql, params)
    }

    checkProduct(user_id, product_id){
        const sql = `SELECT * FROM customerfavourites WHERE user_id = ? AND product_id = ?`
        const params = [user_id, product_id]
        return this.dao.all(sql, params)
    }

    deleteFavourite(user_id, product_id){
        const sql = `DELETE FROM customerfavourites WHERE product_id = ? AND user_id = ?`
        const params = [product_id, user_id]
        return this.dao.run(sql, params)
    }
}

module.exports = CustomerFavourites