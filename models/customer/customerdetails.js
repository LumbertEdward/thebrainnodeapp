class Customer{
    constructor(dao){
        this.dao = dao
    }

    CreateCustomerTable(){
        const sql = `CREATE TABLE IF NOT EXISTS customer(
            userId TEXT PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            email TEXT UNIQUE,
            gender TEXT,
            phone_number TEXT,
            profile_img TEXT,
            location TEXT,
            password TEXT
        )`

        return this.dao.run(sql)
    }

    addCustomer(userId, firstname, lastname, email, gender, phonenumber, password, profile_img = "UnKnown", location){
        const sql = `INSERT INTO customer (userId, first_name, last_name, email, gender, phone_number, password, profile_img, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const params = [userId, firstname, lastname, email, gender, phonenumber, password, profile_img, location]
        return this.dao.run(sql, params)
    }

    addGoogleCustomer(userId, firstname, lastname, email, profile_img, gender = "Unknown", phonenumber = "Unknown", password = "123456", location = "Unknown"){
        const sql = `INSERT INTO customer (userId, first_name, last_name, email, profile_img, gender, phone_number, password, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const params = [userId, firstname, lastname, email, profile_img, gender, phonenumber, password, location]
        return this.dao.run(sql, params)
    }

    updateCustomer(firstname, lastname, phonenumber, user_id, profile_img = " ", location){
        const sql = `UPDATE customer SET first_name = ?, last_name = ?, phone_number = ?, profile_img = ?, location = ? WHERE userId = ?`
        const params = [firstname,lastname, phonenumber, profile_img, location, user_id]
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
        return this.dao.all(sql, params)
    }

    getCustomerByEmail(email){
        const sql = `SELECT * FROM customer WHERE email = ?`
        const params = [email]
        return this.dao.all(sql, params)
    }

    getCustomerByEmailAndPassword(email, password){
        const sql = `SELECT * FROM customer WHERE email = ? AND password = ?`
        const params = [email, password]
        return this.dao.all(sql, params)
    }

    getAllCustomers(){
        const sql = `SELECT * FROM customer`
        const params = []
        return this.dao.all(sql, params)
    }

}

module.exports = Customer