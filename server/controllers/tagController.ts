import { Request, Response } from 'express';
import mongoose from 'mongoose';

import Tag from '../model/tag';

const tagController = {
    getAllTags: async (_req: Request, res: Response) => {
        try {
            const tags = await Tag.find({});
            return res.status(200).json(tags);
        } catch (error) {
            console.error('Error getting tags:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    getTag: async (req: Request, res: Response) => {
        try {
            const tag = await Tag.findOne({
                _id: new mongoose.Types.ObjectId(req.params.id),
            });
            return res.status(200).json(tag);
        } catch (error) {
            console.error('Error getting tag:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    getTagsByCategory: async (req: Request, res: Response) => {
        try {
            const tags = await Tag.find({
                category: req.params.category,
            });
            return res.status(200).json(tags);
        } catch (error) {
            console.error('Error getting tags:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    createTag: async (req: Request, res: Response) => {
        const { label } = req.body;
        const value = label.toLowerCase().replace(/\W/g, '');
        try {
            const tag = await Tag.create({ ...req.body, value });
            return res.status(200).json(tag);
        } catch (error) {
            console.error('Error creating tag:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};

export default tagController;
