﻿using ClassMate.Models;
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
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Quiz> Quizzes { get; set; } 
        public DbSet<Question> Questions { get; set; } 

    }


}
