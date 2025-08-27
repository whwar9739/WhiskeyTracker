using Microsoft.AspNetCore.Mvc;
using WhiskeyTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace WhiskeyTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TastingSessionsController : ControllerBase
    {
        private readonly WhiskeyTrackerDbContext _context;

        public TastingSessionsController(WhiskeyTrackerDbContext context)
        {
            _context = context;
        }

        // GET: api/TastingSessions
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sessions = await _context.TastingSessions.ToListAsync();
            return Ok(sessions);
        }

        // GET: api/TastingSessions/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var session = await _context.TastingSessions.FindAsync(id);
            if (session == null) return NotFound();
            return Ok(session);
        }

        // POST: api/TastingSessions
        [HttpPost]
        public async Task<IActionResult> Create(TastingSession session)
        {
            _context.TastingSessions.Add(session);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = session.Id }, session);
        }

        // PUT: api/TastingSessions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TastingSession session)
        {
            if (id != session.Id) return BadRequest();
            _context.Entry(session).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.TastingSessions.Any(e => e.Id == id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        // DELETE: api/TastingSessions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var session = await _context.TastingSessions.FindAsync(id);
            if (session == null) return NotFound();
            _context.TastingSessions.Remove(session);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
