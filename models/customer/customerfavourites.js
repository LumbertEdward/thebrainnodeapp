class CustomerFavourites{
    constructor(dao){
        this.dao = dao
    }

    createFavouritesTable(){
        const sql = `CREATE TABLE IF NOT EXISTS customerfavourites(
            fav_id INTEGER PRIMARY_KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            farmer_id INTEGER NOT NULL,
            product_name TEXT NOT NULL,
            product_description TEXT NOT NULL,
            product_price INTEGER NOT NULL,
            product_image TEXT NOT NULL,
            product_type TEXT NOT NULL,
            product_calcs INTEGER NOT NULL,
            product_delivery_time TEXT NOT NULL
        )`

        return this.dao.run(sql)
    }

    addToFavourites(user_id, product_id, farmer_id, product_name, product_description, product_price, product_image, product_type, product_calcs, product_delivery_time){
        const sql = `INSERT INTO customerfavourites (user_id, product_id, farmer_id, product_name, product_description, product_price, product_image, product_type, product_calcs, product_delivery_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const params = [user_id, product_id, farmer_id, product_name, product_description, product_price, product_image, product_type, product_calcs, product_delivery_time]
        return this.dao.run(sql, params)
    }

    viewUserFavourites(user_id){
        const sql = `SELECT * FROM customerfavourites WHERE user_id = ?`
        const params = [user_id]
        return this.dao.all(sql, params)
    }

    checkProduct(user_id, product_id){
        const sql = `SELECT * FROM customerfavourites WHERE product_id = ?, user_id = ?`
        const params = [product_id, user_id]
        return this.dao.get(sql, params)
    }

    deleteFavourite(user_id, product_id){
        const sql = `DELETE FROM customerfavourites WHERE product_id = ?, user_id = ?`
        const params = [product_id, user_id]
        return this.dao.run(sql, params)
    }
}

module.exports = CustomerFavourites