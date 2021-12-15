using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace imbdAgain.Models
{
    //[Index(nameof(Username), IsUnique = true)]
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        //public User(string username, string password)
        //{
        //    Username = username;
        //    Password = password;
        //}
        //public bool IsValid()
        //{
        //    if (Username == null)
        //    {
        //        return false;
        //    }
        //    if (Password == null)
        //    {
        //        return false;
        //    }
        //    return true;
        //}
    }
}
