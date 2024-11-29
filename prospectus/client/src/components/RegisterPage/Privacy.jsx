import React, { useState } from "react";


const PrivacyModal = () => {

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


            <a onClick={openModal} className="btn btn-ghost text-xl">Privacy Policy</a>


            {/* Modal structure */}
            {isModalOpen && (
                <div
                    id="terms-modal"
                    className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 "
                >
                    <div className="font-semibold bg-white p-6 rounded-lg max-w-lg max-h-[70vh] overflow-y-auto">


                        <p>  {/* Terms and Conditions */}
                            <h2 className="text-2xl"> Privacy Policy 🔒</h2>
                            <br />
                            1. Information We Collect:
                            We may collect the following types of information:
                            <br />
                            <br />
                            Personal Information: Such as your name, email address, and other details you provide during registration or while using the app.
                            <br />
                            <br />
                            Usage Data: Information about your interactions with the app, such as features used, time spent, and other analytics.
                            <br />
                            <br />
                            Device Information: Includes data like your device type, operating system, IP address, and app version.
                            <br />
                            <br />


                            <hr />
                            <br />
                            2. How We Use Your Information:
                            We use the information we collect for purposes including:
                            <br />
                            - To provide, operate, and maintain the app.
                            <br />
                            - To improve user experience and app functionality.
                            <br />
                            - To send you important updates, notifications, or promotional materials (if opted in).
                            <br />
                            - To analyze usage trends and monitor app performance.
                            <br />


                            <br />


                            <hr />
                            <br />
                            3. Sharing Your Information:
                            We do not sell or share your personal information with third parties, except in the following circumstances:
                            With service providers who assist us in app operations (e.g., hosting, analytics).
                            <br />
                            - To comply with legal obligations or enforce our policies.
                            <br />
                            - To protect the rights, safety, and property of our users or others.
                            <br />
                            <br />


                            <hr />
                            <br />
                            4. Data Security:
                            We implement reasonable security measures to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.
                            <br />
                            <br />


                            <hr />
                            <br />
                            5. Your Privacy Choices:
                            Access and Update: You may access or update your personal information in the app settings.
                            <br />
                            <br />
                            Opt-Out: You may opt out of receiving promotional communications by following the instructions in those messages.
                            <br />
                            <br />
                            Data Deletion: You may request the deletion of your account and associated data by contacting us at <span className="underline">
                            prospectusucla@gmail.com
                            </span>.
                            <br />
                            <br />


                            <hr />
                            <br />
                            6. Children’s Privacy:
                            Our app is not intended for children under the age of 13, and we do not knowingly collect data from such individuals. If we discover that we have collected data from a child under 13, we will promptly delete it.
                            <br />
                            <br />


                            <hr />
                            <br />
                            7. Changes to This Privacy Policy:
                            We may update this Privacy Policy from time to time. Changes will be posted within the app, and your continued use of the app constitutes your acceptance of the revised policy.
                            <br />
                            <br />


                            <hr />
                            <br />
                            8. Contact Us:
                            If you have any questions or concerns about this Privacy Policy, please contact us at:
                            <br /> <span className="underline">
                            prospectusucla@gmail.com
                            </span>

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


export default PrivacyModal;
