using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesGallor.Models
{
    public class Review
    {
        public int reviewId { get; set; }
        public int rating { get; set; }
        public string description { get; set; }
        public int userId { get; set; }
    }
}
