import React from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { useSelector } from "react-redux"; // Import the useSelector hook to access Redux state
import "./Campground.css";

const { Meta } = Card;

const Campground = ({ campground, handleDelete }) => {
    const navigate = useNavigate(); // Initialize the navigate function
    const user = useSelector((state) => state.user.user); // Access user data from the Redux store
    const role = user?.role; // Get the user role

    const handleCardClick = () => {
        navigate(`/campground/${campground.id}`); // Redirect to the campground details page
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Prevent card click event from firing
        handleDelete(campground.id); // Trigger the delete function
    };

    const handleUpdateClick = (e) => {
        e.stopPropagation(); // Prevent card click event from firing
        navigate("/createCampgroundForm", { state: { campgroundToUpdate: campground } }); // Pass campground data to the update form
    };



    return (
        <div className="campground-container">
            <Card
                hoverable
                cover={<img alt={campground.name} src={campground.imageUrl} />}
                actions={[
                    // Only show delete button if the user is an Admin
                    role === "admin" && (
                        <div>
                            <Button
                                type="primary"
                                onClick={handleDeleteClick} // Use the new delete click handler
                            >
                                Delete
                            </Button>
                            <Button
                                type="primary"
                                onClick={handleUpdateClick} // Use the update click handler
                            >
                                Update
                            </Button>
                        </div>
                    ),

                ]}
                onClick={handleCardClick} // Trigger the redirection when the card is clicked
            >
                <Meta title={campground.name} description={campground.description} />
            </Card>
        </div>
    );
};

export default Campground;
