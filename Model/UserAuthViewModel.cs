using System;
using System.ComponentModel.DataAnnotations;

namespace Sched.Model{
    public class UserAuthViewModel
    {
        [Required(ErrorMessage = "The field email is required")]
        public string Email { get; set; }
        [Required(ErrorMessage = "The field password is required")]
        public string Password { get; set; }

    }
}