using Microsoft.EntityFrameworkCore;

namespace SportsWorldAPI.Models;

public class SportsWorldContext : DbContext

{
    public SportsWorldContext(DbContextOptions<SportsWorldContext> options):base(options){}

    public DbSet<Athlete> Athletes {get; set;} 
    public DbSet<Finance> Finances {get; set;}
}