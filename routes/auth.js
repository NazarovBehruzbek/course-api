const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Foydalanuvchini tizimga kiritish (login)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 description: Telefon raqami
 *                 example: "+998901234567"
 *               password:
 *                 type: string
 *                 description: Parol
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Noto‘g‘ri telefon raqam yoki parol
 *       500:
 *         description: Server xatosi
 */

// Test foydalanuvchi (parol hash qilingan)
const TEST_USER = {
  phone: "887666051",
  password: bcrypt.hashSync("12345", 10), // Parolni hash qilish
};

router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body; // Requestdan ma’lumotlarni olish

    // Telefon raqamni tekshirish
    if (phone !== TEST_USER.phone) {
      return res.status(400).json({ message: "Telefon raqam yoki parol noto‘g‘ri" });
    }

    // Parolni tekshirish
    const isMatch = await bcrypt.compare(password, TEST_USER.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Telefon raqam yoki parol noto‘g‘ri" });
    }

    // Token yaratish
    const token = jwt.sign({ phone: TEST_USER.phone }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Serverda xatolik yuz berdi", error: err.message });
  }
});

module.exports = router;
