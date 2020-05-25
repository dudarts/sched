using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sched.Model;
using Sched.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System;

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
        [Route("eventTypeId/{eventTypeId:int}/userId/{userId:int}")]
        public async Task<ActionResult<dynamic>> GetByEventTypeAndUserLogin([FromServices] DataContext context, 
        int userId, int eventTypeId)
        {
            var events = await (from e in context.Events.Where(p => p.EventTypeId == eventTypeId)
                                from u in context.UsersEvents
                                .Where(p => e.Id == p.EventId)
                                 .Where(p => p.UserId == userId).DefaultIfEmpty()

                                select new
                                {
                                    e.Id,
                                    e.Name,
                                    e.Description,
                                    e.Date,
                                    e.Local,
                                    e.EventTypeId,
                                    e.EventType,
                                    u.UserId
                                }).ToListAsync();
            return events;
        }

        [HttpGet]
        [Route("{ano:int}/{mes:int}/{dia:int}/{typeId:int}")]
        public async Task<ActionResult<Event>> GetByDateAndType([FromServices] DataContext context, int ano, int mes, int dia, int typeId)
        {
            var events = await context.Events.Include(x => x.EventType)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Date.Day == dia && x.Date.Month == mes && x.Date.Year == ano && x.EventTypeId == typeId);
            return events;
        }

        [HttpGet]
        [Route("new/{op}")]
        public async Task<ActionResult<List<Event>>> GetByDateNow([FromServices] DataContext context, int op)
        {
            if (op == 0){
                
                var events = await context.Events.Include(x => x.EventType)
                .AsNoTracking()
                .Where(x => x.Date.Date == DateTime.Now.Date &&
                x.Date.Month == DateTime.Now.Month &&
                x.Date.Year == DateTime.Now.Year )
                .ToListAsync();
                return events;

            } else {

                //string dateString = ano + "-" + mes + "-" + dia;
                // var events = await context.Events.Include(x => x.EventType)
                // .AsNoTracking()
                // .Where(x => x.Date > DateTime.Parse(dateString))
                // .ToListAsync();
                // return events;
                var events = await context.Events.Include(x => x.EventType)
                .AsNoTracking()
                .Where(x => x.Date > DateTime.Now)
                .ToListAsync();
                return events;

            }
            
        }

        // [HttpGet]
        // [Route("{name}")]
        // public async Task<ActionResult<List<Event>>> GetByName([FromServices] DataContext context, string name)
        // {
        //     var events = await context.Events
        //         .Include(x => x.EventType)
        //         .AsNoTracking()
        //         .Where(x => x.Name.Contains(name))
        //         .ToListAsync();
        //     return events;
        // }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Event>> Post([FromServices] DataContext context, [FromBody] Event model)
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

        [HttpPut]
        [Route("")]
        public async Task<ActionResult<Event>> Put([FromServices] DataContext context, [FromBody] Event model)
        {
            if (ModelState.IsValid)
            {
                //model.Password = model.Password.GetHashCode().ToString();

                context.Events.Update(model);
                await context.SaveChangesAsync();
                return model;
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult<Event>> Delete([FromServices] DataContext context, int id)
        {
            if (ModelState.IsValid)
            {
                var events = await context.Events
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
                context.Events.Remove(events);
                await context.SaveChangesAsync();
                return events;
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}