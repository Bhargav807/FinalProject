// // PhoneNumberVerification.js
// import React, { useState } from "react";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "./firebase.config";
// import { CgSpinner } from "react-icons/cg";
// import { BsTelephoneFill, BsFillShieldLockFill } from "react-icons/bs";
// import OtpInput from "otp-input-react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { toast, Toaster } from "react-hot-toast";

// const PhoneNumberVerification = () => {
//   const [otp, setOtp] = useState("");
//   const [ph, setPh] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);

//   function onCaptchVerify() {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: () => {
//             onSignup();
//           },
//           "expired-callback": () => {},
//         },
//         auth
//       );
//     }
//   }

//   function onSignup() {
//     setLoading(true);
//     onCaptchVerify();

//     const appVerifier = window.recaptchaVerifier;

//     const formatPh = "+" + ph;

//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOTP(true);
//         toast.success("OTP sent successfully!");
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }

//   function onOTPVerify() {
//     setLoading(true);
//     window.confirmationResult
//       .confirm(otp)
//       .then(() => {
//         setLoading(false);
//         toast.success("Login successful!"); // Display toast on success
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }

//   return (
//     <div>
//       <Toaster toastOptions={{ duration: 4000 }} />
//       <div id="recaptcha-container"></div>
//       <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
//         <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
//           Welcome to <br /> CODE A PROGRAM
//         </h1>
//         {showOTP ? (
//           <>
//             <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//               <BsFillShieldLockFill size={30} />
//             </div>
//             <label
//               htmlFor="otp"
//               className="font-bold text-xl text-white text-center"
//             >
//               Enter your OTP
//             </label>
//             <OtpInput
//               value={otp}
//               onChange={setOtp}
//               OTPLength={6}
//               otpType="number"
//               disabled={false}
//               autoFocus
//               className="opt-container "
//             ></OtpInput>
//             <button
//               onClick={onOTPVerify}
//               className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//             >
//               {loading && (
//                 <CgSpinner size={20} className="mt-1 animate-spin" />
//               )}
//               <span>Verify OTP</span>
//             </button>
//           </>
//         ) : (
//           <>
//             <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//               <BsTelephoneFill size={30} />
//             </div>
//             <label
//               htmlFor=""
//               className="font-bold text-xl text-white text-center"
//             >
//               Verify your phone number
//             </label>
//             <PhoneInput country={"in"} value={ph} onChange={setPh} />
//             <button
//               onClick={onSignup}
//               className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//             >
//               {loading && (
//                 <CgSpinner size={20} className="mt-1 animate-spin" />
//               )}
//               <span>Send code via SMS</span>
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PhoneNumberVerification;
//-------------------Modified 1-----------------------------

// import React, { useState, useEffect } from "react"; // Import useEffect hook
// import { initializeApp } from "firebase/app"; // Import initializeApp function
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"; // Import getAuth, RecaptchaVerifier, and signInWithPhoneNumber
// import { CgSpinner } from "react-icons/cg";
// import { BsTelephoneFill, BsFillShieldLockFill } from "react-icons/bs";
// import OtpInput from "otp-input-react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { toast, Toaster } from "react-hot-toast";

// const PhoneNumberVerification = () => {
//   const [otp, setOtp] = useState("");
//   const [ph, setPh] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);
//   const [auth, setAuth] = useState(null); // Initialize auth state

//   useEffect(() => {
//     // Initialize Firebase App and Auth on component mount
//     const firebaseConfig = {
//       // Your Firebase configuration
//       apiKey: "AIzaSyBZ1cy_B7fmAWHdPA6QIQzjIWGkBvMoxDY",
//       authDomain: "otp-project-feb20.firebaseapp.com",
//       projectId: "otp-project-feb20",
//       storageBucket: "otp-project-feb20.appspot.com",
//       messagingSenderId: "765547595784",
//       appId: "1:765547595784:web:ef18151f2a3987fdb329bd",
//       measurementId: "G-NGGPLSNH9Y"
//     };

//     const app = initializeApp(firebaseConfig);
//     const authInstance = getAuth(app);

//     setAuth(authInstance); // Set the auth state once initialized
//   }, []); // Empty dependency array to ensure this effect runs only once on mount

//   function onCaptchVerify() {
//     if (!window.recaptchaVerifier && auth) { // Check if auth is available
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: () => {
//             onSignup();
//           },
//           "expired-callback": () => {},
//         },
//         auth // Pass auth instance to RecaptchaVerifier
//       );
//     }
//   }

//   function onSignup() {
//     setLoading(true);
//     onCaptchVerify();

//     const appVerifier = window.recaptchaVerifier;

//     const formatPh = "+" + ph;

//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOTP(true);
//         toast.success("OTP sent successfully!");
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }

