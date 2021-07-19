class FarmerOrders{
    constructor(dao){
        this.dao = dao
    }

    viewAllOrders(farmer_id){
        const sql = `SELECT * FROM orderproducts WHERE farmer_id = ?`
        const params = [farmer_id]
        return this.dao.all(sql, params)
    }

    viewOrderDetails(farmer_id, order_id){
         const sql = `SELECT * FROM orderproducts WHERE order_id = ? AND farmer_id = ?`
         const params = [order_id, farmer_id]
         return this.dao.get(sql, params)

     }

    removeOrder(order_id){
        const sql = `DELETE FROM orderproducts WHERE order_id = ?`
        const params = [order_id]
        return this.dao.run(sql, params)
    }

    viewPendingOrders(farmer_id){
        const sql = `SELECT * FROM orderproducts WHERE farmer_id = ? AND status = ? `
        const params = [farmer_id, "Pending"]
        return this.dao.all(sql, params)
    }

    viewCompletedOrders(farmer_id){
        const sql = `SELECT * FROM orderproducts WHERE farmer_id = ? AND status = ? `
        const params = [farmer_id, "Complete"]
        return this.dao.all(sql, params)
    }

    markOrderAsComplete(order_id, status, farmer_id){
        const sql = `UPDATE orderproducts SET status = ? WHERE order_id = ? AND farmer_id = ?`
        const params = [status, order_id, farmer_id]
        return this.dao.run(sql, params)

    }
}

module.exports = FarmerOrders