using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace imbdAgain.Models
{
    public class Review
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int MovieId { get; set; }
        [Required]
        [Range(0,10)]
        public int Score { get; set; }
        [Required]

        public string Content { get; set; }

        public Movie Movie { get; set; }
    }
}
