using Microsoft.EntityFrameworkCore;

[Index(nameof(Login), IsUnique = true)]
public class User
{
    public long Id { get; set; }
    public string Login { get; set; }
    public string PasswordHash { get; set; }
    public string Rank { get; set; }
}