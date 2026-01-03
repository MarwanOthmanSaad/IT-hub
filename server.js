// 1. استدعاء المكتبات الأساسية
require('dotenv').config(); // لقراءة ملف .env (الحماية)
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");



// 2. استدعاء الروابط (Routes)

//////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////



const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());

// 3. Middlewares
app.use(express.json()); // للسماح للسيرفر بقراءة بيانات الـ JSON

// 4. الاتصال بقاعدة البيانات MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB successfully ✅");
    })
    .catch((error) => {
        console.log("Database connection error ❌", error);
    });

// 5. استخدام الروابط
//app.use("/articles", articleRoutes); // كل روابط المقالات تبدأ بـ /articles
app.use("/users", userRoutes);
     // كل روابط المستخدمين تبدأ بـ /users

// 6. تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});