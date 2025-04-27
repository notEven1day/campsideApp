using campRatingAppBackend.Dtos;
using campRatingAppBackend.models;
using campRatingBackend;
using Microsoft.EntityFrameworkCore;

namespace campRatingAppBackend.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<User> LogInAsync(UserLoginDto userLoginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == userLoginDto.Username);  // Find user by username

            if (user == null || user.Password != userLoginDto.Password)  // Plain text password check
            {
                return null;  // Invalid credentials
            }

            return user;  // Return authenticated user
        }

        public async Task<User> SignUpAsync(UserSignUpDto userSignUpDto)
        {
            // Check if the username is already taken
            var existingUser = await _context.Users
                .Where(u => u.Username == userSignUpDto.Username)
                .FirstOrDefaultAsync();

            if (existingUser != null)
            {
                throw new Exception("Username is already taken.");
            }

            // Create new user entity
            var newUser = new User
            {
                Username = userSignUpDto.Username,
                Password = userSignUpDto.Password, // Store password as plain text
                FirstName = userSignUpDto.FirstName,
                LastName = userSignUpDto.LastName,
                Role = "user" // Default role is "user"
            };

            // Save the new user to the database
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return newUser; // Return the newly created user
        }
    }
}
