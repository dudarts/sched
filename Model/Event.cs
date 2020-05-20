using System;
using System.ComponentModel.DataAnnotations;

namespace Sched.Model{
    public class Event{
        [Key]
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Digite o nome do Evento")]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Digite a descrição do Evento")]
        [DataType(DataType.Text)]
        public string Description { get; set; }

        [Required(ErrorMessage = "Escolha a Data do evento")]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        [Required(ErrorMessage = "Digite a descrição do Evento")]
        [DataType(DataType.Text)]
        public string Local { get; set; }

        [Required(ErrorMessage = "Tipo do Evento é obrigatório")]
        [Range(1, int.MaxValue, ErrorMessage = "Tipo de Evento Inválida")]
        public int EventTypeId { get; set; }

        public EventType EventType { get; set; }
    }
}