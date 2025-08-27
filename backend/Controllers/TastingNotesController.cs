using Microsoft.AspNetCore.Mvc;
using WhiskeyTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace WhiskeyTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TastingNotesController : ControllerBase
    {
        private readonly WhiskeyTrackerDbContext _context;

        public TastingNotesController(WhiskeyTrackerDbContext context)
        {
            _context = context;
        }

        // GET: api/TastingNotes
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var notes = await _context.TastingNotes.ToListAsync();
            return Ok(notes);
        }

        // GET: api/TastingNotes/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var note = await _context.TastingNotes.FindAsync(id);
            if (note == null) return NotFound();
            return Ok(note);
        }

        // POST: api/TastingNotes
        [HttpPost]
        public async Task<IActionResult> Create(TastingNote note)
        {
            _context.TastingNotes.Add(note);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = note.Id }, note);
        }

        // PUT: api/TastingNotes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TastingNote note)
        {
            if (id != note.Id) return BadRequest();
            _context.Entry(note).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.TastingNotes.Any(e => e.Id == id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        // DELETE: api/TastingNotes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var note = await _context.TastingNotes.FindAsync(id);
            if (note == null) return NotFound();
            _context.TastingNotes.Remove(note);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
