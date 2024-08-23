const { paginationData } = require("../helper/pagination");
const itemModel = require("../model/items");
const moment = require("moment");

const addItem = async (req, res) => {
    try {
        console.log(req.body)
        const items = JSON.parse(req.body.items);

        const formattedItems = items.map((item, index) => ({
            title: item.title,
            description: item.description,
            quantity: item.quantity,
            price: item.price,
            date: item.date,
            image: req.files && req.files[index] ? Date.now() + '-' + req.files[index].originalname : null, // Add image path if available
        }));

        await itemModel.insertMany(formattedItems);
        return res.status(201).json({ message: "Data inserted successfully", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getItems = async (req, res) => {
    try {
        const { search, startDate, endDate } = req.query;

        const filter = {};

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: new RegExp(search.trim(), "i"),
                    },
                },
                {
                    description: {
                        $regex: new RegExp(search.trim(), "i"),
                    },
                }
            ];
        }

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            filter.date = {
                $gte: start.toISOString(),
                $lte: end.toISOString()
            }
        }
        console.log(filter)
        const { offset, limit } = paginationData(req);
        const items = await itemModel.find(filter)
            .skip(offset)
            .limit(limit);
        const totalItems = await itemModel.countDocuments(filter);

        res.status(200).json({
            items,
            totalItems,
            totalPages: Math.ceil(totalItems / limit)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { addItem, getItems };