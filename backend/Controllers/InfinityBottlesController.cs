using Microsoft.AspNetCore.Mvc;
using WhiskeyTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace WhiskeyTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InfinityBottlesController : ControllerBase
    {
        private readonly WhiskeyTrackerDbContext _context;

        public InfinityBottlesController(WhiskeyTrackerDbContext context)
        {
            _context = context;
        }

        // GET: api/InfinityBottles
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bottles = await _context.InfinityBottles.ToListAsync();
            return Ok(bottles);
        }

        // GET: api/InfinityBottles/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var bottle = await _context.InfinityBottles.FindAsync(id);
            if (bottle == null) return NotFound();
            return Ok(bottle);
        }

        // POST: api/InfinityBottles
        [HttpPost]
        public async Task<IActionResult> Create(InfinityBottle bottle)
        {
            _context.InfinityBottles.Add(bottle);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = bottle.Id }, bottle);
        }

        // PUT: api/InfinityBottles/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, InfinityBottle bottle)
        {
            if (id != bottle.Id) return BadRequest();
            _context.Entry(bottle).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.InfinityBottles.Any(e => e.Id == id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        // DELETE: api/InfinityBottles/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var bottle = await _context.InfinityBottles.FindAsync(id);
            if (bottle == null) return NotFound();
            _context.InfinityBottles.Remove(bottle);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
