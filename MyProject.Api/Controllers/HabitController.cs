using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class HabitController : ControllerBase
{
    private readonly AppDbContext _context;
    public HabitController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Habit>> GetHabit(long id)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var habit = await _context.Habits
            .FirstOrDefaultAsync(h => h.Id == id && h.UserId == userId);

        if (habit == null)
            return NotFound();

        return habit;
    }

    [HttpPost]
    public async Task<ActionResult<Habit>> PostHabit(CreateHabitRequest request)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var user = await _context.Users.FindAsync(userId);

        if (user == null)
            return NotFound();

        var habit = new Habit
        {
            Name = request.Name,
            Category = request.Category,
            Description = request.Description,
            UserId = userId,
            User = user
        };

        _context.Habits.Add(habit);
        await _context.SaveChangesAsync();

        return Ok(habit);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Habit>>> GetAllHabits()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var userHabits = await _context.Habits
            .Where(h => h.UserId == userId)
            .ToListAsync();

        return Ok(userHabits);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteHabit(long id)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var habit = await _context.Habits
            .FirstOrDefaultAsync(h => h.Id == id && h.UserId == userId);

        if (habit == null)
            return NotFound();

        _context.Habits.Remove(habit);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> PutHabit(long id, UpdateHabitRequest request)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var existing = await _context.Habits
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (existing == null)
            return NotFound();

        existing.Name = request.Name;
        existing.Category = request.Category;
        existing.Description = request.Description;

        await _context.SaveChangesAsync();

        return NoContent();
    }
}
