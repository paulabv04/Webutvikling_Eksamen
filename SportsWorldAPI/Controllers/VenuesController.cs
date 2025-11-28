
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers 
{
    
[ApiController]
[Route("api/[controller]")]
public class VenuesController : ControllerBase 
{
    private readonly SportsWorldContext _context;

    public VenuesController(SportsWorldContext context)
    {
        _context = context;
    }

    // GET: api/Venues
    [HttpGet]
    public async Task<ActionResult<List<Venue>>> GetAll()
    {
        var venues = await _context.Venues.ToListAsync();
        return Ok(venues);
    }

    // GET: api/venues/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Venue>> GetByID(int id)
    {
        var venue = await _context.Venues.FindAsync(id);

        if (venue == null)
        {
            return NotFound();
        }
        return Ok(venue);
    }

    // POST api/Venues
    [HttpPost]
    public async Task<ActionResult<Venue>> Create(Venue venue)
    {
        _context.Venues.Add(venue);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetByID), new { id = venue.Id }, venue);
    }

    // PUT: api/Venues/5
    [HttpPut("{id}")]
    public async Task<ActionResult<Venue>> Update(int id, Venue updatedVenue)
    {
        var venue = await _context.Venues.FindAsync(id);

        if (venue == null)
        {
            return NotFound();
        }

        venue.Name = updatedVenue.Name;
        venue.Capacity = updatedVenue.Capacity;
        venue.Image = updatedVenue.Image;

        await _context.SaveChangesAsync();

        return Ok(venue);
    }

    // DELETE: api/Venues/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var venue = await _context.Venues.FindAsync(id);

        if(venue == null)
        {
            return NotFound();
        }

        _context.Venues.Remove(venue);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
}