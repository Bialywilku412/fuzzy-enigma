using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]

public class StoicQuoteController : ControllerBase
{
    private readonly AppDbContext _context;
    public StoicQuoteController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<StoicQuote>>> GetAllStoicQuotes()
    {
        return await _context.StoicQuotes.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<StoicQuote>> GetStoicQuote(long id)
    {
        var stoicQuote = await _context.StoicQuotes.FindAsync(id);
        if (stoicQuote == null)
            return NotFound();

        return Ok(stoicQuote);
    }

    [HttpPost]
    public async Task<ActionResult<StoicQuote>> PostStoicQuote(StoicQuote stoicQuote)
    {
        if (stoicQuote == null)
            return BadRequest();

        _context.StoicQuotes.Add(stoicQuote);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteStoicQuote(long id)
    {
        var stoicQuote = await _context.StoicQuotes.FindAsync(id);
        if (stoicQuote == null)
            return NotFound();

        _context.StoicQuotes.Remove(stoicQuote);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> PutStoicQuote(long id, StoicQuote stoicQuote)
    {
        if(id != stoicQuote.Id)
            return BadRequest();

        _context.StoicQuotes.Update(stoicQuote);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}