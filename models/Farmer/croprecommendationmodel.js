class CropRecommendation{
    constructor(dao){
        this.dao = dao
    }

    createRecommendationsTable(){
        const sql = `CREATE TABLE IF NOT EXISTS recommendedcrops (
            crop_id INTEGER PRIMARY KEY AUTOINCREMENT,
            crop_name TEXT NOT NULL,
            crop_description TEXT NOT NULL,
            soil_type TEXT NOT NULL,
            lowest_temperature INTEGER NOT NULL,
            highest_temperature INTEGER NOT NULL,
            lowest_rainfall INTEGER NOT NULL,
            highest_rainfall INTEGER NOT NULL,
            crop_img TEXT NOT NULL
        )`

        return this.dao.run(sql)
    }

    addSmartCrops(crop_name, crop_description, soil_type, lowest_temperature, highest_temperature, lowest_rainfall, highest_rainfall, crop_img = " "){
        const sql = `INSERT INTO recommendedcrops (crop_name, crop_description, soil_type, lowest_temperature, highest_temperature, lowest_rainfall, highest_rainfall, crop_img) VALUES (?,?,?,?,?,?,?,?)`
        const params = [crop_name, crop_description, soil_type, lowest_temperature, highest_temperature, lowest_rainfall, highest_rainfall, crop_img]
        return this.dao.run(sql, params)
    }

    showSmartCrops(){
        const sql = `SELECT * FROM recommendedcrops`
        const params = []
        return this.dao.all(sql, params)
    }

    searchSmartCropsByTemperature(highest_temperature){
        const sql = `SELECT * FROM recommendedcrops WHERE highest_temperature <= ?`
        const params = [parseInt(highest_temperature)]
        return this.dao.all(sql, params)
    }

    searchSmartCropsByRainfall(lowest_rainfall, highest_rainfall){
        const sql = `SELECT * FROM recommendedcrops WHERE lowest_rainfall >= ? AND highest_rainfall <= ? `
        const params = [lowest_rainfall, highest_rainfall]
        return this.dao.all(sql, params)
    }

    searchSmartCropsBySoilType(soil_type){
        const sql = `SELECT * FROM recommendedcrops WHERE soil_type LIKE ?`
        const params = [`%${soil_type}%`]
        return this.dao.all(sql, params)
    }

    smartCropDetails(crop_id){
        const sql = `SELECT * FROM recommendedcrops WHERE crop_id = ?`
        const params = [crop_id]
        return this.dao.get(sql, params)
    }
}

module.exports = CropRecommendation