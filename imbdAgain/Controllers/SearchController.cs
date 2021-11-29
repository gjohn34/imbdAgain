using imbdAgain.Data;
using imbdAgain.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imbdAgain.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {

        private readonly ImbdAgainContext _context;
        public SearchController(ImbdAgainContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Search([FromBody] SearchModel searchModel)
        {
            List<object> results;
            switch (searchModel.Type)
            {
                case SearchModel.SearchType.Director:
                    results = new List<object>(_context.Directors.Where(d => d.FirstName.Contains(searchModel.Query) || d.LastName.Contains(searchModel.Query)));
                    break;
                case SearchModel.SearchType.Movie:
                    results = new List<object>(_context.Movies.Include(m => m.Director).Where(m => m.Title.Contains(searchModel.Query)));
                    break;
                default:
                    return BadRequest();
            }
            return Ok(results);
        }

    //public IActionResult GetById(int id)
    //{
    //    if (!_repository.TryGetProduct(id, out var product))
    //    {
    //        return NotFound();
    //    }

    //    return Ok(product);
    //}
    }
    public class SearchModel
    {
        public enum SearchType
        {
            Director,
            Movie
        }
        public string Query { get; set; }
        public SearchType Type { get; set; }
    }
}
