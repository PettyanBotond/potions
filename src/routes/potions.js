const express = require("express");
const { eq } = require("drizzle-orm");

const db = require("../db/db");
const { potions } = require("../db/schema");

const router = express.Router();

router.get("/api/potions", async (req, res) => {
    try {
        const allPotions = await db.select().from(potions);
        return res.status(200).json(allPotions);
        
    }
})

router.post("/", async (req, res) => {
    try {
        const { name, effect, isDangerous } = req.body;
        if(!name) {
            return res.status(404).json({
                message: "Nem volt megadva név!",
            })
        }
        if(!effect) {
            return res.status(404).json({
                message: "Nem volt megadva effektus!",
            })
        }
        if(isDangerous === undefined) {
            return res.status(404).json({
                message: "Nem volt megadva, hogy veszélyes-e vagy sem!",
            })
        }

        await db.insert(potions).values({
            return res.status(500).json({
                message: "Bájital sikeresen hozzáadva!",
            })
        })
    }
})



module.exports = router;