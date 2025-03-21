const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - phone
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: Foydalanuvchi ID-si
 *         phone:
 *           type: string
 *           description: Telefon raqami
 *         password:
 *           type: string
 *           description: Parol
 *         token:
 *           type: string
 *           description: JWT token
 */

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

const TEST_USER = {
    phone_number: "887666051",
    password: "12345",
  };
router.post("/login", async (req, res) => {
    try {
        if (phone_number !== TEST_USER.phone_number || password !== TEST_USER.password) {
            return res.status(400).json({ message: "Telefon raqam yoki parol noto‘g‘ri" });
          }
        // Parolni tekshirish
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Telefon raqam yoki parol noto‘g‘ri" });
        }

        // Token yaratish
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", err });
    }
});

module.exports = router;
