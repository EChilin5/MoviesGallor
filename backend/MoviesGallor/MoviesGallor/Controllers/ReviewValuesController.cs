﻿using Microsoft.AspNetCore.Http;
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
    public class ReviewValuesController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public ReviewValuesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public JsonResult addReview(Models.Review rev)
        {
            string query = @"Insert into Reviews values(@rating, @description, @userId)";
            DataTable table = new DataTable();
            string sqlDatabaseSource = _configuration.GetConnectionString("MoviesAppCon");
            SqlDataReader myReader;

            using (SqlConnection myConn = new SqlConnection(sqlDatabaseSource))
            {
                myConn.Open();
                using (SqlCommand commad = new SqlCommand(query, myConn))
                {

                    commad.Parameters.AddWithValue("@rating", rev.rating);
                    commad.Parameters.AddWithValue("@description", rev.description);
                    commad.Parameters.AddWithValue("@userId", rev.userId);
                   

                    myReader = commad.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();

                }
            }
            return new JsonResult("added successfully ");
        }

        [HttpGet]
        public JsonResult getAllReviews()
        {
            string query = @"Select * From Reviews";
            DataTable table = new DataTable();
            string sqlDatabaseSource = _configuration.GetConnectionString("MoviesAppCon");
            SqlDataReader myReader;

            using (SqlConnection myConn = new SqlConnection(sqlDatabaseSource))
            {
                myConn.Open();
                using (SqlCommand commad = new SqlCommand(query, myConn))
                {

             
                    myReader = commad.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();

                }
            }
            return new JsonResult(table);
        }

    }
}
