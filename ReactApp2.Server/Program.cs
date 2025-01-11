using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server;
using ReactApp2.Server.Models;
using ReactApp2.Server.Models.Users;
using Microsoft.AspNetCore.OpenApi;
using System.Security.Claims;
using ReactApp2.Server.Models.User;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using Microsoft.Build.Logging;

var AllowSpecificOrigins = "_AllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://further-notice.onrender.com")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// db contexts

var UserDbContext = builder.Configuration.GetConnectionString("UserDbContext") ?? throw new InvalidOperationException("No connection string UserDbContext");
builder.Services.AddDbContext<UserDbContext>(
    options => options.UseNpgsql(UserDbContext));

// identity
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<UserItem>()
    .AddEntityFrameworkStores<UserDbContext>();


// logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

app.UseCors(AllowSpecificOrigins);

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapIdentityApi<UserItem>();


// for endpoints
app.MapPost("/logout", async (SignInManager<UserItem> signInManager) =>
{

    await signInManager.SignOutAsync();
    return Results.Ok();

})
.WithOpenApi()
.RequireAuthorization();

app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email); // get the user's email from the claim
    return Results.Json(new { Email = email }); ; // return the email as a plain text response
})
.WithOpenApi()
.RequireAuthorization();

app.MapPost("/api/bookmark/insert", async (Bookmark bookmark, UserManager<UserItem> userManager, UserDbContext db, HttpContext httpContext) =>
{

    if (bookmark == null)
    {
        return Results.BadRequest("Bookmark is required");
    }

    // get currently signed in user
    var user = await userManager.GetUserAsync(httpContext.User);
    if (user == null)
    {
        return Results.Unauthorized();
    }

    try
    {
        user.Bookmarks ??= new List<Bookmark>();
        bookmark.UserItem = user;
        db.Bookmarks.Add(bookmark);

        await db.SaveChangesAsync();

        var bookmarkDto = new BookmarkDto()
        {
            Title = bookmark.Title,
            Url = bookmark.Url,
            Source = bookmark.Source,
            UrlToImage = bookmark.UrlToImage,
            Description = bookmark.Description,
            PublishedAt = bookmark.PublishedAt
        };
        return Results.Created($"/api/bookmarkitems/{bookmarkDto.Url}", bookmarkDto);
    }
    catch (Exception ex)
    {
        return Results.BadRequest($"Error occurred: {ex.Message}");
    }
   
});

app.MapPost("/api/bookmark/delete", async (Bookmark bookmark, UserManager<UserItem> userManager, UserDbContext db, HttpContext httpContext) =>
{
    if (bookmark == null || string.IsNullOrEmpty(bookmark.Url))
    {
        return Results.BadRequest("Url must not be empty");
    }

    var user = await userManager.GetUserAsync(httpContext.User);
    if (user == null)
    {
        return Results.Unauthorized();
    }

    try
    {
        var dataBookmark = await db.Bookmarks
            .FirstOrDefaultAsync(b => b.Url == bookmark.Url && b.UserItem.Id == user.Id);

        if (dataBookmark == null)
        {
            return Results.NotFound("bookmark not found");
        }

        db.Bookmarks.Remove(dataBookmark);
        await db.SaveChangesAsync();

        return Results.Ok("Bookmark has been deleted");
    }
    catch (Exception ex)
    {
        return Results.BadRequest($"Error occurred: {ex.Message}");
    }
});

app.MapGet("/api/bookmark/get", async (UserManager<UserItem> userManager, UserDbContext db, HttpContext httpContext) =>
{
    // check if user logged in
    var user = await userManager.GetUserAsync(httpContext.User);
    if (user == null)
    {
        return Results.BadRequest("User is not logged in");
    }

    // get all bookmark from logged in user and store in dict?
    try 
    {
        // get all available bookmarks
        var dataBookmark = await db.Bookmarks
            .Where(b => b.UserItem.Id == user.Id)
            .ToListAsync();

        if (!dataBookmark.Any())
        {
            return Results.NotFound("bookmark not found");
        }

        var bookmarkDtos = new List<BookmarkDto>();
        foreach (var bookmark in dataBookmark)
        {
            var dto = new BookmarkDto
            {
                Url = bookmark.Url,
                Title = bookmark.Title,
                Source = bookmark.Source,
                UrlToImage = bookmark.UrlToImage,
                Description = bookmark.Description,
                PublishedAt = bookmark.PublishedAt,
            };
            bookmarkDtos.Add(dto);
        }

        return Results.Ok(bookmarkDtos);
    } 
    catch (Exception ex) 
    {
        return Results.BadRequest($"error in getting bookmark: {ex.Message}"); 
    }

});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
