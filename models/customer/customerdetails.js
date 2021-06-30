class Customer{
    constructor(dao){
        this.dao = dao
    }

    CreateCustomerTable(){
        const sql = `CREATE TABLE IF NOT EXISTS customer(
            userId INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            gender TEXT NOT NULL,
            phone_number TEXT NOT NULL,
            profile_img TEXT NOT NULL,
            password TEXT NOT NULL
        )`

        return this.dao.run(sql)
    }

    addCustomer(firstname, lastname, email, gender, phonenumber, password, profile_img = " "){
        const sql = `INSERT INTO customer (first_name, last_name, email, gender, phone_number, password, profile_img) VALUES (?, ?, ?, ?, ?, ?, ?)`
        const params = [firstname, lastname, email, gender, phonenumber, password, profile_img]
        return this.dao.run(sql, params)
    }

    updateCustomer(firstname, lastname, phonenumber, user_id, profile_img = " "){
        const sql = `UPDATE customer SET first_name = ?, last_name = ?, phone_number = ?, profile_img = ? WHERE userId = ?`
        const params = [firstname,lastname, phonenumber, profile_img, user_id]
        return this.dao.run(sql, params)

    }

    deleteCustomer(userId){
        const sql = `DELETE FROM customer WHERE userId = ?`
        const params = [userId]
        return this.dao.delete(sql, params)
    }

    getCustomerById(id){
        const sql = `SELECT * FROM customer WHERE userId = ?`
        const params = [id]
        return this.dao.get(sql, params)
    }

    getCustomerByEmail(email){
        const sql = `SELECT * FROM customer WHERE email = ?`
        const params = [email]
        return this.dao.get(sql, params)
    }

    getCustomerByEmailAndPassword(email, password){
        const sql = `SELECT * FROM customer WHERE email = ? AND password = ?`
        const params = [email, password]
        return this.dao.get(sql, params)
    }

    getAllCustomers(){
        const sql = `SELECT * FROM customer`
        const params = []
        return this.dao.all(sql, params)
    }

}

module.exports = Customer