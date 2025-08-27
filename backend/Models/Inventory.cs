namespace WhiskeyTracker.Api.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WhiskeyId { get; set; }
        public int Quantity { get; set; }
        public string Status { get; set; } = string.Empty; // e.g., Open, Consumed
    }
}
