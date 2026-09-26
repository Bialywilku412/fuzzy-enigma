using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class FocusSessionController : ControllerBase
{
    private readonly AppDbContext _context;
    public FocusSessionController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FocusSession>>> GetAllFocusSessions()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var userFocusSessions = await _context.FocusSessions
            .Where(f => f.UserId == userId)
            .ToListAsync();

        return userFocusSessions;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FocusSession>> GetFocusSession(long id)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var focusSession = await _context.FocusSessions.FirstOrDefaultAsync(f => f.Id == id && f.UserId == userId);
        if(focusSession == null)
            return NotFound();

        return focusSession;
    }

    [HttpPost]
    public async Task<ActionResult<FocusSession>> PostFocusSession(CreateFocusSessionRequest request)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var user = await _context.Users.FindAsync(userId);
        var habit = await _context.Habits.FindAsync(request.HabitId);

        if (user == null || habit == null)
            return NotFound();

        var focusSession = new FocusSession
        {
            HabitId = request.HabitId,
            Habit = habit,
            UserId = userId,
            User = user,
            Date = request.Date,
            DurationInMinutes = request.DurationInMinutes
        };

        _context.FocusSessions.Add(focusSession);
        await _context.SaveChangesAsync();

        return Ok(focusSession);
    }
}
