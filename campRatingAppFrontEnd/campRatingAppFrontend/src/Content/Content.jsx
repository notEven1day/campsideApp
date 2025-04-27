import React, { useState, useEffect } from "react";
import { Pagination, Button, Input } from "antd";  // Import Input for search
import Campground from "./ContentElements/Campground.jsx";
import "./Content.css";
import { useNavigate } from "react-router-dom";

const Content = () => {
    const [campgrounds, setCampgrounds] = useState([]);
    const [filteredCampgrounds, setFilteredCampgrounds] = useState([]); // State to store filtered campgrounds
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [currentPage, setCurrentPage] = useState(1);
    const [campgroundsPerPage] = useState(9); // You can adjust how many campgrounds you want to display per page
    const navigate = useNavigate();

    // Fetch the campgrounds from the API on initial load
    useEffect(() => {
        fetch("https://localhost:7130/api/campground/getAllCampgrounds")
            .then((response) => response.json())
            .then((data) => {
                const campgrounds = data.$values;
                setCampgrounds(campgrounds);
                setFilteredCampgrounds(campgrounds); // Initially show all campgrounds
            })
            .catch((error) => console.error("Error fetching campgrounds:", error));
    }, []);

    // Handle search input changes
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter campgrounds based on the search query
        const filtered = campgrounds.filter((campground) =>
            campground.name.toLowerCase().includes(query.toLowerCase()) // Case insensitive search
        );

        setFilteredCampgrounds(filtered); // Update the filtered campgrounds
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Pagination logic
    const indexOfLastCampground = currentPage * campgroundsPerPage;
    const indexOfFirstCampground = indexOfLastCampground - campgroundsPerPage;
    const currentCampgrounds = filteredCampgrounds.slice(indexOfFirstCampground, indexOfLastCampground);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://localhost:7130/api/campground/deleteCampground/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            setCampgrounds((prevCampgrounds) => prevCampgrounds.filter((campground) => campground.id !== id));
            setFilteredCampgrounds((prevFilteredCampgrounds) =>
                prevFilteredCampgrounds.filter((campground) => campground.id !== id)
            );

            alert("Campground deleted successfully!");
        } catch (error) {
            console.error("Error deleting campground:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleAddCampground = () => {
        navigate("/createCampgroundForm"); // Redirect to the "Create Campground" form page
    };

    return (
        <div>
            <div className="search-bar-container" style={{ marginBottom: "20px" }}>
                <Input
                    placeholder="Search campgrounds by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ width: "300px", marginBottom: "20px" }} // Adjust width as needed
                />
            </div>

            <div className="add-campground-container">
                <Button
                    type="primary"
                    onClick={handleAddCampground}
                    style={{ marginBottom: "20px" }}
                >
                    Add Campground
                </Button>
            </div>

            <div className="campgrounds-list">
                {currentCampgrounds.map((campground) => (
                    <Campground
                        key={campground.id}
                        campground={campground}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>

            <Pagination
                current={currentPage}
                total={filteredCampgrounds.length}
                onChange={handlePageChange}
                pageSize={campgroundsPerPage}
                align="center"
            />
        </div>
    );
};

export default Content;
