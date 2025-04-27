namespace campRatingAppBackend.Dtos
{
    public class ReviewDto
    {
        public int CampgroundId { get; set; }  // The campground being reviewed
        public int UserId { get; set; }  // The user submitting the review
        public int? Rating { get; set; }  // Optional rating (1-5)
        public string? Comment { get; set; }  // Optional comment for the review
    }
}
