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
app.use("/api/maintenance", authenticateUser, maintenanceRouter)

// app.use("/api/auth", authRouter)
// app.use("/api/records", recordsRouter)
// app.use("/api/owners", ownersRouter)
// app.use("/api/kings", kingsRouter)
// app.use("/api/profile", updateProfileRouter)
// app.use("/api/posts", postsRouter)
// app.use("/api/props", propsRouter)
// app.use("/api/update", updateDataRouter)

app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal server error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

// roles: ["admin", "manager", "teacher", "maintenence"]
