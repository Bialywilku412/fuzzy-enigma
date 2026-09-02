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

    [HttpPut("{id}")]
    public async Task<IActionResult> PutHabit(long id, Habit habit)
    {
        if(id != habit.Id)
            return BadRequest();

        _context.Entry(habit).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch(DbUpdateConcurrencyException)
        {
            if(!HabitExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }
}
