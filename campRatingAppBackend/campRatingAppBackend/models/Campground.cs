using Microsoft.AspNetCore.Mvc.ViewEngines;

namespace campRatingAppBackend.models
{
    public class Campground
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string? ImageUrl { get; set; }

        // Навигация: Един къмпинг има много ревюта
        public List<Review> Reviews { get; set; } = new();
    }
}
