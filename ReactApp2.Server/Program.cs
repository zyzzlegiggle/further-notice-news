using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server;
using ReactApp2.Server.Models;
using ReactApp2.Server.Models.Users;
using Microsoft.AspNetCore.OpenApi;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// db contexts
var BookmarkDbContext = builder.Configuration.GetConnectionString("BookmarkDbContext") ?? throw new InvalidOperationException("No connection string BookmarkDb");
builder.Services.AddDbContext<BookmarkDb>(opt =>
    opt.UseSqlServer(BookmarkDbContext));

var UserDbContext = builder.Configuration.GetConnectionString("UserDbContext") ?? throw new InvalidOperationException("No connection string UserDbContext");
builder.Services.AddDbContext<UserDbContext>(
    options => options.UseSqlServer(UserDbContext));

builder.Services.AddDatabaseDeveloperPageExceptionFilter(); // to help debug in console for db

// identity
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<UserItem>()
    .AddEntityFrameworkStores<UserDbContext>();

// logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapIdentityApi<UserItem>();


// for identity api
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

app.MapPost("/InsertBookmark"), 

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
