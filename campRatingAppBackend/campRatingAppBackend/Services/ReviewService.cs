using campRatingAppBackend.Dtos;
using campRatingAppBackend.models;
using campRatingBackend;
using Microsoft.EntityFrameworkCore;

namespace campRatingAppBackend.Services
{
    public class ReviewService
    {
        private readonly ApplicationDbContext _context;

        public ReviewService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Review>> GetReviewsForCampgroundAsync(int campgroundId)
        {
            var reviews = await _context.Reviews
                .Where(r => r.CampgroundId == campgroundId)
                .Include(r => r.User) // Optional: Include user details in the reviews
                .ToListAsync();

            return reviews;
        }

        public bool DeleteReview(int reviewId)
        {
            var review = _context.Reviews.FirstOrDefault(r => r.Id == reviewId);

            if (review == null) return false;

            _context.Reviews.Remove(review);
            _context.SaveChanges();

            return true;
        }

        public async Task<Review> CreateReviewAsync(ReviewDto reviewDto)
        {
            var review = new Review
            {
                CampgroundId = reviewDto.CampgroundId,
                UserId = reviewDto.UserId,
                Rating = reviewDto.Rating,
                Comment = reviewDto.Comment,
                CreatedAt = DateTime.UtcNow,  
                UpdatedAt = DateTime.UtcNow   
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();  

            return review;
        }

        public async Task<Review> GetReviewByUserAndCampgroundAsync(int userId, int campgroundId)
        {
            return await _context.Reviews
                .FirstOrDefaultAsync(r => r.UserId == userId && r.CampgroundId == campgroundId);
        }

        public async Task<List<Review>> GetReviewsByUserAsync(int userId)
        {
            var reviews = await _context.Reviews
                .Where(r => r.UserId == userId)
                .Include(r => r.Campground) // Include the campground details
                .ToListAsync();

            return reviews;
        }

    }
}
