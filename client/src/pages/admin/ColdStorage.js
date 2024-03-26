import React, { useState, useContext } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const ColdStorage = () => {
  const [coldStorageData, setColdStorageData] = useState({
    cold_storage_name: "",
    cold_storage_desc: "",
    cold_storage_model: "",
    license: "",
    owner_name: "", // Add owner_name field
    phone_number: "", // Add phone_number field
  });

  const [auth] = useContext(AuthContext); // Extracting auth context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColdStorageData({ ...coldStorageData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       
      const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/coldstorage/add-coldstorage`, {
        ...coldStorageData,
        owner_id: auth.user._id, // Using owner ID from auth context
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setColdStorageData({
          cold_storage_name: "",
          cold_storage_desc: "",
          cold_storage_model: "",
          license: "",
          owner_name: "", 
          phone_number: "", 
        });
      } else {
        toast.error("Failed to create cold storage");
      }
    } catch (error) {
      console.error("Error creating cold storage:", error);
      toast.error("An error occurred while creating cold storage");
    }
  };

  return (
    <>
      <Header />
      <div className="row m-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>Add New Cold Storage</h3>
          <div className="w-50">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="cold_storage_name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="cold_storage_name"
                  name="cold_storage_name"
                  value={coldStorageData.cold_storage_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cold_storage_desc">Description</label>
                <textarea
                  className="form-control"
                  id="cold_storage_desc"
                  name="cold_storage_desc"
                  value={coldStorageData.cold_storage_desc}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
  <label htmlFor="owner_name">Owner Name</label>
  <input
    type="text"
    className="form-control"
    id="owner_name"
    name="owner_name"
    value={coldStorageData.owner_name}
    onChange={handleChange}
  />
</div>
<div className="form-group">
  <label htmlFor="phone_number">Phone Number</label>
  <input
    type="text"
    className="form-control"
    id="phone_number"
    name="phone_number"
    value={coldStorageData.phone_number}
    onChange={handleChange}
  />
</div>
              <div className="form-group">
                <label htmlFor="cold_storage_model">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="cold_storage_model"
                  name="cold_storage_model"
                  value={coldStorageData.cold_storage_model}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="license">License</label>
                <input
                  type="text"
                  className="form-control"
                  id="license"
                  name="license"
                  value={coldStorageData.license}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ColdStorage;
