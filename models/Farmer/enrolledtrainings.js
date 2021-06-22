class EnrolledTrainings{
    constructor(dao){
        this.dao = dao
    }

    createEnrolledTrainingsTable(){
        const sql = `CREATE TABLE IF NOT EXISTS enrolledtrainings (
            enrolled_id INTEGER PRIMARY KEY AUTOINCREMENT,
            training_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL
        )`

        return this.dao.run(sql)
    }

    enrollForTraining(training_id, user_id){
        const sql = `INSERT INTO enrolledtrainings (training_id, user_id) VALUES (?, ?)`
        const params = [training_id, user_id]
        return this.dao.run(sql, params)
    }

    viewEnrolledTrainings(user_id){
        const sql = `SELECT * FROM enrolledtrainings WHERE user_id = ?`
        const params = [user_id]
        return this.dao.all(sql, params)

    }

    unenrollForTraining(training_id, user_id){
        const sql = `DELETE FROM enrolledtrainings WHERE training_id = ? AND user_id = ?`
        const params = [training_id, user_id]
        return this.dao.run(sql, params)
    }
}

module.exports = EnrolledTrainings