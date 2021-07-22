class Shoppingcart{
    constructor(dao){
        this.dao = dao
    }

    createShoppingCartTable(){
        const sql = `CREATE TABLE IF NOT EXISTS shoppingcart (
            cart_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
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

    addToCart(userId, product_id, farmer_id, product_name, product_description, product_price, product_image, product_type, product_calcs, product_delivery_time){
        const sql = `INSERT INTO shoppingcart (userId, product_id, farmer_id, product_name, product_description, product_price, product_image, product_type, product_calcs, product_delivery_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const params = [userId, product_id, farmer_id, product_name, product_description, product_price, product_image, product_type, product_calcs, product_delivery_time]
        return this.dao.run(sql, params)
    }

    viewCartProducts(userId){
        const sql = `SELECT * FROM shoppingcart WHERE userId = ?`
        const params = [userId]
        return this.dao.all(sql, params)
    }

    viewCartProductDetails(cart_id){
        const sql = `SELECT * FROM shoppingcart WHERE product_id = ?`
        const params = [cart_id]
        return this.dao.get(sql, params)
    }

    deleteProductFromCart(cart_id){
        const sql = `DELETE FROM shoppingcart WHERE product_id = ?`
        const params = [cart_id]
        return this.dao.run(sql, params)
    }

    dropTable(){
        const sql = `DROP TABLE shoppingcart`
        return this.dao.run(sql)
    }
}

module.exports = Shoppingcart