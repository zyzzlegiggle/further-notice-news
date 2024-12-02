using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server.Models.User;

public class BookmarkDto
{
    public string Url { get; set; }
    public string Title { get; set; }
    public string Source { get; set; }
    public string? UrlToImage { get; set; }
    public string? Description { get; set; }
    public string PublishedAt { get; set; }
}
