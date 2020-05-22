using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sched.Model;
using Sched.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;

namespace Sched.Controllers
{
    [ApiController]
    [Route("api/Users")]
    [Authorize(Roles = "user")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<User>>> Get([FromServices] DataContext context)
        {
            var users = await context.Users.ToListAsync();
            return users;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<User>> GetById([FromServices] DataContext context, int id)
        {
            var users = await context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
            return users;
        }


        [HttpPost]
        [Route("")]
        public async Task<ActionResult<User>> Post([FromServices] DataContext context, [FromBody] User model)
        {
            if (ModelState.IsValid)
            {               
                //model.Password = model.Password.GetHashCode().ToString();
                model.Password = Cripto.md5(model.Password);
                context.Users.Add(model);
                await context.SaveChangesAsync();
                return model;
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut]
        [Route("")]
        public async Task<ActionResult<User>> Put([FromServices] DataContext context, [FromBody] User model)
        {
            if (ModelState.IsValid)
            {               
                //model.Password = model.Password.GetHashCode().ToString();
                model.Password = Cripto.md5(model.Password);
                context.Users.Update(model);
                await context.SaveChangesAsync();
                return model;
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}