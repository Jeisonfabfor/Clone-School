import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  title: String,
  description: String,
  category: String,
  images: String,
});
