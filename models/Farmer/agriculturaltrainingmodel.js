class AgriculturalTraining{
    constructor(dao){
        this.dao = dao
    }

    createAgriculturalTrainingTable(){
        const sql = `CREATE TABLE IF NOT EXISTS agriculturaltrainingStable (
            training_id INTEGER PRIMARY KEY AUTOINCREMENT,
            training_subject TEXT NOT NULL,
            training_date TEXT NOT NULL,
            training_description TEXT NOT NULL,
            training_location TEXT NOT NULL,
            training_duration INTEGER NOT NULL,
            application_deadline TEXT NOT NULL,
            number_of_attendees INTEGER NOT NULL,
            training_img_url TEXT NOT NULL
        )`

        return this.dao.run(sql)
    }

    addTraining(training_subject, training_date, training_description, training_location, training_duration, application_deadline, number_of_attendees, training_img_url){
        const sql = `INSERT INTO agriculturaltrainingStable (training_subject, training_date, training_description, training_location, training_duration, application_deadline, number_of_attendees, training_img_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        const params = [training_subject, training_date, training_description, training_location, training_duration, application_deadline, number_of_attendees, training_img_url]
        return this.dao.run(sql, params)
    }

    viewTrainings(){
        const sql = `SELECT * FROM agriculturaltrainingStable`
        const params = []
        return this.dao.all(sql, params)
    }

    viewTrainingDetails(training_id){
        const params = [training_id]
        const sql = `SELECT * FROM agriculturaltrainingStable WHERE training_id = ?`
        return this.dao.get(sql, params)
    }

    updateTraining(training_id, training_subject, training_date, training_description, training_location, training_duration, application_deadline, number_of_attendees, training_img_url){
        const sql = `UPDATE agriculturaltrainingStable SET training_subject = ?, training_date = ?, training_description = ?, training_location = ?, training_duration = ?, application_deadline = ?, number_of_attendees = ?, training_img_url = ? WHERE training_id = ?`
        const params = [training_subject, training_date, training_description, training_location, training_duration, application_deadline, number_of_attendees, training_img_url, training_id]
        return this.dao.run(sql, params)
    }

    confirmAttendingTraining(){
        const sql = ``
        return this.dao.run(sql)
    }

    myScheduledTrainings(farmer_id){
        const params = [farmer_id]
        const sql = `SELECT * FROM agriculturaltrainingStable WHERE farmer_id = ?`
        return this.dao.all(sql, params)
    }

    unenrollTrainings(farmer_id, training_id){
        const params = [farmer_id, training_id]
        const sql = `SELECT * FROM agriculturaltrainingStable WHERE farmer_id = ? AND training_id = ?`
        return this.dao.all(sql, params)
    }
}

module.exports = AgriculturalTraining