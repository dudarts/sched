using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sched.Model;
using Sched.Data;

namespace Sched.Controllers
{
    [ApiController]
    [Route("api/EventType")]
    public class EventTypeController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<EventType>>> Get([FromServices] DataContext context)
        {
            var eventsTypes = await context.EventTypes.ToListAsync();
            return eventsTypes;
        }

        [HttpGet]
        [Route("{id=int}")]
        public async Task<ActionResult<EventType>> GetById([FromServices] DataContext context, int id)
        {
            var eventsTypes = await context.EventTypes
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);
            return eventsTypes;
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<EventType>> Post([FromServices] DataContext context, [FromBody]EventType model)
        {
            if (ModelState.IsValid)
            {
                context.EventTypes.Add(model);
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