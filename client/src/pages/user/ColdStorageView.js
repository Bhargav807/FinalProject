import React, { useState, useEffect } from 'react';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserMenu from './UserMenu';
import Nav from '../../components/UIComponents/Nav';
import { isMobile } from 'react-device-detect'; // Import isMobile from react-device-detect

const ColdStorageView = () => {
    const [coldStorages, setColdStorages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/coldstorage/get-all-coldstorage');
                if (response.data.success) {
                    setColdStorages(response.data.data);
                } else {
                    console.error('Failed to fetch cold storages:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching cold storages:', error);
            }
        };
    
        fetchData();
    }, []);

    const handlePhoneCall = (phoneNumber) => {
        if (!isMobile) {
            alert('Phone call is only available on mobile devices.');
        } else {
            window.location.href = `tel:${phoneNumber}`;
        }
    };

    const handleWhatsAppMessage = (phoneNumber) => {
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
    };

    return (
        <>
            <Header />
            <Nav />
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h3>Cold Storage Details</h3>
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {/* Display Cold Storage Details */}
                            {coldStorages.map(coldStorage => (
                                <div key={coldStorage._id} className="col">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{coldStorage.cold_storage_name}</h5>
                                            <p className="card-text">Description: {coldStorage.cold_storage_desc}</p>
                                            <p className="card-text">Model: {coldStorage.cold_storage_model}</p>
                                            <p className="card-text">License: {coldStorage.license}</p>
                                            {/* Display owner details */}
                                            <p className="card-text">Owner: {coldStorage.owner_name}</p>
                                            {/* Display phone number with call and WhatsApp buttons */}
                                            <div className="d-flex justify-content-between align-items-center">
                                                <button className="btn btn-primary" onClick={() => handlePhoneCall(coldStorage.phone_number)}>Call</button>
                                                <button className="btn btn-success" onClick={() => handleWhatsAppMessage(coldStorage.phone_number)}>WhatsApp</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ColdStorageView;






// // use the commented code when you want to display the call option based on device

// import React, { useState, useEffect, useContext } from 'react';
// import Header from '../../components/layouts/Header';
// import Footer from '../../components/layouts/Footer';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import UserMenu from './UserMenu';
// import AuthContext from '../../context/AuthContext';
// import { isMobile } from 'react-device-detect';
// import Nav from '../../components/UIComponents/Nav';

// const ColdStorageView = () => {
//     const [coldStorages, setColdStorages] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/v1/coldstorage/get-all-coldstorage');
//                 if (response.data.success) {
//                     setColdStorages(response.data.data);
//                 } else {
//                     console.error('Failed to fetch cold storages:', response.data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching cold storages:', error);
//             }
//         };
    
//         fetchData();
//     }, []);

//     const handlePhoneCall = (phoneNumber) => {
//         if (isMobile) {
//             window.location.href = `tel:${phoneNumber}`;
//         } else {
//             alert('Phone call is only available on mobile devices.');
//         }
//     };

//     const handleWhatsAppMessage = (phoneNumber) => {
//         window.open(`https://wa.me/${phoneNumber}`, '_blank');
//     };

//     return (
//         <>
//             <Header />
//             <Nav />
//             <div className="container-fluid m-3 p-3">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <UserMenu />
//                     </div>
//                     <div className="col-md-8 text-center m-1" style={{ minHeight: '50vh' }}>
//                         <h3>Cold Storage Details</h3>
//                         <div className="m-1">
//                             {/* Display Cold Storage Details */}
//                             {coldStorages.map(coldStorage => (
//                                 <div key={coldStorage._id} className="card m-2">
//                                     <div className="card-body">
//                                         <h5 className="card-title">{coldStorage.cold_storage_name}</h5>
//                                         <p className="card-text">Description: {coldStorage.cold_storage_desc}</p>
//                                         <p className="card-text">Model: {coldStorage.cold_storage_model}</p>
//                                         <p className="card-text">License: {coldStorage.license}</p>
//                                         {/* Display owner details */}
//                                         <p className="card-text">Owner: {coldStorage.owner_name}</p>
//                                         {/* Display phone number with call and WhatsApp buttons */}
//                                         <div className="d-flex justify-content-between align-items-center">
//                                             {isMobile && (
//                                                 <button className="btn btn-primary" onClick={() => handlePhoneCall(coldStorage.phone_number)}>Call</button>
//                                             )}
//                                             <button className="btn btn-success" onClick={() => handleWhatsAppMessage(coldStorage.phone_number)}>WhatsApp</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };
// export default ColdStorageView;
