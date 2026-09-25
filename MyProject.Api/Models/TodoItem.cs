public class TodoItem
{
    public long Id { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public bool IsDone { get; set; }
    public long UserId { get; set; }
    public User User { get; set; }
}