using Microsoft.AspNetCore.Mvc;
using WhiskeyTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace WhiskeyTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly WhiskeyTrackerDbContext _context;

        public InventoryController(WhiskeyTrackerDbContext context)
        {
            _context = context;
        }

        // GET: api/Inventory
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var inventory = await _context.Inventory.ToListAsync();
            return Ok(inventory);
        }

        // GET: api/Inventory/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.Inventory.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        // POST: api/Inventory
        [HttpPost]
        public async Task<IActionResult> Create(Inventory item)
        {
            _context.Inventory.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        // PUT: api/Inventory/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Inventory item)
        {
            if (id != item.Id) return BadRequest();
            _context.Entry(item).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Inventory.Any(e => e.Id == id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        // DELETE: api/Inventory/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Inventory.FindAsync(id);
            if (item == null) return NotFound();
            _context.Inventory.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
