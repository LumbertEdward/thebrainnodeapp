class CustomerNotifications{
    constructor(dao){
        this.dao = dao
    }

    CreateNotification(){
        const sql = `CREATE TABLE IF NOT EXISTS customernotifications(
            notifiation_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            notification TEXT NOT NULL,
            notification_date TEXT NOT NULL
        )`

        return this.dao.run(sql)
    }

    addNotification(user_id, notification, notification_date){
        const sql = `INSERT INTO customernotifications (user_id, notification, notification_date) VALUES (?, ?, ?)`
        const params = [user_id, notification, notification_date]
        return this.dao.run(sql, params)
    }

    viewUserNotifications(user_id){
        const sql = `SELECT * FROM customernotifications WHERE user_id = ?`
        const params = [user_id]
        return this.dao.all(sql, params)
    }

    viewAllNotifications(){
        const sql = `SELECT * FROM customernotifications`
        return this.dao.all(sql)
    }

}

module.exports = CustomerNotifications