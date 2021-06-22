class Yields{
    constructor(dao){
        this.dao = dao
    }

    createYieldTable(){
        const sql = `CREATE TABLE IF NOT EXISTS yields (
            yield_id INTEGER PRIMARY KEY AUTOINCREMENT,
            farmer_id INTEGER NOT NULL,
            yield_name TEXT NOT NULL,
            sample_area TEXT NOT NULL,
            number_of_yields_daily INTEGER NOT NULL,
            yield_weight INTEGER NOT NULL
        )`

        return this.dao.run(sql)
    }

    addYields(farmer_id, yield_name, sample_area, number_of_yields_daily, yield_weight){
        const sql = `INSERT INTO yields (farmer_id, yield_name, sample_area, number_of_yields_daily, yield_weight) VALUES (?,?,?,?,?)`
        const params = [farmer_id, yield_name, sample_area, number_of_yields_daily, yield_weight]
        return this.dao.run(sql, params)
    }

    displayAllYield(){
        const sql = `SELECT * FROM yields`
        const param = []
        return this.dao.all(sql, param)
    }

    displayYield(yield_id){
        const sql = `SELECT * FROM yields WHERE yield_id = ?`
        const params = [yield_id]
        return this.dao.get(sql, params)
    }

    deleteYield(yield_id){
        const sql = `DELETE FROM yields WHERE yield_id = ?`
        const params = [yield_id]
        return this.dao.run(sql, params)
    }
}

module.exports = Yields
