using System;
using System.ComponentModel.DataAnnotations;

namespace Sched.Model{
    public class UsersEvents{
        public int UserId { get; set; }
        
        public User User { get; set; }

        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}