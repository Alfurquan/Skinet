using Core.Models;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence
{
	public class SkinetContextSeed
    {
        public static async Task SeedAsync(SkinetDbContext context, ILoggerFactory loggerFactory)
        {
			try
			{
				if (!context.ProductBrands.Any())
				{
					var brandsData = File.ReadAllText("../Persistence/SeedData/brands.json");
					var brands = JsonConvert.DeserializeObject<List<ProductBrand>>(brandsData);

					foreach (var item in brands)
					{
						context.ProductBrands.Add(item);
					}
					await context.SaveChangesAsync();
				}
				if (!context.ProductTypes.Any())
				{
					var typesData = File.ReadAllText("../Persistence/SeedData/types.json");
					var types = JsonConvert.DeserializeObject<List<ProductType>>(typesData);

					foreach (var item in types)
					{
						context.ProductTypes.Add(item);
					}
					await context.SaveChangesAsync();
				}
				if (!context.Products.Any())
				{
					var productsData = File.ReadAllText("../Persistence/SeedData/products.json");
					var products = JsonConvert.DeserializeObject<List<Product>>(productsData);

					foreach (var item in products)
					{
						context.Products.Add(item);
					}
					await context.SaveChangesAsync();
				}
				

			}
			catch (Exception ex)
			{
				Debug.WriteLine(ex);
			}
        }
    }
}
