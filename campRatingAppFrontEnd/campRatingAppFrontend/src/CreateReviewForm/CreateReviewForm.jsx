import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";


const CreateReviewForm = () => {
    const { state } = useLocation(); // Get campgroundId passed from the previous page
    const campgroundId = state?.campgroundId;
    const user = useSelector((state) => state.user.user); // Get user info from the Redux store
    const [reviewContent, setReviewContent] = useState(""); // State for review content
    const [rating, setRating] = useState(1);
    const navigate = useNavigate();

    // Handle content change in the textarea
    const handleReviewChange = (e) => {
        setReviewContent(e.target.value);
    };

    // Handle rating change
    const handleRatingChange = (e) => {
        setRating(Number(e.target.value));
    };

    // Handle the review submission when the button is clicked
    const handleSubmit = async () => {

        if (!reviewContent) {
            message.error("Review content cannot be empty.");
            return;
        }

        const reviewData = {
            campgroundId: campgroundId,
            userId: user?.id, // Assuming you have a user ID in the user slice
            comment: reviewContent,
            rating: rating,
        };
        console.log(reviewData);

        try {
            const response = await fetch("https://localhost:7130/api/review/createReview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            message.success("Review added successfully!");
            navigate(`/campground/${campgroundId}`); // Redirect back to the campground page after review submission
        } catch (error) {
            console.error("Error adding review:", error);
            message.error(error.message || "There was an error submitting your review.");
        }
    };

    return (
        <div>
        <Header></Header>
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Add Review for Campground</h2>
            <div style={{ marginBottom: "15px" }}>
                <label htmlFor="reviewContent">Review</label>
                <Input.TextArea
                    id="reviewContent"
                    value={reviewContent}
                    onChange={handleReviewChange}
                    placeholder="Write your review here"
                    rows={4}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label htmlFor="rating">Rating (1-5)</label>
                <Input
                    id="rating"
                    type="number"
                    value={rating}
                    onChange={handleRatingChange}
                    min={1}
                    max={5}
                    placeholder="Rate between 1 and 5"
                />
            </div>

            <Button type="primary" onClick={handleSubmit} block>
                Submit Review
            </Button>
        </div>
            <Footer></Footer>
        </div>
    );
};

export default CreateReviewForm;
