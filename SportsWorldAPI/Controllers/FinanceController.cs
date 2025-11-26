using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers {
    [ApiController]
    [Route("api/[controller]")]

    public class FinanceController : ControllerBase {

        private readonly SportsWorldContext _context;

        public FinanceController(SportsWorldContext context){
            _context = context; 
        }
    

    //CRUD

    //GET api finance 
    [HttpGet]
    public async Task<ActionResult<Finance>> GetFinance(){
        var finance = await _context.Finances.FirstOrDefaultAsync(); 

        if (finance == null){
            return NotFound("Finance data not found");
        }
        return Ok(finance);
    }


    //POST api finance loan 
    [HttpPost("loan")]
    public async Task<ActionResult> AddLoan([FromBody] LoanRequest request){

        if (request.Amount <= 0){
            return BadRequest("Amount must be greater than zero.");
        }

        var finance = await _context.Finances.FirstOrDefaultAsync();
        if (finance == null){
            return NotFound("Finance data not found");
        }
        finance.MoneyLeft += request.Amount;

        _context.Finances.Update(finance);
        await _context.SaveChangesAsync(); 

        return Ok(finance);

    }




    [HttpPost("purchase/{athleteId}")]
    public async Task<ActionResult> PurchaseAthlete(int athleteId){

        var finance = await _context.Finances.FirstOrDefaultAsync(); 
        var athlete = await _context.Athletes.FirstOrDefaultAsync(a => a.Id == athleteId);

        if (finance == null) return NotFound("Finance data not found");
        if (athlete == null) return NotFound("Athlete not found");

        if (athlete.PurchaseStatus == true) {

            return BadRequest("Athlete is already purchased");
        }

        if (finance.MoneyLeft < athlete.Price){
            return BadRequest("Not enough money");
        }

        //oppdaterer finance 
        finance.MoneyLeft -= athlete.Price;
        finance.MoneySpent += athlete.Price;
        finance.NumberOfPurchases += 1; 

        athlete.PurchaseStatus = true;

        _context.Finances.Update(finance);
        _context.Athletes.Update(athlete);
        await _context.SaveChangesAsync();

        return Ok(new {
            finance,
            athlete

        });
        

        }

        public class LoanRequest {
            public double Amount { get; set;}
        }

    }
    
}
