using Microsoft.AspNetCore.Mvc.ViewEngines;

namespace campRatingAppBackend.models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;

        // Навигация: Един потребител има много ревюта
        public List<Review> Reviews { get; set; } = new();
    }
}
