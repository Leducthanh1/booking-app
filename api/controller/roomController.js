import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: {rooms: savedRoom._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const roomId = req.params.id
        const updateRoom = await Room.findByIdAndUpdate(roomId, { $set: req.body}, { new: true});
        res.status(200).json(updateRoom);
    } catch (error) {
        next(error);
    }
}

export const deleteRoom = async (req, res, next) => {
    try {
        const roomId = req.params.id;
        const hotelId = req.params.hotelid;
        await Room.findByIdAndDelete(roomId);
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: {rooms: roomId}})
        } catch (error) {
            next(error);
        }
        res.status(200).json("Room has been deleted");
    } catch (error) {
        next(error);
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findById(roomId);
        res.status(200).json(room);
    } catch (error) {
        next(error)
    }
}

export const getAllRoom = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error)
    }
}