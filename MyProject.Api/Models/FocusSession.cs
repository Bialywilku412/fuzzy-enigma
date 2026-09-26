public class FocusSession()
{
    public long Id { get; set; }
    public long HabitId { get; set; }
    public Habit Habit { get; set; }
    public long UserId { get; set; }
    public User User { get; set; }
    public DateTime Date { get; set; }
    public int DurationInMinutes { get; set; }
}