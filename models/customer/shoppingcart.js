class Shoppingcart{
    constructor(dao){
        this.dao = dao
    }

    createShoppingCartTable(){
        const sql = `CREATE TABLE IF NOT EXISTS shoppingcart (
            cart_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            farmer_id INTEGER NOT NULL
        )`

        return this.dao.run(sql)
    }

    addToCart(userId, product_id, farmer_id){
        const sql = `INSERT INTO shoppingcart (userId, product_id, farmer_id) VALUES (?, ?, ?)`
        const params = [userId, product_id, farmer_id]
        return this.dao.run(sql, params)
    }

    viewCartProducts(userId){
        const sql = `SELECT * FROM shoppingcart WHERE userId = ?`
        const params = [userId]
        return this.dao.all(sql, params)
    }

    viewCartProductDetails(cart_id){
        const sql = `SELECT * FROM shoppingcart WHERE cart_id = ?`
        const params = [cart_id]
        return this.dao.get(sql, params)
    }

    deleteProductFromCart(cart_id){
        const sql = `DELETE FROM shoppingcart WHERE cart_id = ?`
        const params = [cart_id]
        return this.dao.run(sql, params)
    }
}

module.exports = Shoppingcart