using System;
using System.ComponentModel.DataAnnotations;

namespace Sched.Model{
    public class EventType{
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Digite o tipo de Evento")]
        [DataType(DataType.Text)]
        public string Description { get; set; }
    }
}