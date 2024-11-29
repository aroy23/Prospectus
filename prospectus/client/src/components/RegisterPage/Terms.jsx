import React, { useState } from "react";


const TermsModal = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div>
      {/* Terms and conditions */}
      <label className=" text-sm font-medium text-gray-900 dark:text-black">
        I agree with the{" "}
        <a
          href="#"
          onClick={openModal} // Opens terms and conditions modal when clicked
          className="text-cyan-600 hover:underline dark:text-cyan-500"
        >
          terms and conditions
        </a>
      </label>


      {/* Modal structure */}
      {isModalOpen && (
        <div
          id="terms-modal"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
        >
          <div className="bg-white p-6 rounded-lg max-w-lg max-h-[70vh] overflow-y-auto">


            <p>  {/* Terms and Conditions */}
              <h2 className="text-2xl"> Terms and Conditions 🤝</h2>
              <br />
              1. Use of Our Services:
              You agree to use our Services in compliance with all applicable laws and regulations. You must be at least 18 years old or the legal age in your jurisdiction to use our Services. You may not use our Services for any unlawful or prohibited purpose.
              <br />
              <br />
              2. Account Registration:
              In order to access certain features of our Services, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information as necessary.
              <br />
              <br />
              3. User Conduct:
              You are responsible for your conduct while using our Services. You agree not to engage in activities that:
              <br />
              - Violate the rights of others
              <br />
              - Interfere with or disrupt our Services
              <br />
              - Distribute malicious software or engage in hacking activities
              <br />
              - Infringe on any intellectual property rights
              <br />
              <br />
              4. Privacy:
              Your use of our Services is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.
              <br />
              <br />
              5. Limitation of Liability:
              We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of our Services. We do not guarantee that our Services will be uninterrupted or error-free.
              <br />
              <br />
              6. Termination:
              We reserve the right to suspend or terminate your access to our Services at any time, with or without notice, if you violate these Terms.
              <br />
              <br />
              7. Modifications:
              We may update these Terms from time to time. We will notify you of any significant changes by posting the new Terms on this page. By continuing to use our Services after such changes, you agree to the updated Terms.
              <br />
              <br />
              8. Contact Us:
              If you have any questions or concerns about these Terms, please contact us at <span className="underline"> prospectusucla@gmail.com </span>.




            </p>
            <button
              id="close-modal"
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default TermsModal;



