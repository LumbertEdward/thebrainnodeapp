class CustomerOrderProducts{
    constructor(dao){
        this.dao = dao
    }

    createCustomerOrderProducts(){
        const sql = `CREATE TABLE IF NOT EXISTS orderproducts (
            product_id INTEGER NOT NULL,
            farmer_id INTEGER NOT NULL,
            order_id TEXT NOT NULL,
            status TEXT NOT NULL
            )`

        return this.dao.run(sql)
    }

    addOrderProduct(product_id, farmer_id, order_id, status){
        const sql = `INSERT INTO orderproducts (product_id, farmer_id, order_id, status) VALUES (?, ?, ?, ?)`
        const params = [product_id, farmer_id, order_id, status]
        return this.dao.run(sql, params)
    }

    viewOrderProducts(orderId){
        const sql = `SELECT * FROM orderproducts WHERE order_id = ?`
        const params = [orderId]
        return this.dao.all(sql, params)
    }

    updateOrderProduct(productId, status){
        const sql = `UPDATE orderproducts SET status = ? WHERE product_id = ?`
        const params = [productId, status]
        return this.dao.run(sql, params)
    }

    //farmer

    viewFarmerOrders(farmer_id){
        const sql = `SELECT * FROM orderproducts WHERE farmer_id = ?`
        const params = [farmer_id]
        return this.dao.all(sql, params)
    }

    viewCustomerOrderDetails(farmer_id, order_id){
        const sql = `SELECT * FROM orderproducts WHERE order_id = ? AND farmer_id = ?`
        const params = [order_id, farmer_id]
        return this.dao.get(sql, params)
    }

    viewFarmerPendingOrders(status, farmer_id){
        const sql = `SELECT * FROM orderproducts WHERE status = ? AND farmer_id = ?`
        const params = [status, farmer_id]
        return this.dao.all(sql, params)
    }

    viewFarmerCompletedOrders(status, farmer_id){
        const sql = `SELECT * FROM orderproducts WHERE status = ? AND farmer_id = ?`
        const params = [status, farmer_id]
        return this.dao.all(sql, params)
    }

    markOrderAsComplete(order_id, status, farmer_id){
        const sql = `UPDATE orderproducts SET status = ? WHERE order_id = ? AND farmer_id = ?`
        const params = [status, order_id, farmer_id]
        return this.dao.run(sql, params)

    }
}

module.exports = CustomerOrderProducts