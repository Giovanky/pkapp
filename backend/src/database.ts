import {connect} from 'mongoose' 

export const connectDatabase = async() => {
    try{
        await connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
        console.log('Database is connected')
    }catch(err){
        console.log(err)
    }
}