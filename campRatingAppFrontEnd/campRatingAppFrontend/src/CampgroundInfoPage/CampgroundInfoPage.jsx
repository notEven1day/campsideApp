// CampgroundInfoPage.jsx
import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { Button, Space } from "antd"; // Import Ant Design Button and Space for styling
import './CampgroundInfoPage.css';
import {useSelector} from "react-redux";

const CampgroundInfoPage = () => {
    const { id } = useParams(); // Get the campground ID from the URL
    const [campground, setCampground] = useState(null); // State to store campground data
    const [reviews, setReviews] = useState([]); // State to store reviews
    const [loading, setLoading] = useState(true); // Loading state
    const user = useSelector((state) => state.user.user); // Access user data from the Redux store
    const role = user?.role;
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch campground details using the id
        fetch(`https://localhost:7130/api/campground/getCampgroundById/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCampground(data); // Set the campground data
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch((error) => {
                console.error("Error fetching campground details:", error);
                setLoading(false);
            });
    }, [id]); // This effect will run when the id changes

    useEffect(() => {
        // Fetch reviews for the specific campground
        fetch(`https://localhost:7130/api/review/getReviewsForCampground/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.$values); // Log the fetched data
                setReviews(data.$values || []); // Update state with the reviews data
            })
            .catch((error) => console.error("Error fetching reviews:", error));
    }, [id]); // This effect will run when the id changes

    const handleDeleteReview = (reviewId) => {
        // Call API to delete the review
        fetch(`https://localhost:7130/api/review/deleteReview/${reviewId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => {
                setReviews(reviews.filter((review) => review.id !== reviewId)); // Remove review from state
            })
            .catch((error) => console.error("Error deleting review:", error));
    };

    const handleAddReviewClick = (e) => {
        e.stopPropagation(); // Prevent card click event from firing
        navigate(`/createReviewForm`, { state: { campgroundId: campground.id } }); // Redirect to review form with campground ID
    };

    if (loading) {
        return <div>Loading campground details...</div>;
    }

    return (
        <div>
            <Header></Header>
            <Button
                key="addReview"
                type="primary"
                onClick={handleAddReviewClick}
            >
                Add Review
            </Button>
            <div className="campground-info-page">
                {campground ? (
                    <div>
                        <h1>{campground.name}</h1>
                        <p><strong>Latitude:</strong> {campground.latitude}</p>
                        <p><strong>Longitude:</strong> {campground.longitude}</p>
                        <img
                            alt={campground.name}
                            src={campground.imageUrl}
                            style={{ width: "300px", height: "auto" }} // Optionally adjust size
                        />
                        <p>{campground.description}</p>

                        <section className="reviews-section">
                            <h2>Reviews</h2>

                            {reviews.length > 0 ? (
                                <div>
                                    {reviews.map((review) => (
                                        <div key={review.id} className="review">
                                            <h3>{review.user.username}</h3>
                                            <p>{review.comment}</p>
                                            <p>Rating: {review.rating}</p>
                                            <p>Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</p>

                                            {/* Show delete button only if the user is an Admin */}
                                            {role === "admin" && (
                                                <Space>
                                                    <Button
                                                        type="primary"
                                                        danger
                                                        onClick={() => handleDeleteReview(review.id)}
                                                    >
                                                        Delete Review
                                                    </Button>
                                                </Space>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No reviews available for this campground.</p>
                            )}
                        </section>
                    </div>
                ) : (
                    <p>Campground not found.</p>
                )}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default CampgroundInfoPage;
