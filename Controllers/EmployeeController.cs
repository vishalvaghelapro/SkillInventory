using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using SkillInventory.Controllers;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using SkillInventory.Models;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace SkillInventory.Controllers
{

    //[Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    //[AllowAnonymous]
   
    public class EmployeeController : Controller
    {
        
        public IActionResult Index()
        {
            return View();

        }

        public IConfiguration Configuration { get; }
        public EmployeeController(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        [HttpGet]
        public JsonResult GetData()
        {
            Console.WriteLine("started");
            try
            {

                //Configuration.GetConnectionString("DatabaseConnection");

                SqlConnection conn = new SqlConnection(Configuration.GetConnectionString("DefaultConnection"));
                List<EmployeeSkill> lst = new List<EmployeeSkill>();
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();

                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "EmpInfo";

                conn.Open();
                da.Fill(dt);
                conn.Close();

                foreach (DataRow dr in dt.Rows)
                {
                    lst.Add(
                        new EmployeeSkill
                        {
                            EmployeeSkillId = Convert.ToInt32(dr["EmployeeSkillId"]),
                            EmployeeId = Convert.ToInt32(dr["EmployeeId"]),
                            FirstName = Convert.ToString(dr["FirstName"]),
                            LastName = Convert.ToString(dr["LastName"]),
                            Email = Convert.ToString(dr["Email"]),
                            Department = Convert.ToString(dr["Department"]),
                            SkillName = Convert.ToString(dr["SkillName"]),
                            Roll = Convert.ToString(dr["Roll"]),
                            Password = Convert.ToString(dr["Password"]),
                            ProficiencyLevel = Convert.ToString(dr["ProficiencyLevel"]),


                        });  
                }

                var data = lst;
                return new JsonResult(data);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + "");
                return new JsonResult(ex.Message+"");
            }

            return new JsonResult("123");
        }
        //[Route("Home/EmployeeDetail")]
        public IActionResult redirectEmployeeDetails()
        {
            GetData();
            
            return RedirectToAction("EmployeeDetail", "home");
        }
            [HttpGet]
        public JsonResult GetDepartmentName()
        {
            try
            {
                SqlConnection conn = new SqlConnection(Configuration.GetConnectionString("DefaultConnection"));
                List<Department> lst = new List<Department>();
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();

                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "GetDepartment";

                conn.Open();
                da.Fill(dt);
                conn.Close();

                foreach (DataRow dr in dt.Rows)
                {
                    lst.Add(
                        new Department
                        {
                            //DepartmentId = Convert.ToInt32(dr["DepartmentId"]),
                            DepartmentName = Convert.ToString(dr["DepartmentName"])
                        });

                }

                var data = lst;
                return new JsonResult(data);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return new JsonResult(null);

        }

        [HttpGet]
        public JsonResult GetSkillName()
            {
            try
            {
                SqlConnection conn = new SqlConnection(Configuration.GetConnectionString("DefaultConnection"));
                List<Skill> lst = new List<Skill>();
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();

                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "GetSkill";

                conn.Open();
                da.Fill(dt);
                conn.Close();

                foreach (DataRow dr in dt.Rows)
                {
                    lst.Add(
                        new Skill
                        {
                            SkillId = Convert.ToInt32(dr["Skillid"]),
                            SkillName = Convert.ToString(dr["SkillName"])
                        });

                }

                var data = lst;
                return new JsonResult(data);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

            }
            return new JsonResult(null);
        }
       
        public JsonResult DeleteEmp(int id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(Configuration.GetConnectionString("DefaultConnection"));
                List<EmployeeSkill> lst = new List<EmployeeSkill>();
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();

                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "DeleteEmp";

                cmd.Parameters.AddWithValue("@EmployeeSkillId", id);
                cmd.CommandType = CommandType.StoredProcedure;

                conn.Open();
                cmd.ExecuteNonQuery();
                //da.Fill(dt);
                conn.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return new JsonResult("Data Deleted");
        }

        [HttpPost]
        public JsonResult AddEmp(EmployeeSkill employeeSkill)
        {
            try
            {
                SqlConnection conn = new SqlConnection(Configuration.GetConnectionString("DefaultConnection"));
                List<EmployeeSkill> lst = new List<EmployeeSkill>();
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();

                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "InsertData";

                cmd.Parameters.AddWithValue("@FirstName", employeeSkill.FirstName);
                cmd.Parameters.AddWithValue("@LastName", employeeSkill.LastName);
                cmd.Parameters.AddWithValue("@Email", employeeSkill.Email);
                cmd.Parameters.AddWithValue("@Department", employeeSkill.Department);
                cmd.Parameters.AddWithValue("@AllSkillId", employeeSkill.AllSkillId);
                //string[] skillIds = employeeSkill.AllSkillId.Replace(" ", "").Split(',');
                //foreach (string SkillId in skillIds)
                //{
                //    cmd.Parameters.AddWithValue("@SkillId", SkillId);
                //}
                cmd.Parameters.AddWithValue("@ProficiencyLevel", employeeSkill.ProficiencyLevel);
                cmd.Parameters.AddWithValue("@Roll", employeeSkill.Roll);
                cmd.Parameters.AddWithValue("@Password", EncryptPasswordBase64(employeeSkill.Password));


                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

            }

            return new JsonResult("Data is Save");
        }
        public static string EncryptPasswordBase64(string text)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(text);
            return System.Convert.ToBase64String(plainTextBytes);
        }
    

        [HttpPost]
        public JsonResult UpdateEmp(EmployeeSkill employeeSkill)
        {
            try
            {
                SqlConnection conn = new SqlConnection(Configuration.GetConnectionString("DefaultConnection"));
                List<EmployeeSkill> lst = new List<EmployeeSkill>();
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();

                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "UpdateData";

                cmd.Parameters.AddWithValue("@EmployeeSkillId", employeeSkill.EmployeeSkillId);
                cmd.Parameters.AddWithValue("@EmployeeId", employeeSkill.EmployeeId);
                cmd.Parameters.AddWithValue("@FirstName", employeeSkill.FirstName);
                cmd.Parameters.AddWithValue("@LastName", employeeSkill.LastName);
                cmd.Parameters.AddWithValue("@Email", employeeSkill.Email);
                cmd.Parameters.AddWithValue("@Department", employeeSkill.Department);
                cmd.Parameters.AddWithValue("@SkillId", employeeSkill.SkillId);
                cmd.Parameters.AddWithValue("@ProficiencyLevel", employeeSkill.ProficiencyLevel);

                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return new JsonResult("Data is Updated");
        }

        public JsonResult EditEmp(int id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(Configuration.GetConnectionString("DefaultConnection"));
                List<EmployeeSkill> lst = new List<EmployeeSkill>();
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();

                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "getByIdEd";

                cmd.Parameters.AddWithValue("@EmployeeSkillId", id);
                cmd.CommandType = CommandType.StoredProcedure;

                conn.Open();
                //cmd.ExecuteNonQuery();
                da.Fill(dt);
                conn.Close();

                foreach (DataRow dr in dt.Rows)
                {
                    lst.Add(
                        new EmployeeSkill
                        {
                            EmployeeSkillId = Convert.ToInt32(dr["EmployeeSkillId"]),
                            EmployeeId = Convert.ToInt32(dr["EmployeeId"]),
                            FirstName = Convert.ToString(dr["FirstName"]),
                            LastName = Convert.ToString(dr["LastName"]),
                            Email = Convert.ToString(dr["Email"]),
                            Department = Convert.ToString(dr["Department"]),
                            SkillId = Convert.ToInt32(dr["SkillId"]),
                            SkillName = Convert.ToString(dr["SkillName"]),
                            ProficiencyLevel = Convert.ToString(dr["ProficiencyLevel"]),
                        });

                }

                var data = lst;
                return new JsonResult(data);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

            }

            return new JsonResult(null);
        }

    }
}
