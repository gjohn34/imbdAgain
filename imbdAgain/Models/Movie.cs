using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace imbdAgain.Models
{
    public class Movie
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public int DirectorId { get; set; }
        public virtual Director Director { get; set; }
        public virtual List<Review> Reviews {get; set;}
        //[JsonIgnore]
        public virtual List<Genre> Genres { get; set; }
        //[JsonIgnore]
        public virtual List<MovieGenre> MovieGenres { get; set; }

        public static bool HasGenre() 
        {
            //foreach (Genre genre in collectionOne)
            //{
            //    if (collectionTwo.Contains(genre))
            //    {
            //        return true;
            //    }
            //}
            return true;
        }
    }
}
