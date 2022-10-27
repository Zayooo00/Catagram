using Microsoft.AspNetCore.Mvc;
using catgramAPI.Dtos;
using catgramAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace catgramAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private IConfiguration _configuration;
        private IUserService _userService;

        public UserController(
            IUserService userService,
            IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("auth/login")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = _userService.Authenticate(userDto.Username, userDto.Password);
            if(user == null)
                return BadRequest("Wrong username or password");

            var tokenHandler = new JwtSecurityTokenHandler();

            var appSettingsSection = _configuration.GetSection("appSettings");
            var appSettings = appSettingsSection.Get<AppSettings>();
            Console.WriteLine(_configuration.GetSection("appSettings").Exists());
            Console.WriteLine(appSettings.Secret);
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("auth/register")]
        public IActionResult Register([FromBody]UserDto userDto)
        {
            var user = new User
            {
                Username = userDto.Username,
                Email = userDto.Email
            };

            try
            {
                _userService.Create(user, userDto.Password);
                return Ok();
            } catch (Exception ex)
            {
                return BadRequest("Username is taken");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetId(int id)
        {
            var user = _userService.GetId(id);
            var userDto = new UserDto
            {
                Username = user.Username,
                Id = user.Id
            };
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UserDto userDto)
        {
            var user = new User
            {
                Id = userDto.Id,
                Username = userDto.Username,
                Email = userDto.Email
            };

            try
            {
                _userService.Update(user, userDto.Password);
                return Ok();
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
    
}
