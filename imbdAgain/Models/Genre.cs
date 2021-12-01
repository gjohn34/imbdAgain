using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace imbdAgain.Models
{
    public class Genre
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public virtual List<Movie> Movies { get; set; }
        [JsonIgnore]
        public virtual List<MovieGenre> MovieGenres { get; set; }
        //[Required]
        //public string RecordType { get; set; }
    }
}