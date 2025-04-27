using campRatingAppBackend.Dtos;
using campRatingAppBackend.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace campRatingAppBackend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }


        // Log In Endpoint
        [HttpPost("log-in")]
        public async Task<IActionResult> LogIn([FromBody] UserLoginDto userLoginDto)
        {
            try
            {
                var user = await _userService.LogInAsync(userLoginDto);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }


        [HttpPost("sign-up")]
        public async Task<IActionResult> SignUp([FromBody] UserSignUpDto userSignUpDto)
        {
            try
            {
                var user = await _userService.SignUpAsync(userSignUpDto);
                return Ok(user); // Return user object if registration is successful
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }

}
