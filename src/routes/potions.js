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
    catch (err) {
        return res.status(500).json({
            message: err.message,
        })
    }
})

router.post("/", async (req, res) => {
    try {
        const { name, effect, isDangerous } = req.body; //DANGEROUS!⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
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
            name: name,
            effect: effect,
            isDangerous: isDangerous,
        })

        return res.status(500).json({
            message: "Bájital sikeresen hozzáadva!",
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message,
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const [entry] = await db.select()
        .from(potions)
        .where(eq(potions.id, +req.params.id))
        if(!entry) {
            return res.status(404).json({
                message: "Nem sikerült kiválasztani a bájitalt!",
            });
        };
        return res.status(200).json(entry);
    }
    catch (err) {
        return res.status(500).json({
            message: error.message,
        });
    };
});

router.delete("/:id", async (req, res) => {
    try {
        const [user] = await db
        .select()
        .from(potions)
        .where(eq(potions.id, req.params.id));

        if(!user) {
            return res.status(404).json({
                message: "Nincsen felhasználó",
            });
        };

        await db.delete(potions).where(eq(potions.id, req.params.id));
        return res.status(200).json({
            message: "Bájital törölve",
        })
    }
    catch (err) {

    }
})



module.exports = router;