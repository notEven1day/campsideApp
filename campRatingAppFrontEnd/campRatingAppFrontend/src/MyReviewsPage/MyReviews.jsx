import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import { List, Card, Typography, Button, message } from "antd"; // Ant Design components for displaying the reviews
import { useNavigate } from "react-router-dom"; // For navigation if needed
import "./MyReviews.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
const { Title, Paragraph } = Typography;

const MyReviews = () => {
    const [reviews, setReviews] = useState([]); // To store the reviews of the user
    const user = useSelector((state) => state.user.user); // Get the user from Redux state
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.id) {
            // Fetch reviews for the logged-in user
            fetch(`https://localhost:7130/api/review/getReviewsByUser/${user.id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setReviews(data.$values); // Set the reviews state
                })
                .catch((error) => {
                    console.error("Error fetching reviews:", error);
                    message.error("There was an error fetching your reviews.");
                });
        } else {
            message.warning("You must be logged in to see your reviews.");
        }
    }, [user]); // Run this effect when the user data changes

    // Render the reviews
    return (
        <div>
            <Header></Header>
        <div style={{ padding: "20px" }}>
            <Title level={2}>My Reviews</Title>
            {reviews.length === 0 ? (
                <Paragraph>No reviews found.</Paragraph>
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={reviews}
                    renderItem={(review) => (
                        <List.Item>
                            <Card style={{ width: "100%" }}>
                                <Title level={4}>{review.campgroundName}</Title>
                                <Paragraph>{review.comment}</Paragraph>
                                <Paragraph>Rating: {review.rating} / 5</Paragraph>
                                <Button
                                    type="link"
                                    onClick={() => navigate(`/campground/${review.campgroundId}`)}
                                >
                                    View Campground
                                </Button>
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </div>
            <Footer></Footer>
        </div>
    );
};

export default MyReviews;
