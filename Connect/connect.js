import mongoose from 'mongoose'

const connect = mongoose.connect('mongodb://0.0.0.0:27017/socialnetworkDB', { useNewUrlParser: true })

export default connect
