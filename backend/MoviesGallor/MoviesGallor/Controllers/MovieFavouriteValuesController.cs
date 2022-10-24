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
    public class MovieFavouriteValuesController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public MovieFavouriteValuesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public JsonResult insertUserInformation(Models.MovieFavoriteList mov)
        {
            string query = @"Insert into Movies values(@originalMovieId, @title, @overview, @genre_id, 
                @frontImage, @backImage, @userId)";
            DataTable table = new DataTable();
            string sqlDatabaseSource = _configuration.GetConnectionString("MoviesAppCon");
            SqlDataReader myReader;

            using (SqlConnection myConn = new SqlConnection(sqlDatabaseSource))
            {
                myConn.Open();
                using (SqlCommand commad = new SqlCommand(query, myConn))
                {

                    commad.Parameters.AddWithValue("@originalMovieId", mov.originalMovieId);
                    commad.Parameters.AddWithValue("@title", mov.title);
                    commad.Parameters.AddWithValue("@overview", mov.overview);
                    commad.Parameters.AddWithValue("@genre_id", mov.genre_id);
                    commad.Parameters.AddWithValue("@frontImage", mov.frontImage);
                    commad.Parameters.AddWithValue("@backImage", mov.backImage);
                    commad.Parameters.AddWithValue("@userId", mov.userId);

                    myReader = commad.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();

                }

            }

            return new JsonResult("added successfully ");
        }

        [HttpPut]
        public JsonResult getUserMovies(Models.MovieFavoriteList movies)
        {
            string query = @"Select * from Movies Where userId = @userId ";
            DataTable table = new DataTable();
            string sqlDatabaseSource = _configuration.GetConnectionString("MoviesAppCon");
            SqlDataReader myReader;

            using (SqlConnection myConn = new SqlConnection(sqlDatabaseSource))
            {
                myConn.Open();
                using (SqlCommand commad = new SqlCommand(query, myConn))
                {

                    commad.Parameters.AddWithValue("@userId", movies.userId);


                    myReader = commad.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();

                }

            }

            return new JsonResult(table);
        }


        [HttpDelete]
        public JsonResult deleteFavorite(Models.MovieFavoriteList movies)
        {
            string query = @"Delete From Movies where userId = @userId and originalMovieId = @originalMovieId";
            DataTable table = new DataTable();
            string sqlDatabaseSource = _configuration.GetConnectionString("MoviesAppCon");
            SqlDataReader myReader;

            using (SqlConnection myConn = new SqlConnection(sqlDatabaseSource))
            {
                myConn.Open();
                using (SqlCommand commad = new SqlCommand(query, myConn))
                {

                    commad.Parameters.AddWithValue("@userId", movies.userId);
                    commad.Parameters.AddWithValue("@originalMovieId", movies.originalMovieId);


                    myReader = commad.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();

                }

            }

            return new JsonResult("deleted successfully");
        }


    }
}
