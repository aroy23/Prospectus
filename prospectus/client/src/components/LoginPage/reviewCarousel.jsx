
import React, { useEffect, useState } from "react";


const Carousel = () => {
    let test1 =
        "Prospectus transformed my job application process! The personalized feedback was spot-on, and the clear, actionable suggestions helped me craft a resume that stood out to employers. Thanks to Prospectus, I landed my dream internship this summer. I can't recommend it enough!";


    let test2 =
        "The prospectus for the resume review app is incredibly well-conceived, demonstrating a deep understanding of the challenges faced by job seekers in crafting competitive resumes. The app’s concept addresses a critical need by providing targeted, actionable feedback that helps users refine their resumes to align with industry standards."


    let test3 =
        "Prospectus has completely transformed the way I approach job applications. The feedback I received was incredibly detailed, and the actionable advice helped me fine-tune my resume in a way that truly stood out to employers. Thanks to Prospectus, I landed my dream internship this summer, and I highly recommend it to anyone looking to improve their job prospects!"


    let test4 =
        "As someone who's been through the job search process many times, I can confidently say that Prospectus is a game-changer. It’s not just another resume review tool—it provides tailored feedback that highlights your strengths while suggesting improvements in a way that’s both constructive and practical. I immediately saw an increase in responses from employers. I’m so grateful for this service!"


    let test5 =
        "Prospectus is a must-have tool for anyone serious about refining their resume. I especially appreciated the suggestions on formatting and phrasing that made my resume clearer and more impactful. As a result, I’m now receiving more job interview invitations than ever before. Whether you're a student just starting your career or a professional looking to make a career change, Prospectus will definitely give you the edge you need."


    let testDict = {[test1]: " - Jason Ni", [test2]: " - William Shih", [test3]: " - Angela Quan", [test4]: " - Larry Ye", [test5]: " - Arnav Roy"};
    const slides = [test1, test2, test3, test4, test5];
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        if (slides.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [slides]);


    return (
        <div
            style={{
                overflow: "hidden",
                position: "relative",
                width: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    transition: "transform 0.5s ease-in-out",
                    transform: `translateX(-${currentIndex * 100}%)`,  // Moving slides by percentage
                }}


       
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        style={{
                            flex: "0 0 100%",
                        }}
                    >
                        {slide}
                        <br/>
                        <div className = "font-bold">
                        {testDict[slide]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Carousel;
