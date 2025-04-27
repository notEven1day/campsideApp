using campRatingAppBackend.Dtos;
using campRatingAppBackend.models;
using campRatingBackend;
using Microsoft.EntityFrameworkCore;

namespace campRatingAppBackend.Services
{
    public class CampgroundService
    {

        private readonly ApplicationDbContext _context;

        public CampgroundService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Campground>> GetAllCampgroundsAsync()
        {
            // Retrieve all campgrounds from the database
            return await _context.Campgrounds.ToListAsync();
        }

        public async Task<Campground> GetCampgroundByIdAsync(int id)
        {
            var campground = await _context.Campgrounds
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();

            return campground;
        }

        public async Task<bool> DeleteCampgroundAsync(int id)
        {
            var campground = await _context.Campgrounds.FindAsync(id);
            if (campground == null)
            {
                return false;
            }

            _context.Campgrounds.Remove(campground);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Campground> CreateCampgroundAsync(Campground campground)
        {
            if (campground == null)
            {
                throw new ArgumentNullException(nameof(campground));
            }

            _context.Campgrounds.Add(campground);
            await _context.SaveChangesAsync();
            return campground;
        }

        public async Task<bool> UpdateCampgroundAsync(int id, CampgroundDto campgroundDTO)
        {
            var existingCampground = await _context.Campgrounds.FindAsync(id);
            if (existingCampground == null)
            {
                return false; // Campground not found
            }

            existingCampground.Name = campgroundDTO.Name;
            existingCampground.Description = campgroundDTO.Description;
            existingCampground.Latitude = campgroundDTO.Latitude;
            existingCampground.Longitude = campgroundDTO.Longitude;
            existingCampground.ImageUrl = campgroundDTO.ImageUrl;

            await _context.SaveChangesAsync();
            return true;
        }

        // Check if Campground exists
        public async Task<bool> CampgroundExistsAsync(int id)
        {
            return await _context.Campgrounds.AnyAsync(c => c.Id == id);
        }
    }
}
