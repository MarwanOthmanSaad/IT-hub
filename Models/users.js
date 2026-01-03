const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "اسم المستخدم مطلوب"],
        unique: true, // لمنع تكرار نفس الاسم
        trim: true
    },
    firstName: {
        type: String,
        required: [true, "الاسم الأول مطلوب"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "الاسم الأخير مطلوب"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "البريد الإلكتروني مطلوب"],
        unique: true,
        lowercase: true // تحويل الإيميل لأحرف صغيرة دائماً
    },
    password: {
        type: String,
        required: [true, "كلمة المرور مطلوبة"],
        minlength: 8
    }
});

module.exports = mongoose.model("User", userSchema);