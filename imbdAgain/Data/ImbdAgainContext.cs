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
        public DbSet<Genre> Genres { get; set; }

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
                .HasMany(m => m.Genres)
                .WithMany(g => g.Movies)
                .UsingEntity<MovieGenre>(
                    e => e
                            .HasOne(mg => mg.Genre)
                            .WithMany(g => g.MovieGenres)
                            .HasForeignKey(mg => mg.GenreId),
                    e => e
                            .HasOne(mg => mg.Movie)
                            .WithMany(m => m.MovieGenres)
                            .HasForeignKey(mg => mg.MovieId),
                    e => e
                            .HasKey(mg => new { mg.GenreId, mg.MovieId })
                )
                .HasMany(m => m.Reviews)
                .WithOne(r => r.Movie)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Genre>()
                .HasMany(g => g.Movies)
                .WithMany(m => m.Genres)
                .UsingEntity<MovieGenre>(
                    e => e
                            .HasOne(mg => mg.Movie)
                            .WithMany(m => m.MovieGenres)
                            .HasForeignKey(mg => mg.MovieId),
                    e => e
                            .HasOne(mg => mg.Genre)
                            .WithMany(g => g.MovieGenres)
                            .HasForeignKey(mg => mg.GenreId),
                    e => e
                            .HasKey(mg => new { mg.GenreId, mg.MovieId })
                );


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


            modelBuilder.Entity<Genre>()
                .HasData(
                    new Genre { Id = 1, Name = "Thriller" },
                    new Genre { Id = 2, Name = "Action" },
                    new Genre { Id = 3, Name = "Family" },
                    new Genre { Id = 4, Name = "Suspense" },
                    new Genre { Id = 5, Name = "Sci-Fi" },
                    new Genre { Id = 6, Name = "Adaptation" }

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

            modelBuilder.Entity<MovieGenre>()
                .HasData(
                    new MovieGenre { GenreId = 1, MovieId = 1 },
                    new MovieGenre { GenreId = 2, MovieId = 1 },
                    new MovieGenre { GenreId = 3, MovieId = 1 },
                    new MovieGenre { GenreId = 1, MovieId = 2 },
                    new MovieGenre { GenreId = 2, MovieId = 2 },
                    new MovieGenre { GenreId = 4, MovieId = 2 },
                    new MovieGenre { GenreId = 3, MovieId = 3 },
                    new MovieGenre { GenreId = 5, MovieId = 3 },
                    new MovieGenre { GenreId = 4, MovieId = 4 },
                    new MovieGenre { GenreId = 1, MovieId = 4 },
                    new MovieGenre { GenreId = 1, MovieId = 5 },
                    new MovieGenre { GenreId = 2, MovieId = 5 },
                    new MovieGenre { GenreId = 6 , MovieId = 6 },
                    new MovieGenre { GenreId = 2 , MovieId = 6 },
                    new MovieGenre { GenreId = 6, MovieId = 7 },
                    new MovieGenre { GenreId = 2, MovieId = 7 },
                    new MovieGenre { GenreId = 6, MovieId = 8 },
                    new MovieGenre { GenreId = 2, MovieId = 8 }
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
