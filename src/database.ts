import mongoose from 'mongoose'

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost/ts-app-tutorial', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(">>> Database connected.");
        
    } catch (error) {
        console.log('Error bro');
        
    }
}

export default connect