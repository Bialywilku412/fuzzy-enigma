using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Habit> Habits { get; set; }
    public DbSet<TodoItem> TodoItems { get; set; }
    public DbSet<StoicQuote> StoicQuotes { get; set; }
}