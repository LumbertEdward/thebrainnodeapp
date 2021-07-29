class CustCart{
    constructor(dao){
        this.dao = dao
    }

    createShoppingCartTable(){
        const sql = `CREATE TABLE IF NOT EXISTS cart (
            cart_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            userId TEXT NOT NULL,
            product_id INTEGER NOT NULL,
            farmer_id INTEGER NOT NULL,
            total_items INTEGER NOT NULL
        )`

        return this.dao.run(sql)
    }

    addToCart(userId, product_id, farmer_id, total_items){
        const sql = `INSERT INTO cart (userId, product_id, farmer_id, total_items) VALUES (?, ?, ?, ?)`
        const params = [userId, product_id, farmer_id, total_items]
        return this.dao.run(sql, params)
    }

    viewCartProducts(userId){
        const sql = `SELECT * FROM cart WHERE userId = ?`
        const params = [userId]
        return this.dao.all(sql, params)
    }

    viewCartProductDetails(product_id){
        const sql = `SELECT * FROM cart WHERE product_id = ?`
        const params = [product_id]
        return this.dao.all(sql, params)
    }

    deleteProductFromCart(cart_id){
        const sql = `DELETE FROM cart WHERE cart_id = ?`
        const params = [cart_id]
        return this.dao.run(sql, params)
    }

    dropTable(){
        const sql = `DROP TABLE cart`
        return this.dao.run(sql)
    }
}

module.exports = CustCart