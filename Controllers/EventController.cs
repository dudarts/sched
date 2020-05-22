using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sched.Model;
using Sched.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace Sched.Controllers
{
    [ApiController]
    [Route("api/Event")]
    [Authorize(Roles = "user")]
    public class EventController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Event>>> Get([FromServices] DataContext context)
        {
            var events = await context.Events.Include(x => x.EventType).ToListAsync();
            return events;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<Event>> GetById([FromServices] DataContext context, int id)
        {
            var events = await context.Events.Include(x => x.EventType)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
            return events;
        }

        [HttpGet]
        [Route("EventType/{id:int}")]
        public async Task<ActionResult<List<Event>>> GetByEventType([FromServices] DataContext context, int id)
        {
            var events = await context.Events
                .Include(x => x.EventType)
                .AsNoTracking()
                .Where(x => x.EventTypeId == id)
                .ToListAsync();
            return events;
        }

        [HttpGet]
        [Route("{name}")]
        public async Task<ActionResult<List<Event>>> GetByName([FromServices] DataContext context, string name)
        {
            var events = await context.Events
                .Include(x => x.EventType)
                .AsNoTracking()
                .Where(x => x.Name.Contains(name))
                .ToListAsync();
            return events;
        }
 
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Event>> Post([FromServices] DataContext context, [FromBody]Event model)
        {
            if (ModelState.IsValid)
            {
                context.Events.Add(model);
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