//   function onOTPVerify() {
//     setLoading(true);
//     window.confirmationResult
//       .confirm(otp)
//       .then(() => {
//         setLoading(false);
//         toast.success("Login successful!"); // Display toast on success
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }


  

//   return (
//     <div>
//       <Toaster toastOptions={{ duration: 4000 }} />
//       <div id="recaptcha-container"></div>
//       <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
//         <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
//           Welcome to <br /> CODE A PROGRAM
//         </h1>
//         {showOTP ? (
//           <>
//             <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//               <BsFillShieldLockFill size={30} />
//             </div>
//             <label
//               htmlFor="otp"
//               className="font-bold text-xl text-white text-center"
//             >
//               Enter your OTP
//             </label>
//             <OtpInput
//               value={otp}
//               onChange={setOtp}
//               OTPLength={6}
//               otpType="number"
//               disabled={false}
//               autoFocus
//               className="opt-container "
//             ></OtpInput>
//             <button
//               onClick={onOTPVerify}
//               className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//             >
//               {loading && (
//                 <CgSpinner size={20} className="mt-1 animate-spin" />
//               )}
//               <span>Verify OTP</span>
//             </button>
//           </>
//         ) : (
//           <>
//             <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//               <BsTelephoneFill size={30} />
//             </div>
//             <label
//               htmlFor=""
//               className="font-bold text-xl text-white text-center"
//             >
//               Verify your phone number
//             </label>
//             <PhoneInput country={"in"} value={ph} onChange={setPh} />
//             <button
//               onClick={onSignup}
//               className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//             >
//               {loading && (
//                 <CgSpinner size={20} className="mt-1 animate-spin" />
//               )}
//               <span>Send code via SMS</span>
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PhoneNumberVerification;

//-----------------------------------this is the final code 
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { CgSpinner } from "react-icons/cg";
import { BsTelephoneFill, BsFillShieldLockFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, Toaster } from "react-hot-toast";

const PhoneNumberVerification = ({ handlePhoneVerificationSuccess, setVerifiedPhoneNumber }) => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBZ1cy_B7fmAWHdPA6QIQzjIWGkBvMoxDY",
      authDomain: "otp-project-feb20.firebaseapp.com",
      projectId: "otp-project-feb20",
      storageBucket: "otp-project-feb20.appspot.com",
      messagingSenderId: "765547595784",
      appId: "1:765547595784:web:ef18151f2a3987fdb329bd",
      measurementId: "G-NGGPLSNH9Y"
    };

    const app = initializeApp(firebaseConfig);
    const authInstance = getAuth(app);

    setAuth(authInstance);
  }, []);

  async function onCaptchVerify() {
    try {
      if (!window.recaptchaVerifier && auth) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              onSignup();
            },
            "expired-callback": () => {},
          },
          auth
        );
      }
    } catch (error) {
      console.error("Error verifying captcha:", error);
    }
  }

  async function onSignup() {
    try {
      setLoading(true);
      await onCaptchVerify();

      const appVerifier = window.recaptchaVerifier;
      const formatPh = "+" + ph;

      const confirmationResult = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      window.confirmationResult = confirmationResult;

      setLoading(false);
      setShowOTP(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Error signing in with phone number:", error);
      setLoading(false);
    }
  }

  async function onOTPVerify() {
    try {
      setLoading(true);
      await window.confirmationResult.confirm(otp);
      setLoading(false);
      toast.success("Login successful!");
      const formatPhone = "+" + ph;
      handlePhoneVerificationSuccess(formatPhone); // Pass the verified phone number to the parent component
      setVerifiedPhoneNumber(formatPhone); // Set the verified phone number state in the parent component
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setLoading(false);
    }
  }

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
        <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
          Welcome to <br /> CODE A PROGRAM
        </h1>
        {showOTP ? (
          <>
            <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
              <BsFillShieldLockFill size={30} />
            </div>
            <label
              htmlFor="otp"
              className="font-bold text-xl text-white text-center"
            >
              Enter your OTP
            </label>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container "
            ></OtpInput>
            <button
              onClick={onOTPVerify}
              className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
            >
              {loading && (
                <CgSpinner size={20} className="mt-1 animate-spin" />
              )}
              <span>Verify OTP</span>
            </button>
          </>
        ) : (
          <>
            <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
              <BsTelephoneFill size={30} />
            </div>
            <label
              htmlFor=""
              className="font-bold text-xl text-white text-center"
            >
              Verify your phone number
            </label>
            <PhoneInput country={"in"} value={ph} onChange={setPh} />
            <button
              onClick={onSignup}
              className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
            >
              {loading && (
                <CgSpinner size={20} className="mt-1 animate-spin" />
              )}
              <span>Send code via SMS</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberVerification;
