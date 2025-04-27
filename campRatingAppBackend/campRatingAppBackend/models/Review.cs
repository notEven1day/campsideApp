namespace campRatingAppBackend.models
{
    public class Review
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!; // Ревюто принадлежи на един User

        public int CampgroundId { get; set; }
        public Campground Campground { get; set; } = null!; // Ревюто е за един Campground

        public int? Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
