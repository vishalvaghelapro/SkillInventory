using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillInventory.Models;
using System.Diagnostics;

namespace SkillInventory.Controllers
{
  
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;


        public IActionResult Login()
        {
            return View();
        }

        [Authorize]
        public IActionResult Registration()
        {
            return View();
        }

        [Authorize]
        public IActionResult EmployeeDetail()
        {
           
            return View();
        }
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login", "Home");
        }




    }
}