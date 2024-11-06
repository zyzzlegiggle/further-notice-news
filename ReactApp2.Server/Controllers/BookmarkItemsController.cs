using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server;

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkItemsController : ControllerBase
    {
        private readonly BookmarkDb _context;
        private readonly ILogger _logger;
        public BookmarkItemsController(BookmarkDb context)
        {
            _context = context;
        }

        // GET: api/BookmarkItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookmarkItem>>> GetBookmarks()
        {
            return await _context.Bookmarks.ToListAsync();
        }

        // GET: api/BookmarkItems/5
        [HttpGet("{url}")]
        public async Task<ActionResult<BookmarkItem>> GetBookmarkItem(string url)
        {
            var bookmarkItem = await _context.Bookmarks.FindAsync(url);

            if (bookmarkItem == null)
            {
                return NotFound();
            }

            return bookmarkItem;
        }

        // PUT: api/BookmarkItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{url}")]
        public async Task<IActionResult> PutBookmarkItem(string url, BookmarkItem bookmarkItem)
        {
            if (url != bookmarkItem.Url)
            {
                return BadRequest();
            }

            _context.Entry(bookmarkItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookmarkItemExists(url))
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

        // POST: api/BookmarkItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookmarkItem>> PostBookmarkItem(BookmarkItem bookmarkItem)
        {
            _context.Bookmarks.Add(bookmarkItem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookmarkItemExists(bookmarkItem.Url))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetBookmarkItem), new { url = bookmarkItem.Url }, bookmarkItem);
        }

        // DELETE: api/BookmarkItems/
        [HttpDelete]
        public async Task<IActionResult> DeleteBookmarkItem(BookmarkItem bookmark)
        {

            var bookmarkItem = await _context.Bookmarks.FindAsync(bookmark.Url);
            if (bookmarkItem == null)
            {
                return NotFound();
            }

            _context.Bookmarks.Remove(bookmarkItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookmarkItemExists(string url)
        {
            return _context.Bookmarks.Any(e => e.Url == url);
        }
    }
}
