class FaqReplies{
    constructor(dao){
        this.dao = dao
    }

    createFAQRepliesTable(){
        const sql = `CREATE TABLE IF NOT EXISTS faqreplies (
            reply_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            faq_id INTEGER NOT NULL,
            farmer_id INTEGER NOT NULL,
            time TEXT NOT NULL,
            reply TEXT NOT NULL
        )`

        return this.dao.run(sql)
    }

    addReplyFaq(faq_id, farmer_id, time, reply){
        const sql = `INSERT INTO faqreplies (faq_id, farmer_id, time, reply) VALUES (?, ?, ?, ?)`
        const params = [faq_id, farmer_id, time, reply]
        return this.dao.run(sql, params)
    }

    viewReply(faq_id){
        const sql = `SELECT * FROM faqreplies WHERE faq_id = ?`
        const params = [faq_id]
        return this.dao.all(sql, params)
    }
}

module.exports = FaqReplies