using Microsoft.EntityFrameworkCore;

namespace ReactApp2.Server
{
    public class BookmarkDb : DbContext
    {
        public BookmarkDb(DbContextOptions<BookmarkDb> options) 
            : base(options) { }

        public DbSet<BookmarkItem> Bookmarks { get; set; } = null!;
    }
}
