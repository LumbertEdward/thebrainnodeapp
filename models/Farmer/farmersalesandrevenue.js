class SalesAndRevenue{
    constructor(dao){
        this.dao = dao
    }

    createSalesTable(){
        const sql = `CREATE TABLE IF NOT EXISTS salesandrevenuetable (
            sales_id INTEGER PRIMARY KEY AUTOINCREMENT,
            farmer_id INTEGER NOT NULL,
            item_sold TEXT NOT NULL,
            total_items_sold TEXT NOT NULL,
            items_cost INTEGER NOT NULL,
            amount_received INTEGER NOT NULL,
            date_sold TEXT NOT NULL
            
        )`

        return this.dao.run(sql)
    }

    addSalesAndRevenue(farmer_id, item_sold, total_items_sold, items_cost, amount_received, date_sold){
        const sql = `INSERT INTO salesandrevenuetable (farmer_id, item_sold, total_items_sold, items_cost, amount_received, date_sold) VALUES (?,?,?,?,?,?)`
        const params = [farmer_id, item_sold, total_items_sold, items_cost, amount_received, date_sold]
        return this.dao.run(sql, params)
    }

    viewFarmerSalesAndRevenue(farmer_id){
        const sql = `SELECT * FROM salesandrevenuetable WHERE farmer_id = ?`
        const params = [farmer_id]
        return this.dao.all(sql, params)
    }

    updateFarmerSalesAndRevenue(sales_id, item_sold, total_items_sold, items_cost, amount_received, date_sold){
        const sql = `UPDATE salesandrevenuetable SET item_sold = ?, total_items_sold = ?, items_cost = ?, amount_received = ?, date_sold = ? WHERE sales_id = ?`
        const params = [item_sold, total_items_sold, items_cost, amount_received, date_sold, sales_id]
        return this.dao.run(sql, params)
    }

    deleteFarmerSalesAndRevenue(sales_id){
        const sql = `DELETE FROM salesandrevenuetable WHERE sales_id = ?`
        const params = [sales_id]
        return this.dao.run(sql, params)
    }

}

module.exports = SalesAndRevenue