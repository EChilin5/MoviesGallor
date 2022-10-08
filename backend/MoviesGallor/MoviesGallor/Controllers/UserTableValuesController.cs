using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace MoviesGallor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTableValuesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserTableValuesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public JsonResult insertUserInformation(Models.UserTable user)
        {
            string query = @"Insert into UserTable values(@firstName, @lastName, @email, @password)";
            DataTable table = new DataTable();
            string sqlDatabaseSource = _configuration.GetConnectionString("MoviesAppCon");
            SqlDataReader myReader;

            using (SqlConnection myConn = new SqlConnection(sqlDatabaseSource))
            {
                myConn.Open();
                using (SqlCommand commad = new SqlCommand(query, myConn))
                {

                    commad.Parameters.AddWithValue("@firstName", user.firstName);
                    commad.Parameters.AddWithValue("@lastName", user.lastName);
                    commad.Parameters.AddWithValue("@email", user.email);
                    commad.Parameters.AddWithValue("@password", user.password);

                    myReader = commad.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();

                }

            }

            return new JsonResult("updated table ");
        }

        [HttpPut]
        public JsonResult getValidUser(Models.UserTable user)
        {
            string query = @"Select firstName, userId from UserTable Where email = @email and password = @password ";
            DataTable table = new DataTable();
            string sqlDatabaseSource = _configuration.GetConnectionString("MoviesAppCon");
            SqlDataReader myReader;

            using (SqlConnection myConn = new SqlConnection(sqlDatabaseSource))
            {
                myConn.Open();
                using (SqlCommand commad = new SqlCommand(query, myConn))
                {

                    commad.Parameters.AddWithValue("@email", user.email);
                    commad.Parameters.AddWithValue("@password", user.password);

                    myReader = commad.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();

                }

            }

            return new JsonResult(table);
        }

    }
}
