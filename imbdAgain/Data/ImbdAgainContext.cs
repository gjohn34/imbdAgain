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
        public DbSet<Director> Directors { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Review> Reviews { get; set; }

        public ImbdAgainContext (DbContextOptions<ImbdAgainContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Director>()
                .HasMany(d => d.Movies)
                .WithOne(m => m.Director)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Movie>()
                .HasMany(m => m.Reviews)
                .WithOne(r => r.Movie)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Director>()
                .HasData(
                    new Director
                    {
                        Id = 1,
                        FirstName = "A",
                        LastName = "B"
                    },
                    new Director
                    {
                        Id = 2,
                        FirstName = "C",
                        LastName = "D"
                    }
                );
            modelBuilder.Entity<Movie>()
                .HasData(
                    new Movie { Id = 1, DirectorId = 1, Title = "Foo" },
                    new Movie { Id = 2, DirectorId = 2, Title = "Bar" }
                );

            modelBuilder.Entity<Review>()
                .HasData(
                    new Review { Id = 1, MovieId = 1, Score = 1, Content = "Meh" },
                    new Review { Id = 2, MovieId = 1, Score = 4, Content = "Good" },
                    new Review { Id = 3, MovieId = 2, Score = 5, Content = "Perfect" }
                );
        }



    }
}
