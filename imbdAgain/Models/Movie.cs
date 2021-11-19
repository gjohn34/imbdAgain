using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace imbdAgain.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int DirectorId { get; set; }
        public virtual Director Director { get; set; }
    }
}
