const mongodb = require("../mongodb");
var express = require("express");
var userRouter = express.Router();

userRouter.post("/", async (req, res) => {
    try {
        const result = await mongodb.insert(req.body);
        res.status(200).json({
            "users": result,
        });
    } catch (error) {
        res.status(400).json({
            "error": error.message,
        });
    }
});

userRouter.get("/", async (req, res) => {
    try {
        let userResponse = await mongodb.findAll();
        res.status(200).json({
            "users": userResponse,
        });
    } catch (error) {
        res.status(400).json({
            "error": error.message,
        });
    }
});

userRouter.get("/:user_id", async (req, res) => {
    try {
        const userId = parseInt(req.params.user_id);
        let userResponse = await mongodb.findOneById(userId);
        res.status(200).json({
            "users": userResponse,
        });
    } catch (error) {
        res.status(400).json({
            "error": error.message,
        });
    }
});

userRouter.get("/phone/:phone", async (req, res) => {
    try {
        const phone = req.params.phone;
        let userResponse = await mongodb.findOneByPhone(phone);
        res.status(200).json({
            "users": userResponse,
        });
    } catch (error) {
        res.status(400).json({
            "error": error.message,
        });
    }
});

userRouter.put("/:user_id", async (req, res) => {
    try {
        const userId = parseInt(req.params.user_id);
        let userResponse = await mongodb.update(userId, req.body);
        console.log(userResponse);
        res.status(200).json({
            "message": "Update successfully!",
            "users": userResponse,
        });
    } catch (error) {
        res.status(400).json({
            "error": error.message,
        });
    }
});

userRouter.delete("/:user_id", async (req, res) => {
    try {
        const userId = parseInt(req.params.user_id);
        let response = await mongodb.deleteOne(userId, req.body);
        res.status(200).json({
            "users": response,
        });
    } catch (error) {
        res.status(400).json({
            "error": error.message,
        });
    }
});


userRouter.post("/list", async (req, res) => {
    try {
        const data = req.body;
        let userListResponse = await mongodb.insertList(req.body);
        res.status(200).json({
            "users": userListResponse,
        });
    } catch (error) {
        res.status(400).json({
            "error": error.message,
        });
    }
});

module.exports = userRouter;
