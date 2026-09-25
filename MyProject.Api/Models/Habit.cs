public class Habit
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public long UserId { get; set; }
    public User User { get; set; }
}