import ColdStorageModel from "../models/ColdStorageModel.js";

export const getColdStorageController = async (req, res) => {
    try {
        const coldStorages = await ColdStorageModel.find();
        res.status(200).json({
            success: true,
            data: coldStorages
        });
    } catch (error) {
        console.error("Error fetching cold storages:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching cold storages",
            error: error.message
        });
    }
};
export const addColdStorageController = async (req, res) => {
    try {
        // Destructure the request body outside of the try-catch block
        const { cold_storage_name, cold_storage_desc, cold_storage_model, license, owner_id, owner_name, phone_number } = req.body;

        console.log("Destructured successfully");

        // Create a new ColdStorage document using the ColdStorageModel
        const newColdStorage = new ColdStorageModel({
            cold_storage_name,
            cold_storage_desc,
            cold_storage_model,
            license,
            owner_id,
            owner_name,
            phone_number // Include owner's name and phone number
        });

        console.log("Data into newColdStorage successfully");

        // Save the new ColdStorage document to the database
        const savedColdStorage = await newColdStorage.save();

        console.log("Saved cold storage data successfully");

        res.status(201).send({
            success: true,
            message: "Cold Storage created successfully!",
            data: savedColdStorage // Optionally, you can send back the newly created ColdStorage document
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating Cold Storage",
            error
        });
    }
};

