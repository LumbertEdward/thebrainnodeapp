class FarmerRegistration{
    constructor(dao){
        this.dao = dao
    }

    createTable(){
        const sql = `CREATE TABLE IF NOT EXISTS farmer (
            farmer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            gender TEXT NOT NULL,
            phone_number TEXT NOT NULL UNIQUE,
            bio TEXT NOT NULL,
            profile_pic TEXT NOT NULL,
            id_number INTEGER NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`

        return this.dao.run(sql)
    }

    insertFarmer(firstname, lastname, email, gender, phonenumbr, bio, profilepic, idNumber, password){
        const sql = `INSERT INTO farmer (first_name, last_name, email, gender, phone_number, bio, profile_pic, id_number, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const params = [firstname, lastname, email, gender, phonenumbr, bio, profilepic, idNumber, password]
        return this.dao.run(sql, params)
    }

    updateFarmer(firstname, email){
        const sql = `UPDATE farmer SET first_name = ? WHERE farmer_id = ?`
        const params = [firstname, email]
        return this.dao.run(sql, params)

    }

    deleteFarmer(id){
        const sql = `DELETE FROM farmer WHERE farmer_id = ?`
        const params = [id]
        return this.dao.delete(sql, params)
    }

    getFarmerByEmailAndPassword(email, password){
        const sql = `SELECT * FROM farmer WHERE email = ? AND password = ?`
        const params = [email, password]
        return this.dao.get(sql, params)
    }

    getFarmerById(id){
        const sql = `SELECT * FROM farmer WHERE farmer_id = ?`
        const params = [id]
        return this.dao.get(sql, params)
    }

    getFarmerByEmail(email){
        const sql = `SELECT * FROM farmer WHERE email = ?`
        const params = [email]
        return this.dao.get(sql, params)
    }

    getAllFarmers(){
        const sql = `SELECT * FROM farmer`
        const params = []
        return this.dao.all(sql, params)
    }
}

module.exports = FarmerRegistration