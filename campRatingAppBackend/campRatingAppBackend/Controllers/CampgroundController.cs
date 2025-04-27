using campRatingAppBackend.Dtos;
using campRatingAppBackend.models;
using campRatingAppBackend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace campRatingAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampgroundController : ControllerBase
    {
        private readonly CampgroundService _campgroundService;

        public CampgroundController(CampgroundService campgroundService)
        {
            _campgroundService = campgroundService;
        }

        // GET: api/campground/getAllCampgrounds
        [HttpGet("getAllCampgrounds")]
        public async Task<IActionResult> GetAllCampgrounds()
        {
            try
            {
                var campgrounds = await _campgroundService.GetAllCampgroundsAsync();
                return Ok(campgrounds);
            }
            catch (System.Exception ex)
            {
                // Log the error
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("getCampgroundById/{id}")]
        public async Task<IActionResult> GetCampgroundById(int id)
        {
            var campground = await _campgroundService.GetCampgroundByIdAsync(id);
            if (campground == null)
            {
                return NotFound();
            }

            return Ok(campground);
        }

        [HttpDelete("deleteCampground/{id}")]
        public async Task<IActionResult> DeleteCampground(int id)
        {
            var result = await _campgroundService.DeleteCampgroundAsync(id);

            if (result)
            {
                return Ok(new { message = "Campground deleted successfully." });
            }

            return NotFound(new { message = "Campground not found." });
        }

        [HttpPost("createCampground")]
        public async Task<IActionResult> CreateCampground([FromBody] Campground campground)
        {
            if (campground == null)
            {
                return BadRequest("Campground data is required.");
            }

            try
            {
                var createdCampground = await _campgroundService.CreateCampgroundAsync(campground);
                return CreatedAtAction(nameof(GetCampgroundById), new { id = createdCampground.Id }, createdCampground);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("updateCampground/{id}")]
        public async Task<IActionResult> UpdateCampground(int id, CampgroundDto campgroundDTO)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid campground ID.");
            }

            if (campgroundDTO == null)
            {
                return BadRequest("Campground data is missing.");
            }

            var exists = await _campgroundService.CampgroundExistsAsync(id);
            if (!exists)
            {
                return NotFound("Campground not found.");
            }

            var success = await _campgroundService.UpdateCampgroundAsync(id, campgroundDTO);
            if (!success)
            {
                return NotFound("Campground not found.");
            }

            return NoContent(); // Return 204 No Content on successful update
        }


    }
}
