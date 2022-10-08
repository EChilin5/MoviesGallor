using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesGallor.Models
{
	
    public class MovieFavoriteList
    {
		public int movieID { get; set; }
		public int originalMovieId { get; set; }
		public string title { get; set; }
		public string overview { get; set; }
		public int genre_id { get; set; }
		public string frontImage { get; set; }
		public string backImage { get; set; }
		public int userId { get; set; }
    }
}
