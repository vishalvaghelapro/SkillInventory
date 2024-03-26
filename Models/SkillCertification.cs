using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace SkillInventory.Models
{
    public class SkillCertification
    {
        [Key]
        public int SkillCertificationId { get; set; }
        public string CertificationName { get; set; }
        public string IssuingOrganization { get; set; }
        public DateTime DateOfCertification { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}
