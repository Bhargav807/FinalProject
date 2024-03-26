import mongoose from "mongoose";

const coldstorageSchema = new mongoose.Schema({
  cold_storage_name: { type: String, default: null },
  cold_storage_desc: { type: String, default: null },
  cold_storage_model: { type: String, default: null },
  license: { type: String, default: null },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users' // Reference to user model
  },
  owner_name: { type: String, default: null }, 
  phone_number: { type: String, default: null }
}, { timestamps: true });

export default mongoose.model('ColdStorage', coldstorageSchema);
