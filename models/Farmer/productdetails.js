class AgriculturalProduct{
    constructor(dao){
        this.dao = dao
    }

    createProductsTable(){
        const sql = `CREATE TABLE IF NOT EXISTS farmerproducts (
            product_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            farmer_id INTEGER NOT NULL,
            product_name TEXT NOT NULL,
            product_description TEXT NOT NULL,
            product_price INTEGER NOT NULL,
            product_image TEXT NOT NULL 
        )`

        return this.dao.run(sql)
    }

    addProduct(farmer_id, product_name, product_description, product_price, product_image){
        const sql = `INSERT INTO farmerproducts (farmer_id, product_name, product_description, product_price, product_image) VALUES (?, ?, ?, ?, ?)`
        const params = [farmer_id, product_name, product_description, product_price, product_image]
        return this.dao.run(sql, params)
    }

    viewProductDetails(product_id){
        const sql = `SELECT * FROM farmerproducts WHERE product_id = ?`
        const params = [product_id]
        return this.dao.get(sql, params)
    }

    updateProduct(product_name, product_description, product_price, product_image, product_id){
        const sql = `UPDATE farmerproducts SET product_name = ?, product_description = ?, product_price = ?, product_image = ? WHERE product_id = ?`
        const params = [product_name, product_description, product_price, product_image, product_id]
        return this.dao.run(sql, params)
    }

    deleteProduct(product_id){
        const sql = `DELETE FROM farmerproducts WHERE product_id = ?`
        const params = [product_id]
        return this.dao.run(sql, params)
    }

    viewAllFarmerProducts(farmer_id){
        const sql = `SELECT * FROM farmerproducts WHERE farmer_id = ?`
        const params = [farmer_id]
        return this.dao.all(sql, params)
    }

    deleteAllProducts(){
        const sql = `DROP TABLE farmerproducts`
        return this.dao.run(sql)
    }

    //customer

    viewAllOrders(){
        const sql = `SELECT * FROM farmerproducts`
        const params = []
        return this.dao.all(sql, params)
    }

    viewCustomerProductDetails(product_id){
        const sql = `SELECT * FROM farmerproducts WHERE product_id = ?`
        const params = [product_id]
        return this.dao.get(sql, params)
    }
}

module.exports = AgriculturalProduct 