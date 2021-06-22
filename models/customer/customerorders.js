class CustomerOrders{
    constructor(dao){
        this.dao = dao
    }

    createCustomerOrdersTable(){
        const sql = `CREATE TABLE IF NOT EXISTS customerorders (
            order_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            farmer_id INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            order_price INTEGER NOT NULL,
            order_date TEXT NOT NULL,
            delivery_date TEXT NOT NULL,
            order_product TEXT NOT NULL,
            quantity TEXT NOT NULL,
            status TEXT NOT NULL
        )`

        return this.dao.run(sql)
    }

    makeOrder(userId, farmer_id, order_price, order_date , delivery_date, order_product, quantity, status){
        const sql = `INSERT INTO customerorders (farmer_id, userId, order_price, order_date, delivery_date, order_product, quantity, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        const params = [farmer_id, userId, order_price, order_date, delivery_date, order_product, quantity, status]
        return this.dao.run(sql, params)
    }

    viewMyOrders(userId){
        const sql = `SELECT * FROM customerorders WHERE userId = ?`
        const params = [userId]
        return this.dao.all(sql, params)
    }

    viewOrderDetails(userId, order_id){
        const sql = `SELECT * FROM customerorders WHERE order_id = ? AND userId = ?`
        const params = [order_id, userId]
        return this.dao.get(sql, params)
    }

    viewPendingOrders(status, userId){
        const sql = `SELECT * FROM customerorders WHERE status = ? AND userId = ?`
        const params = [status, userId]
        return this.dao.all(sql, params)
    }

    viewCompletedOrders(status, userId){
        const sql = `SELECT * FROM customerorders WHERE status = ? AND userId = ?`
        const params = [status, userId]
        return this.dao.all(sql, params)
    }

    //farmer

    viewFarmerOrders(farmer_id){
        const sql = `SELECT * FROM customerorders WHERE farmer_id = ?`
        const params = [farmer_id]
        return this.dao.all(sql, params)
    }

    viewCustomerOrderDetails(farmer_id, order_id){
        const sql = `SELECT * FROM customerorders WHERE order_id = ? AND farmer_id = ?`
        const params = [order_id, farmer_id]
        return this.dao.get(sql, params)
    }

    viewFarmerPendingOrders(status, farmer_id){
        const sql = `SELECT * FROM farmerorders WHERE status = ? AND farmer_id = ?`
        const params = [status, farmer_id]
        return this.dao.all(sql, params)
    }

    viewFarmerCompletedOrders(status, farmer_id){
        const sql = `SELECT * FROM farmerorders WHERE status = ? AND farmer_id = ?`
        const params = [status, farmer_id]
        return this.dao.all(sql, params)
    }

    markOrderAsComplete(order_id, status, farmer_id){
        const sql = `UPDATE customerorders SET status = ? WHERE order_id = ? AND farmer_id = ?`
        const params = [status, order_id, farmer_id]
        return this.dao.run(sql, params)

    }
}

module.exports = CustomerOrders