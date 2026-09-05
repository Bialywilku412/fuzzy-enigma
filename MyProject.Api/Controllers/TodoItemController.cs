using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
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
        return await _context.TodoItems.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
    {
        var item = await _context.TodoItems.FindAsync(id);

        if(item == null)
            return NotFound();

        return Ok(item);
    }
    [HttpPost]
    public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem item)
    {
        if(item == null)
            return BadRequest();

        _context.TodoItems.Add(item);
        await _context.SaveChangesAsync();

        return Ok();
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTodoItem(long id)
    {
        var item = await _context.TodoItems.FindAsync(id);
        if(item == null)
            return BadRequest();

        _context.TodoItems.Remove(item);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> PutTodoItem(long id, TodoItem item)
    {
        if (id != item.Id)
            return BadRequest();

        _context.TodoItems.Update(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
