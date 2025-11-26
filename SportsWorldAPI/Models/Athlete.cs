namespace SportsWorldAPI.Models;


public class Athlete 
{
        public int Id{get; set;}
        public string Name {get; set;} = "";
        public string Gender {get; set;} = "";
        public double Price {get; set;}
        public string Image {get; set;} = "";
        public bool PurchaseStatus {get; set;} = false;

    
}