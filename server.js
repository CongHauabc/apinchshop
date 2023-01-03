import  express  from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDB.js";
import ImportData from './DataImport.js';
import productRoute from "./Rotes/ProductRoutes.js";
import { errorHandler, NotFound } from "./Middleware/Errors.js";
import userRoute from "./Rotes/UserRoutes.js";
import orderRouter from "./Rotes/orderRouter.js";
import categoryRoute from "./Rotes/category.js";
import logoRoute from "./Rotes/logo.js";
import bannerRoute from "./Rotes/banner.js";
import newsRoute from "./Rotes/news.js";
import cors from "cors";

dotenv.config()
connectDatabase()
const app = express();
app.use(express.json())
app.use(cors())
// API
app.use("/api/import",ImportData)
app.use("/api/products",productRoute)
app.use("/api/users",userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/logo",logoRoute)
app.use("/api/orders",orderRouter)
app.use("/api/banner",bannerRoute)
app.use("/api/news",newsRoute)
app.get("/api/config/paypal",(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

// error handle
app.use(NotFound)
app.use(errorHandler)

app.get("/",(req,res)=>{
    res.send("API is running ......")
})
const PORT = process.env.PORT || 1000
app.listen(PORT,console.log(`server running port ${PORT} ....`))