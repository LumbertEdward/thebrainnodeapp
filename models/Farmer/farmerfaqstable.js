class FaqsDetails{
    constructor(dao){
        this.dao = dao
    }

    createFAQTable(){
        const sql = `CREATE TABLE IF NOT EXISTS faqs (
            faq_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            farmer_id INTEGER NOT NULL,
            time TEXT NOT NULL,
            question TEXT NOT NULL
        )`

        return this.dao.run(sql)
    }

    addFaq(farmer_id, time, question){
        const sql = `INSERT INTO faqs (farmer_id, time, question) VALUES (?, ?, ?)`
        const params = [farmer_id, time, question]
        return this.dao.run(sql, params)
    }

    viewFaq(faq_id){
        const sql = `SELECT * FROM faqs WHERE faq_id = ?`
        const params = [faq_id]
        return this.dao.get(sql, params)
    }

    viewAllFaqs(){
        const sql = `SELECT * FROM faqs`
        const params = []
        return this.dao.all(sql, params)
    }

}

module.exports = FaqsDetails