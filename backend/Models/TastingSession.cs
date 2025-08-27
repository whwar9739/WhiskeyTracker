namespace WhiskeyTracker.Api.Models
{
    public class TastingSession
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime Date { get; set; }
    }
}
