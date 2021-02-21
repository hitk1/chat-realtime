import mongoose from 'mongoose'

const connectToDatabase = async (): Promise<void> => {
    return new Promise(async resolve => {
        await mongoose.connect('mongodb://127.0.0.1:27017/chat',
            {
                useUnifiedTopology: true,
                useCreateIndex: true,
                useNewUrlParser: true
            }
        ).then(() => { console.log('Database connected -> chat') })
        resolve()
    })
}

export default connectToDatabase