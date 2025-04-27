import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CreateCampgroundForm.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const CreateCampgroundForm = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the state passed through navigate
    const [campground, setCampground] = useState({
        name: "",
        description: "",
        latitude: "",
        longitude: "",
        imageUrl: "",
    });

    const campgroundToUpdate = location.state?.campgroundToUpdate; // Get campground data from navigation state

    // If campgroundToUpdate exists, populate the form with its data
    useEffect(() => {
        if (campgroundToUpdate) {
            setCampground({
                name: campgroundToUpdate.name,
                description: campgroundToUpdate.description,
                latitude: campgroundToUpdate.latitude,
                longitude: campgroundToUpdate.longitude,
                imageUrl: campgroundToUpdate.imageUrl,
            });
        }
    }, [campgroundToUpdate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampground((prevCampground) => ({
            ...prevCampground,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = campgroundToUpdate ? "PUT" : "POST"; // Determine the HTTP method
        const url = campgroundToUpdate
            ? `https://localhost:7130/api/campground/updateCampground/${campgroundToUpdate.id}` // Update endpoint
            : "https://localhost:7130/api/campground/createCampground"; // Create endpoint

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(campground), // Send form data
            });

            if (!response.ok) {
                throw new Error("Failed to submit campground.");
            }

            alert(`Campground ${campgroundToUpdate ? "updated" : "created"} successfully!`);
            navigate("/home"); // Redirect to campground list or any other page
        } catch (error) {
            console.error("Error submitting campground:", error);
            alert("There was an error submitting the campground.");
        }
    };

    return (
        <div>
            <Header></Header>
        <div>
            <h2>{campgroundToUpdate ? "Update Campground" : "Create Campground"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Campground Name"
                    value={campground.name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={campground.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="latitude"
                    placeholder="Latitude"
                    value={campground.latitude}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="longitude"
                    placeholder="Longitude"
                    value={campground.longitude}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={campground.imageUrl}
                    onChange={handleChange}
                />
                <button type="submit">
                    {campgroundToUpdate ? "Update Campground" : "Create Campground"}
                </button>
            </form>
        </div>
            <Footer></Footer>
        </div>
    );
};

export default CreateCampgroundForm;
