using System.ComponentModel.DataAnnotations;

namespace Core.Models
{
    public class BasketItem
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string ProductName { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        [StringLength(255)]
        public string ImageUrl { get; set; }
        [Required]
        [StringLength(255)]
        public string Brand { get; set; }
        [Required]
        [StringLength(255)]
        public string Type { get; set; }
    }
}