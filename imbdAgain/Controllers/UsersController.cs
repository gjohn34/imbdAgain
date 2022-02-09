using imbdAgain.Data;
using imbdAgain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace imbdAgain.Controllers
{
    [Authorize]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IJWTAuth _jwtAuth;
        private readonly ImbdAgainContext _context;

        public UsersController(IJWTAuth jwtAuth, ImbdAgainContext context)
        {
            _jwtAuth = jwtAuth;
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> AllUsers()
        {
            return await _context.Users
                .ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> SingleUser(int id)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(User user) 
        {
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            } catch
            {
                return BadRequest();
            }
            var token = _jwtAuth.Authentication(user.Username, user.Password, _context.Users);
            if (token == null)
                return Unauthorized();

            return Created("/register", new { token = token, user =  new { id = user.Id, username = user.Username } });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] User user)
        {
            var token = _jwtAuth.Authentication(user.Username, user.Password, _context.Users);


            if (token == null)
                return Unauthorized();
                //return Unauthorized(new {Message =  "Invalid Credentials"});

            return Ok(new { token = token, user = new { id = user.Id, username = user.Username } });
        }

        [HttpGet("authenticate")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> Authenticate([FromHeader]string token)
        {
            try
            {
                JwtPayload payload = _jwtAuth.FindUser(token);
                var id = payload.GetValueOrDefault("id").ToString();
                User user = await _context.Users.FirstOrDefaultAsync(x => x.Id.ToString() == id);
                //_context.Users.FirstOrDefaultAsync(x => x.Id == payload.Id)
                return Ok(user);
            } catch
            {
                return Forbid();
            }
        }
    }
}
