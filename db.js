const mongoose = require('mongoose');
require('dotenv').config()
const mongoUrl = process.env.DB_URL
// to use above, add url of atlas mongo db in env, or else simply run  below locally by starting mongo db compass 
// const mongoUrl = 'mongodb://localhost:27017/mydbb'
mongoose.connect(mongoUrl)
db = mongoose.connection
db.on(('connected'), () => {
    console.log('database connected')
}
)
db.on(('error'), (err) => {
    console.error('we got an error while connecting to database', err)
}
)
db.on(('disconnected'), () => {
    console.log('database disconnected')
}
)

module.exports = db 