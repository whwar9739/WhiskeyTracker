namespace WhiskeyTracker.Api.Models
{
    public class Whiskey
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Distillery { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public string AgeStatement { get; set; } = string.Empty;
        public decimal ABV { get; set; }
        public string ImageFilename { get; set; } = string.Empty;
    }
}
