using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using SkillInventory.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Net.Http.Headers;


namespace SkillInventory.Controllers
{
    public class LoginController : Controller
    {
        public IConfiguration Configuration { get; }
        public LoginController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public JsonResult AdminLogin(EmployeeSkill employeeSkill)
        {
            var tokenString = "";
            try
            {


                SqlConnection conn = new SqlConnection(Configuration.GetConnectionString("DefaultConnection"));
                LoginRollData lstroll = new LoginRollData();
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                cmd.CommandText = "LoginSP";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FirstName", employeeSkill.FirstName == null ? "" : employeeSkill.FirstName);
                cmd.Parameters.AddWithValue("@LastName", employeeSkill.LastName == null ? "" : employeeSkill.LastName);
                cmd.Parameters.AddWithValue("@Password", EncryptPasswordBase64(employeeSkill.Password) == null ? "" : EncryptPasswordBase64(employeeSkill.Password));
                LoginRollData res = new LoginRollData();
                SqlParameter oblogin = new SqlParameter();
                oblogin.ParameterName = "@Isvalid";
                oblogin.SqlDbType = SqlDbType.Bit;

                oblogin.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(oblogin);

                SqlParameter ObjRoll = new SqlParameter();
                ObjRoll.ParameterName = "@Roll";
                ObjRoll.SqlDbType = SqlDbType.NVarChar;
                ObjRoll.Size = 100;
                ObjRoll.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(ObjRoll);
                conn.Open();
                cmd.ExecuteNonQuery();

                conn.Close();

                var itemToken = Convert.ToInt32(oblogin.Value);
                var itemRoll = Convert.ToString(ObjRoll.Value);

                if (itemToken == 1)
                {
                    tokenString = GenerateJSONWebToken(employeeSkill);
                    lstroll.Oblogin = Convert.ToString(tokenString);
                    lstroll.ObjRoll = EncryptPasswordBase64(itemRoll);
                    HttpClient client = new HttpClient();
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenString);
                    HttpContext.Session.SetString("JWToken", tokenString);
                    
                    
                }
                else
                {
                    tokenString = "0";
                   
                }

                LoginRollData loginRollData = new LoginRollData();
                loginRollData.Oblogin = lstroll.Oblogin;
                loginRollData.ObjRoll = lstroll.ObjRoll;
           



                return new JsonResult(lstroll);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return new JsonResult("");
        }

        private string GenerateJSONWebToken(EmployeeSkill employeeSkill)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
              Configuration["Jwt:Issuer"],
              Configuration["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public static string EncryptPasswordBase64(string text)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(text);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public JsonResult RoleDecrypt(LoginRollData loginRollData)
        {
            var role = DecryptPasswordBase64(loginRollData.ObjRoll);
            //var Token = loginRollData.Oblogin;
            return new JsonResult(role);
        }


        public static string DecryptPasswordBase64(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}
