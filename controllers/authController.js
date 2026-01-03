const User = require("../Models/users");
const Joi = require("joi");

exports.register = async (req, res) => {
    // 1. قواعد التحقق (Validation) باستخدام Joi
    const schema = Joi.object({
        username: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.any().equal(Joi.ref('password')).required()
            .messages({ 'any.only': 'كلمتا المرور غير متطابقتين' })
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        // 2. إنشاء المستخدم (بدون confirmPassword)
        const newUser = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password // ملاحظة: يجب تشفيرها لاحقاً بمكتبة bcrypt
        });

        await newUser.save();
        res.status(201).json({ message: "تم إنشاء الحساب بنجاح" });

    } catch (err) {
        if (err.keyValue.username) {
            return res.status(400).json({ message: "اسم المستخدم هذا مأخوذ، اختر اسماً آخر" });
        }

        if (err.keyValue.email) {
            return res.status(400).json({ message: "هذا الإيميل مسجل لدينا بالفعل" });
        }
        res.status(500).json({ message: "خطأ في السيرفر" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // البحث عن المستخدم بواسطة الإيميل
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "المستخدم غير موجود" });
        }

        // التأكد من كلمة المرور (مؤقتاً بدون تشفير حتى نفعله لاحقاً)
        if (user.password !== password) {
            return res.status(400).json({ message: "كلمة المرور خاطئة" });
        }

        res.status(200).json({ message: "تم تسجيل الدخول بنجاح", user: user });
    } catch (error) {
        res.status(500).json({ message: "خطأ في السيرفر" });
    }
};