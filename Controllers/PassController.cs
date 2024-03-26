using Microsoft.AspNetCore.Mvc;
using NuGet.Common;
using SkillInventory.Models;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text;

namespace SkillInventory.Controllers
{
    public class PassController
    {

        public JsonResult GetSessionData(LoginRollData loginRollData)
        {

            Console.WriteLine("Test");
            //string apiUrl = "https://192.168.10.203/";
    
            string jwtToken = loginRollData.Oblogin;
            HttpClient httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Bearer", jwtToken);

            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwtToken);
            // Return appropriate response or redirect
            //return View();
            //string token = "your_jwt_token"; // Replace with your valid JWT token
            // HttpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            //httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", LoginRollData.Oblogin);
            return new JsonResult("");
        }
    }
}
