using System;
using System.ComponentModel.DataAnnotations;

namespace Sched.Model{
    public class User{
        [Key]
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Digite o nome do Usuário")]
        [DataType(DataType.Text)]
        [Display(Name = "Nome")]
        public string Name { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Digite o e-mail")]
        [Display(Name = "E-mail")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Digite a senha")]
        [DataType(DataType.Password)]
        [Display(Name = "Senha")]
        public string Password { get; set; }

        
        [Required(ErrorMessage = "Escolha o Gênero")]
        [Display(Name = "Gênero")]
        public string Gender { get; set; }

        [Required(ErrorMessage = "Escolha a Data do evento")]
        [DataType(DataType.Date)]
        [Display(Name = "Data de Nascimento")]
        public DateTime BirthDate { get; set; }
    }
}