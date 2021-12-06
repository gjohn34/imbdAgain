using imbdAgain.Data;
using imbdAgain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imbdAgain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly ImbdAgainContext _context;

        public GenresController(ImbdAgainContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Genre>>> GetGenres()
        {

            /// TODO - Clean up other queries to use select
            return await _context.Genres
                    .Include(g => g.Movies)
                    .Select(g => new Genre { Name =  g.Name, Id = g.Id, Movies = g.Movies })
                    .ToListAsync();
        }
    }
}
