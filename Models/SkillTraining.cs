using System.ComponentModel.DataAnnotations;

namespace SkillInventory.Models
{
    public class SkillTraining
    {
        [Key]
        public int SkillTrainingId { get; set; }
        public string TrainingName { get; set; }
        public string TrainingProvider { get; set; }

        public DateTime DateOfTraining { get; set; }

        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }


    }
}
