using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server;
using ReactApp2.Server.Models;
using ReactApp2.Server.Models.Users;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// db contexts
/*
var BookmarkDbString = builder.Configuration.GetConnectionString("BookmarkDb") ?? throw new InvalidOperationException("No connection string BookmarkDb");
builder.Services.AddDbContext<BookmarkDb>(opt =>
    opt.UseSqlServer(BookmarkDbString));

var UserDbString = builder.Configuration.GetConnectionString("UserDb") ?? throw new InvalidOperationException("No connection string UserDb");
builder.Services.AddDefaultIdentity<UserItem>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<UserDbContext>();
builder.Services.AddDbContext<UserDbContext>(
    options => options.UseSqlServer(UserDbString));
*/
var ApplicationDbContextConnection = builder.Configuration.GetConnectionString("ApplicationDbContextConnection") ?? throw new InvalidOperationException("No connection string ApplicationDbContextConnection");
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseInMemoryDatabase("ApplicationDbContextConnection"));

// identity
builder.Services.AddIdentityApiEndpoints<UserItem>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

// logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// identity
app.MapIdentityApi<UserItem>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
