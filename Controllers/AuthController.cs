using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sched.Model;
using Sched.Data;
using Microsoft.AspNetCore.Cors;
using Sched.Auth;
using Microsoft.AspNetCore.Authorization;

namespace Sched.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public async Task<IActionResult> loginAsync([FromServices] DataContext _ctx, [FromServices] TokenService _tokenService, [FromBody] UserAuthViewModel user)
        {
            var cred = await _ctx.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Email == user.Email && x.Password == user.Password);

            if (cred == null) return NotFound(new { message = "Invalid email or password" });

            var token = _tokenService.GenerateToken(cred);

            return StatusCode(200, new { token });

        }
       
    }
}