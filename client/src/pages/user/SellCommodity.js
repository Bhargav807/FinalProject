import React, { useState, useContext, useEffect } from 'react';
import Footer from '../../components/layouts/Footer';
import { Radio } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import commodities from "../../Data/Commodities"; // Import the data from Commodities.js
import Nav from '../../components/UIComponents/Nav';



const SellCommodity = () => {

  const navigate = useNavigate();

  const [photo, setPhoto] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [organic, setOrganic] = useState("")
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("")
  const [commodityId, setCommodityId] = useState("")

  const [suggestions, setSuggestions] = useState([]);

  const [isFocused, setIsFocused] = useState(false);


  const [auth] = useContext(AuthContext);

  const filterSuggestions = (input) => {
    const filtered = commodities.filter(product => product.name.toLowerCase().includes(input.toLowerCase()));
    setSuggestions(filtered.map(product => product.name));
    /// i wnat to assign commodityId to product._id
    setCommodityId(filtered.map(product => product._id))
  }


  useEffect(() => {
    if (name && isFocused) { // Only filter suggestions when name is not empty and input is focused
      filterSuggestions(name);
    } else {
      setSuggestions([]); // Clear suggestions when name is empty or input is not focused
    }
  }, [name, isFocused]);

  const handleSelect = (suggest) => {
    setName(suggest);
    setSuggestions([]); // Clear suggestions when item is selected
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false); // Set input focus state to false after a delay
    }, 200);
  };





  const handleCreate = async (e) => {



    e.preventDefault();

    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("shipping", shipping);
      productData.append("sellerId", auth.user._id)
      productData.append("availableDate", availableDate)
      productData.append("organic", organic)
      productData.append("quantityUnit", quantityUnit)
      productData.append("commodityId", commodityId[0])



      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/create-product`, productData);

      if (data?.success) {

        toast.success("Product created successfully");

        navigate("/dashboard/user/listings-posted");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Error occurred while creating product hrere");
    }
  }

  return (
    <>

      <Nav />
      <div className="container-fluid m-3 p-3 d-flex justify-content-center">
  <div className="col-md-8 text-center m-1" style={{ minHeight: "50vh", backgroundColor: "#f0f0f0", borderRadius: "10px", padding: "20px" }}>
    <h3 style={{ color: "#333" }}>Fill Product details to post</h3>
    <div className="m-1">
      {/* Photo Upload */}
      <div className="mb-3">
        <label className='btn btn-primary'>
          {photo ? photo.name : "Upload photo"}
          <input type="file" name="photo" id="" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
        </label>
      </div>
      {photo && (
        <div className="mb-3 text-center">
          <img src={URL.createObjectURL(photo)} alt="Product " height={"200px"} className="img img-responsive" style={{ borderRadius: "5px" }} />
        </div>
      )}
      {/* Form Inputs */}
      <div className="mb-3">
        <input
          type="text"
          value={name}
          placeholder='Enter name'
          className='form-control'
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
        {isFocused && suggestions.length > 0 && name && (
          <ul style={{ listStyle: "none", paddingLeft: "0", display: "flex", flexDirection: "column" }}>
            {suggestions.map((suggest, index) => (
              <li key={index} className='bg-info p-2 m-1' onClick={() => handleSelect(suggest)} style={{ borderRadius: "5px", cursor: "pointer" }}>
                {suggest}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-3 d-flex align-items-center">
        <input type="number" value={price} placeholder='Rs. Price' className='form-control' onChange={(e) => setPrice(e.target.value)} style={{ borderRadius: "5px", width: "120px" }} />
        <span className='m-3' style={{ fontWeight: "600" }}>per</span>
        <select className="form-select" value={quantityUnit} onChange={(e) => setQuantityUnit(e.target.value)} style={{ borderRadius: "5px", width: "120px" }}>
          <option value="ton">ton</option>
          <option value="box">box</option>
          <option value="quintal">quintal</option>
          <option value="dozen">dozen</option>
          <option value="kg">kg</option>
          <option value="item">item</option>
          <option value="bag">bag</option>
        </select>
      </div>

      <div className="mb-3 d-flex align-items-center">
        <input type="number" value={quantity} placeholder='Total quantity available' className='form-control me-2' onChange={(e) => setQuantity(e.target.value)} style={{ borderRadius: "5px", width: "220px" }} />
        <span className='m-2'>tons</span>
      </div>

      <div className="m-4 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="m-0 me-3 text-dark" style={{ fontWeight: "600" }}>Available by:</label>
        <div className="dater">
          <input type="date" value={availableDate} placeholder='Available date' className='form-control' onChange={(e) => setAvailableDate(e.target.value)} style={{ borderRadius: "5px", width: "150px" }} />
        </div>
        <div className="data d-flex align-items-center">
          <label htmlFor="" className='m-4 text-dark' style={{ fontWeight: "600" }}>Is shipping available?</label>
          <select className="form-select" value={shipping} onChange={(e) => setShipping(e.target.value)} style={{ borderRadius: "5px", width: "100px" }}>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <label htmlFor="" className='m-4 text-dark' style={{ fontWeight: "600" }}>Organic</label>
          <select className="form-select" value={organic} onChange={(e) => setOrganic(e.target.value)} style={{ borderRadius: "5px", width: "100px" }}>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <input type="text" value={description} placeholder='Enter description' className='form-control' onChange={(e) => setDescription(e.target.value)} style={{ borderRadius: "5px" }} />
      </div>

      <div className="d-flex justify-content-end">
        <button onClick={handleCreate} className='btn btn-primary me-2' style={{ borderRadius: "5px" }}>Create Commodity</button>
        <button className='btn btn-secondary' style={{ borderRadius: "5px" }}>Cancel</button>
      </div>
    </div>
  </div>
</div>




      <Footer />



    </>
  )
}

export default SellCommodity;
