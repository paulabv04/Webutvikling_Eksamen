
using Microsoft.AspNetCore.Mvc;
using SportsWorldAPI.Models;
namespace SportsWorldAPI.Controllers 
{
    
[ApiController]
[Route("api/[controller]")]
public class VenuesController : ControllerBase 
{
    // midlertidig database
    private static readonly List<Venue> _venues = new List<Venue>()
    {
        new Venue { Id = 1, Name = "Centre Court, Wimbeldon", Capacity = 15000, Image = "/images/wimbledon.jpg"},
        new Venue { Id = 2, Name = "Monte Carlo, Country Club", Capacity = 10000, Image = "/images/montecarlo.jpg"},
        new Venue { Id = 3, Name = "Arthur Ashe Stadium, US Open", Capacity = 23000, Image = "/images/arthurashe.jpg"},
        new Venue { Id = 4, Name = "Rod Laver Arena, Australian Open", Capacity = 14800, Image = "/images/rodlover.jpg"}
    };

    // READ - Get alle
    // Get Api venues
    [HttpGet]
    public ActionResult<IEnumerable<Venue>> GetAll()
    {
        return Ok(_venues);
    }

    // READ - Get en venue
    // GET: api/venues/3
    [HttpGet("{id}")]
    public ActionResult<Venue> GetById(int id)
    {
        var venue = _venues.FirstOrDefault(v => v.Id == id);
        if (venue == null) return NotFound();
        return Ok(venue);
    }

    // Create - legg til ny venue 
    // Post: api/venues
    [HttpPost]
    public ActionResult<Venue> Create(Venue venue)
    {
        var nextId = _venues.Any() ? _venues.Max(v => v.Id) + 1 : 1;
        venue.Id = nextId;

        _venues.Add(venue);

        return CreatedAtAction(nameof(GetById), new { id = venue.Id }, venue);
    }

    // Update - oppdatere eksisterende venue 
    // PUT: api/venues/2
    [HttpPut("{id}")]
    public ActionResult<Venue> Update(int id, Venue updatedVenue)
    {
        var venue = _venues.FirstOrDefault(v => v.Id == id);
        if (venue == null) return NotFound();

        venue.Name = updatedVenue.Name;
        venue.Capacity = updatedVenue.Capacity;
        venue.Image = updatedVenue.Image;

        return Ok(venue);
    }

    // DELETE - slette venue
    // DELETE: api/venues/2
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var venue = _venues.FirstOrDefault(v => v.Id == id);
        if (venue == null) return NotFound();

        _venues.Remove(venue);
        return NoContent();
    }
    }
}