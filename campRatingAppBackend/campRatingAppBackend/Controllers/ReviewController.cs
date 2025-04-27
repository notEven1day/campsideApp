using campRatingAppBackend.Dtos;
using campRatingAppBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace campRatingAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ReviewService _reviewService;

        public ReviewController(ReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet("getReviewsForCampground/{id}")]
        public async Task<IActionResult> GetReviewsForCampground(int id)
        {
            var reviews = await _reviewService.GetReviewsForCampgroundAsync(id);
            if (reviews == null || reviews.Count == 0)
            {
                return NotFound();
            }

            return Ok(reviews);
        }

        // DELETE: api/review/deleteReview/{id}
        [HttpDelete("deleteReview/{id}")]
        public IActionResult DeleteReview(int id)
        {
            var result = _reviewService.DeleteReview(id);

            if (!result)
                return NotFound(new { message = "Review not found" });

            return Ok(new { message = "Review deleted successfully" });
        }

        [HttpPost("createReview")]
        public async Task<IActionResult> CreateReview([FromBody] ReviewDto reviewDto)
        {
            if (reviewDto == null)
            {
                return BadRequest("Invalid review data.");
            }

            try
            {
                // Check if the user has already reviewed the campground
                var existingReview = await _reviewService.GetReviewByUserAndCampgroundAsync(reviewDto.UserId, reviewDto.CampgroundId);

                if (existingReview != null)
                {
                    // If the user has already reviewed this campground, return an error or update it
                    throw new InvalidOperationException("You have already submitted a review for this campground.");
                    // Or if you want to update the review, you can do:
                    // var updatedReview = await _reviewService.UpdateReviewAsync(existingReview.Id, reviewDto);
                    // return Ok(updatedReview);
                }

                // Create the new review
                var newReview = await _reviewService.CreateReviewAsync(reviewDto);

                // Return the created review
                return CreatedAtAction(nameof(CreateReview), new { id = newReview.Id }, newReview);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("getReviewsByUser/{userId}")]
        public async Task<IActionResult> GetReviewsByUser(int userId)
        {
            try
            {
                var reviews = await _reviewService.GetReviewsByUserAsync(userId);
                if (reviews == null || !reviews.Any())
                {
                    return NotFound("No reviews found for this user.");
                }

                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
