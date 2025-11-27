using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers
{ 
    [ApiController]
    [Route("api/[controller]")]
    public class AthleteController : ControllerBase 
    {
        private readonly SportsWorldContext context;
        public AthleteController(SportsWorldContext _context)
    {
        context = _context;
    }

    //GET: api/athlete
    [HttpGet]
    public async Task<List<Athlete>> GetAll()
    {
        return await context.Athletes.ToListAsync();
    }

    //GET: api/athlete/2
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Athlete>> GetById(int id)
    {
        var athlete = await context.Athletes.FindAsync(id);
        if (athlete == null)
            return NotFound($"Athlete with id {id} not found.");

        return Ok(athlete);
    }

    //POST: api/athlete
    [HttpPost]
    public async Task<ActionResult<Athlete>> AddAthlete([FromBody] Athlete athlete)
    {
        if (athlete == null)
            return BadRequest("Athlete cannot be null.");

        context.Athletes.Add(athlete);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new{id = athlete.Id}, athlete);
    }

    //PUT: api/athlete/2
    [HttpPut("{id:int}")]
    public async Task<ActionResult<Athlete>> UpdateAthlete(int id,[FromBody] Athlete updated)
    {
        var existing = await context.Athletes.FindAsync(id);
        if(existing == null)
            return NotFound($"Athlete with id {id} not found.");

        //Oppdater feltene
        existing.Name = updated.Name;
        existing.Gender = updated.Gender;
        existing.Price = updated.Price;
        existing.Image = updated.Image;
        existing.PurchaseStatus = updated.PurchaseStatus;

        await context.SaveChangesAsync();

        return Ok(existing);
    }

    //DELETE: api/athlete/3
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAthlete(int id)
    {
        var athlete = await context.Athletes.FindAsync(id);
        if (athlete == null)
            return NotFound($"Athlete with id {id} not found.");

        context.Athletes.Remove(athlete);
        await context.SaveChangesAsync();

        return NoContent();
    }

    }

}