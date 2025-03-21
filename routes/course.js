const express = require("express");
const Course = require("../models/Course");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Barcha kurslarni olish
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Kurslar ro‘yxati
 */
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", error: err.message });
    }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: ID bo‘yicha kurs olish
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kurs ID-si
 *     responses:
 *       200:
 *         description: Kurs ma'lumotlari
 *       404:
 *         description: Kurs topilmadi
 */
router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: `ID ${req.params.id} bo'yicha kurs topilmadi` });
        }
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", error: err.message });
    }
});

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Yangi kurs yaratish
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Yangi kurs yaratildi
 *       400:
 *         description: Ma'lumot yetarli emas
 */
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description, price } = req.body;
        if (!title || !description || !price) {
            return res.status(400).json({ message: "Hamma ma'lumotlar kiritilishi kerak" });
        }
        const newCourse = new Course({ title, description, price });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", error: err.message });
    }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Kursni yangilash
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kurs ID-si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Kurs yangilandi
 *       404:
 *         description: Kurs topilmadi
 */
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: `ID ${req.params.id} bo'yicha kurs topilmadi` });
        }
        res.json({ message: "Yangilandi", updatedCourse });
    } catch (err) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", error: err.message });
    }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Kursni o‘chirish
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kurs ID-si
 *     responses:
 *       200:
 *         description: Kurs o‘chirildi
 *       404:
 *         description: Kurs topilmadi
 */
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deleteCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deleteCourse) {
            return res.status(404).json({ message: `ID ${req.params.id} bo'yicha kurs topilmadi` });
        }
        res.json({ message: "Kurs o‘chirildi", deleteCourse });
    } catch (err) {
        res.status(500).json({ message: "Serverda xatolik yuz berdi", error: err.message });
    }
});

module.exports = router;
