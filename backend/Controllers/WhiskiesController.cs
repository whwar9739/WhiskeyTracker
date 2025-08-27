using Microsoft.AspNetCore.Mvc;
using WhiskeyTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace WhiskeyTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WhiskiesController : ControllerBase
    {
        private readonly WhiskeyTrackerDbContext _context;

        public WhiskiesController(WhiskeyTrackerDbContext context)
        {
            _context = context;
        }

        // GET: api/Whiskies
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var whiskies = await _context.Whiskies.ToListAsync();
            return Ok(whiskies);
        }

        // GET: api/Whiskies/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var whiskey = await _context.Whiskies.FindAsync(id);
            if (whiskey == null) return NotFound();
            return Ok(whiskey);
        }

        // POST: api/Whiskies
        [HttpPost]
        public async Task<IActionResult> Create(Whiskey whiskey)
        {
            _context.Whiskies.Add(whiskey);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = whiskey.Id }, whiskey);
        }

        // PUT: api/Whiskies/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Whiskey whiskey)
        {
            if (id != whiskey.Id) return BadRequest();
            _context.Entry(whiskey).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Whiskies.Any(e => e.Id == id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        // DELETE: api/Whiskies/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var whiskey = await _context.Whiskies.FindAsync(id);
            if (whiskey == null) return NotFound();
            _context.Whiskies.Remove(whiskey);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
