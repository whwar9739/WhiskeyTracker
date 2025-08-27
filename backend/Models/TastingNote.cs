namespace WhiskeyTracker.Api.Models
{
    public class TastingNote
    {
        public int Id { get; set; }
        public int WhiskeyId { get; set; }
        public int UserId { get; set; }
        public string Notes { get; set; } = string.Empty;
        public int Rating { get; set; } // 1-5 stars
    }
}
