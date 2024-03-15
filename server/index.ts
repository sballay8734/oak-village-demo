// TODO: Add authenticateUser back to middleware flow (before mRouter)

import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import mongoose, { ConnectOptions } from "mongoose"
import cookieParser from "cookie-parser"
import { Err } from "./types/error"

import authRouter from "./routes/authRoute"
import { authenticateUser } from "./middleware/authenticateUser"
import maintenanceRouter from "./routes/maintenanceRoute"

dotenv.config({ path: "./config/.env" })

const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true }
}

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGO_URI!, clientOptions)
    await mongoose.connection.db.admin().command({ ping: 1 })
    console.log("CONNECTED TO DB...")
  } catch (error) {
    console.log(error)
  }
}
run().catch(console.dir)

const app = express()
app.use(express.json({ limit: "10mb" }))
app.use(cookieParser())

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server Running on port ${port}`))

app.use("/api/auth", authRouter)
app.use("/api/maintenance", maintenanceRouter)

app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal server error"
  const type = err.type || "unhandled"
  if (message.length > 50) {
    console.error(`ERR MSG IS TOO LONG! MSG = ${message}`)
  }
  return res.status(statusCode).json({
    message,
    statusCode,
    success: false,
    type
  })
})

// roles: ["admin", "manager", "teacher", "maintenence"]
