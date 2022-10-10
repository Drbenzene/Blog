import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from 'cors'
import morgan from "morgan";
import connectDB from './config/db.js'
import postRouter from './routes/postRoute.js'
import userRouter from './routes/userRoute.js'
import {Server} from 'socket.io'

dotenv.config()



//Starting Express Application

const app = express();




// const io = new Server(app)

//Initial 

const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(express.json({limit: "50mb"}))

app.get("/", (req, res) => {
    res.send("API is running perfectly");
})

//USER API CONNECTIONS 
app.use("/api/", postRouter)
app.use("/api/users", userRouter)


// Server Startings

const start = async (PORT) => {
    try {
        await connectDB()

        const server = app.listen(PORT, (err) => {
            if (err) throw err
        console.log(`Server is running on port ${PORT}`.yellow.bold);
        });

    } catch (error) {
        console.log(error);
    }
}

start(process.env.PORT || 5000)