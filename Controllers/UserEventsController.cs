using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sched.Model;
using Sched.Data;

namespace Sched.Controllers
{
    [ApiController]
    [Route("api/UsersEvents")]
    public class UsersEventsController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<UsersEvents>>> Get([FromServices] DataContext context)
        {
            var usersEvents = await context.UsersEvents
                .Include(x => x.User)
                .Include(x => x.Event)
                .ToListAsync();
            return usersEvents;
        }

        [HttpGet]
        [Route("Event/{eventId=int}/User/{userId=int}")]
        public async Task<ActionResult<UsersEvents>> Get([FromServices] DataContext context, int eventId, int userId)
        {
            var usersEvents = await context.UsersEvents
                .AsNoTracking()
                .Include(x => x.User)
                .Include(x => x.Event).FirstOrDefaultAsync(x => x.UserId == userId && x.EventId == eventId);
            return usersEvents;
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<UsersEvents>> Post([FromServices] DataContext context, [FromBody]UsersEvents model)
        {
            if (ModelState.IsValid)
            {
                context.UsersEvents.Add(model);
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