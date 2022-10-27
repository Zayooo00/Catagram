using Microsoft.EntityFrameworkCore;
using catgramAPI.Models;

namespace catgramAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Profile> Profiles { get; set;  }
        public DbSet<Follow> Follows { get; set; }
    }
}
