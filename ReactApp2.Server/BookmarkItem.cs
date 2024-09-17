using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp2.Server
{
    public class BookmarkItem
    {
        [Key]
        public string Url { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string UrlToImage { get; set; }
        public string? Description { get; set; }

    }
}
