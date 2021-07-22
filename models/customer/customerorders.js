class CustomerOrders{
    constructor(dao){
        this.dao = dao
    }

    createCustomerOrdersTable(){
        const sql = `CREATE TABLE IF NOT EXISTS customerorders (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            order_id TEXT NOT NULL,
            userId TEXT NOT NULL,
            order_price INTEGER NOT NULL,
            order_date TEXT NOT NULL,
            delivery_date TEXT NOT NULL,
            delivery_time TEXT NOT NULL,
            status TEXT NOT NULL
        )`

        return this.dao.run(sql)
    }

    makeOrder(order_id, userId, order_price, order_date, delivery_date, delivery_time, status){
        const sql = `INSERT INTO customerorders (order_id, userId, order_price, order_date, delivery_date, delivery_time, status) VALUES (?, ?, ?, ?, ?, ?, ?)`
        const params = [order_id, userId, order_price, order_date, delivery_date, delivery_time, status]
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
}

module.exports = CustomerOrders