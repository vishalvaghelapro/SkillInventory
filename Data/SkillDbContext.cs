using Microsoft.EntityFrameworkCore;
using SkillInventory.Controllers;
using SkillInventory.Models;

namespace SkillInventory.Data
{
    public class SkillDbContext : DbContext
    {
        public SkillDbContext(DbContextOptions<SkillDbContext> options) : base(options) 
        {
        
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeSkill> EmployeesSkill { get; set; }
        public DbSet<Skill> Skill { get; set; }
        public DbSet<SkillCategory> SkillCategories { get; set; }
        public DbSet<SkillCertification> SkillCertifications { get; set;}
        public DbSet<SkillTraining> SkillTraining { get; set; }

        public static implicit operator SkillDbContext(EmployeeController v)
        {
            throw new NotImplementedException();
        }
    }
}
