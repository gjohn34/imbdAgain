using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using imbdAgain.Models;

namespace imbdAgain.Data
{
    public class ImbdAgainContext : DbContext
    {
        public ImbdAgainContext (DbContextOptions<ImbdAgainContext> options)
            : base(options)
        {
        }

        public DbSet<Director> Directors { get; set; }
    }
}
