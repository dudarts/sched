using Microsoft.EntityFrameworkCore;
using Sched.Model;

namespace Sched.Data
{
    public class DataContext : DbContext
    {

        public DbSet<Event> Events { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UsersEvents> UsersEvents { get; set; }
        public DbSet<EventType> EventTypes { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UsersEvents>(entity =>
            {
                entity.HasKey(e => new
                {
                    e.UserId,
                    e.EventId
                });
            });
        }
    }
}