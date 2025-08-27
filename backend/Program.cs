using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

using Microsoft.OpenApi.Models;
using WhiskeyTracker.Api;
using WhiskeyTracker.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "WhiskeyTracker API", Version = "v1" });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // JWT config placeholder
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        // options.TokenValidationParameters = ...
    });

// PostgreSQL connection string placeholder
builder.Services.AddDbContext<WhiskeyTrackerDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Seed test data if enabled in config
if (builder.Configuration.GetValue<bool>("SeedTestData"))
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<WhiskeyTrackerDbContext>();
    SeedTestDataFromFile(db, "SeedData.json");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

// Add the seed method
void SeedTestDataFromFile(WhiskeyTrackerDbContext db, string filePath)
{
    if (db.Users.Any()) return; // Only seed if empty
    var json = File.ReadAllText(filePath);
    var seed = JsonSerializer.Deserialize<SeedData>(json);
    if (seed == null) return;

    db.Users.AddRange(seed.Users);
    db.SaveChanges();
    foreach (var whiskey in seed.Whiskies) whiskey.UserId = db.Users.First().Id;
    db.Whiskies.AddRange(seed.Whiskies);
    db.SaveChanges();
    foreach (var note in seed.TastingNotes) { note.UserId = db.Users.First().Id; note.WhiskeyId = db.Whiskies.First().Id; }
    db.TastingNotes.AddRange(seed.TastingNotes);
    db.SaveChanges();
    foreach (var inv in seed.Inventory) { inv.UserId = db.Users.First().Id; inv.WhiskeyId = db.Whiskies.First().Id; }
    db.Inventory.AddRange(seed.Inventory);
    db.SaveChanges();
    foreach (var session in seed.TastingSessions) session.UserId = db.Users.First().Id;
    db.TastingSessions.AddRange(seed.TastingSessions);
    db.SaveChanges();
    foreach (var bottle in seed.InfinityBottles) bottle.UserId = db.Users.First().Id;
    db.InfinityBottles.AddRange(seed.InfinityBottles);
    db.SaveChanges();
}

class SeedData
{
    public List<User> Users { get; set; } = new();
    public List<Whiskey> Whiskies { get; set; } = new();
    public List<TastingNote> TastingNotes { get; set; } = new();
    public List<Inventory> Inventory { get; set; } = new();
    public List<TastingSession> TastingSessions { get; set; } = new();
    public List<InfinityBottle> InfinityBottles { get; set; } = new();
}
