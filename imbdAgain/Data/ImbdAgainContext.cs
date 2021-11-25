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
                        FirstName = "Steven",
                        LastName = "Speilberg"
                    },
                    new Director
                    {
                        Id = 2,
                        FirstName = "Alfred",
                        LastName = "Hitchcock"
                    },
                    new Director
                    {
                        Id = 3,
                        FirstName = "Uwe",
                        LastName = "Boll"
                    }
                );
            modelBuilder.Entity<Movie>()
                .HasData(
                    new Movie { Id = 1, DirectorId = 1, Title = "Duel" },
                    new Movie { Id = 2, DirectorId = 1, Title = "Jaws" },
                    new Movie { Id = 3, DirectorId = 1, Title = "ET" },
                    new Movie { Id = 4, DirectorId = 2, Title = "The man who knew too much" },
                    new Movie { Id = 5, DirectorId = 2, Title = "Psycho" },
                    new Movie { Id = 6, DirectorId = 3, Title = "Resident Evil" },
                    new Movie { Id = 7, DirectorId = 3, Title = "Doom" },
                    new Movie { Id = 8, DirectorId = 3, Title = "BloodRayne" }
                );

            modelBuilder.Entity<Review>()
                .HasData(
                    new Review { Id = 1, MovieId = 1, Score = 9, Content = "Great movie" },
                    new Review { Id = 2, MovieId = 1, Score = 7, Content = "Good" },
                    new Review { Id = 3, MovieId = 1, Score = 8, Content = "Truck go brrr" },
                    new Review { Id = 4, MovieId = 2, Score = 2, Content = "Too Scary" },
                    new Review { Id = 5, MovieId = 8, Score = 1, Content = "Uwe boll at it again" },
                    new Review { Id = 6, MovieId = 8, Score = 2, Content = "Trash" },
                    new Review { Id = 7, MovieId = 8, Score = 1, Content = "Skip" }
                );
        }



    }
}
