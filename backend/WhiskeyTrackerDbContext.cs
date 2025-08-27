
using Microsoft.EntityFrameworkCore;
using WhiskeyTracker.Api.Models;

namespace WhiskeyTracker.Api
{
    public class WhiskeyTrackerDbContext : DbContext
    {
        public WhiskeyTrackerDbContext(DbContextOptions<WhiskeyTrackerDbContext> options) : base(options) { }

        // DbSets for main entities
        public DbSet<User> Users { get; set; }
        public DbSet<Whiskey> Whiskies { get; set; }
        public DbSet<TastingNote> TastingNotes { get; set; }
        public DbSet<Inventory> Inventory { get; set; }
        public DbSet<TastingSession> TastingSessions { get; set; }
        public DbSet<InfinityBottle> InfinityBottles { get; set; }
    }
}
