using imbdAgain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imbdAgain.Data
{
    public static class ImbdAgainInitializer
    {
        public static void Initialize(ImbdAgainContext context)
        {
            context.Database.EnsureCreated();

            if (context.Directors.Any())
            {
                return;
            }

            Director[] directors = new Director[]
            {
                new Director { FirstName = "Foo", LastName = "Bar" }
            };
            foreach (Director director in directors)
                context.Directors.Add(director);

            context.SaveChanges();
        }
    }
}
