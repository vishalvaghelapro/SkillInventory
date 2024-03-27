using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillInventory.Models;
using System.Diagnostics;

namespace SkillInventory.Controllers
{
   
    public class HomeController : Controller
    {
        
        public IActionResult Login()
        {
            return View();
        }

        [Authorize]
        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        public IActionResult EmployeeDetail()
        {
           
            return View();
        }

    

    }
}