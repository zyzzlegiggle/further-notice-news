namespace ReactApp2.Server.Models.Users;

using Microsoft.AspNetCore.Identity;

// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Models.User;

public class UserDbContext : IdentityDbContext<UserItem>
{
    public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

    // add some entities
    public DbSet<Bookmark> Bookmarks { get; set; }  

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Bookmark>().ToTable("Bookmark");
    }
}