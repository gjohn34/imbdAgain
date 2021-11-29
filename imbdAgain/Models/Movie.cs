﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace imbdAgain.Models
{
    public class Movie : ISearchable
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public int DirectorId { get; set; }
        public virtual Director Director { get; set; }
        public virtual List<Review> Reviews {get; set;}
    }
}
