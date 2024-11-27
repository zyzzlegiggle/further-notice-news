using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
namespace ReactApp2.Server.Models.User;


public class Bookmark
{
    [ScaffoldColumn(false)]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Url { get; set; }
    public string Title { get; set; }
    [NotMapped]
    public Dictionary<string, string> Source { get; set; }
    public string SourceJson
    {
        get => Source == null ? null : JsonSerializer.Serialize(Source);
        set => Source = value == null ? null : JsonSerializer.Deserialize<Dictionary<string, string>>(value);
    }
    public string? UrlToImage { get; set; }
    public string? Description { get; set; }
    public string PublishedAt { get; set; }
}
