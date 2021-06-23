var Sqlite = require('sqlite3')
var Promise = require('bluebird')

class FarmerConnection{
    constructor(dao){
        this.db = new Sqlite.Database(dao, (err) => {
            if(err){
                console.log("Not Connected")
            }
        })
    }

    run(sql, params = []){
        return new Promise((resolve, reject) => {
            return this.db.run(sql, params, (err) => {
                if(err){
                    reject(err)
                }
                else{
                    resolve({"data": this.name})
                }
            })
        })
    }

    get(sql, params = []){
        return new Promise((resolve, reject) => {
            return this.db.get(sql, params, (err, row) => {
                if(err){
                    reject(err)
                }
                else{
                    resolve({row})
                }
            })
        })
    }

    all(sql, params = []){
        return new Promise((resolve, reject) => {
            return this.db.all(sql, params, (err, rows) => {
                if(err){
                    reject(err)
                }
                else{
                    resolve({data: rows})
                }
            })
        })
    }
}

module.exports = FarmerConnection
