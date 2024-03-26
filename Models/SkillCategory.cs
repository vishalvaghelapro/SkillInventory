using System.ComponentModel.DataAnnotations;

namespace SkillInventory.Models
{
    public class SkillCategory
    {
        [Key]
        public int SkillCategoryId { get; set; }

        public string CategoryName { get; set; }

        public string CategoryDescription { get; set; }
    }
}
