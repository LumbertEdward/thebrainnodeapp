class FarmInputsRecommendation{
    constructor(dao){
        this.dao = dao
    }

    createFarmInputsTable(){
        const sql = `CREATE TABLE IF NOT EXISTS recommendedfarminputs (
            farm_input_id INTEGER PRIMARY KEY AUTOINCREMENT,
            farm_input_name TEXT NOT NULL,
            farm_input_description TEXT NOT NULL,
            farm_input_type TEXT NOT NULL,
            associated_product TEXT NOT NULL
        )`

        return this.dao.run(sql)
    }

    addSmartFarmInputs(farm_input_name, farm_input_description, farm_input_type, associated_product){
        const sql = `INSERT INTO recommendedfarminputs (farm_input_name, farm_input_description, farm_input_type, associated_product) VALUES (?,?,?,?)`
        const params = [farm_input_name, farm_input_description, farm_input_type, associated_product]
        return this.dao.run(sql, params)
    }

    showSmartFarmInputs(){
        const sql = `SELECT * FROM recommendedfarminputs`
        const params = []
        return this.dao.all(sql, params)
    }

    searchSmartFarmInputsByEquipment(associated_product){
        const sql = `SELECT * FROM recommendedfarminputs WHERE farm_input_type = ? AND associated_product LIKE ?`
        const params = ["equipment", `%${associated_product}%`]
        return this.dao.all(sql, params)
    }

    searchSmartFarmInputsByFeed(associated_product){
        const sql = `SELECT * FROM recommendedfarminputs WHERE farm_input_type = ? AND associated_product LIKE ?`
        const params = ["feed", `%${associated_product}%`]
        return this.dao.all(sql, params)
    }

    searchSmartFarmInputsBySeed(associated_product){
        const sql = `SELECT * FROM recommendedfarminputs WHERE farm_input_type = ? AND associated_product LIKE ?`
        const params = ["seed", `%${associated_product}%`]
        return this.dao.all(sql, params)
    }

    searchSmartFarmInputsByEnergy(associated_product){
        const sql = `SELECT * FROM recommendedfarminputs WHERE farm_input_type = ? AND associated_product LIKE ?`
        const params = ["energy", `%${associated_product}%`]
        return this.dao.all(sql, params)
    }

    smartFarmInputDetails(farm_input_id){
        const sql = `SELECT * FROM recommendedfarminputs WHERE farm_input_id = ?`
        const params = [farm_input_id]
        return this.dao.get(sql, params)
    }
}

module.exports = FarmInputsRecommendation