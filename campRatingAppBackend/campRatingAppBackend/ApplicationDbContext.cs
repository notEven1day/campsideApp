using campRatingAppBackend.models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace campRatingBackend
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Campground> Campgrounds { get; set; }
        public DbSet<Review> Reviews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User -> Review (one-to-many)
            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure Campground -> Review (one-to-many)
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Campground)
                .WithMany(c => c.Reviews)
                .HasForeignKey(r => r.CampgroundId)
                .OnDelete(DeleteBehavior.Cascade);

            // Ensure a User can leave only ONE Review per Campground
            modelBuilder.Entity<Review>()
                .HasIndex(r => new { r.UserId, r.CampgroundId })
                .IsUnique();
        }
    }
}
