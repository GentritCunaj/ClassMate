using ClassMate.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ClassMate.Data
{
    public class DataContext:IdentityDbContext<ApplicationUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {
        
        }


        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<StudyGroup> StudyGroups { get; set; }
        public DbSet<UserStudyGroup> UserStudyGroups { get; set; }

    }


}
