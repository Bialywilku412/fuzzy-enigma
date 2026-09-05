using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
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
        var habit = await _context.Habits.FindAsync(id);

        if(habit == null)
            return NotFound();

        return habit;
    }

    [HttpPost]
    public async Task<ActionResult<Habit>> PostHabit(Habit habit)
    {
        _context.Habits.Add(habit);
        await _context.SaveChangesAsync();

        return Ok(habit);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Habit>>> GetAllHabits()
    {
        return await _context.Habits.ToListAsync();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteHabit(long id)
    {
        var habit = await _context.Habits.FindAsync(id);

        if(habit == null)
            return NotFound();

        _context.Habits.Remove(habit);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> PutHabit(long id, Habit habit)
    {
        if(id != habit.Id)
            return BadRequest();

        _context.Habits.Update(habit);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
