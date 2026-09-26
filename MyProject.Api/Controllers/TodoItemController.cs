using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TodoItemController : ControllerBase
{
    private readonly AppDbContext _context;

    public TodoItemController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetAllTodoItems()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var userTodoItems = await _context.TodoItems
           .Where(t => t.UserId == userId)
           .ToListAsync();

        return Ok(userTodoItems);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var item = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if(item == null)
            return NotFound();

        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> PostTodoItem(CreateTodoItemRequest request)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var user = await _context.Users.FindAsync(userId);

        if (user == null)
            return NotFound();

        TodoItem item = new TodoItem
        {
            Name = request.Name,
            Date = request.Date,
            IsDone = request.IsDone,
            UserId = userId,
            User = user
        };

        _context.TodoItems.Add(item);
        await _context.SaveChangesAsync();

        return Ok(item);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTodoItem(long id)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var item = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        if(item == null)
            return BadRequest();

        _context.TodoItems.Remove(item);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> PutTodoItem(long id, UpdateTodoItemRequest request)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userId = long.Parse(userIdClaim);

        var existing = await _context.TodoItems
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (existing == null)
            return NotFound();

        existing.Name = request.Name;
        existing.Date = request.Date;
        existing.IsDone = request.IsDone;

        await _context.SaveChangesAsync();

        return NoContent();
    }
}
