using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {

        public ProductsWithTypesAndBrandsSpecification(ProductsSpecParams productsSpecParams) 
            : base(x => 
            (string.IsNullOrEmpty(productsSpecParams.Search) || x.Name.ToLower().Contains(productsSpecParams.Search)) &&
            (!productsSpecParams.BrandId.HasValue || x.ProductBrandId == productsSpecParams.BrandId) 
            && (!productsSpecParams.TypeId.HasValue || x.ProductTypeId == productsSpecParams.TypeId))
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
            AddOrderBy(x => x.Name);
            ApplyPaging(productsSpecParams.PageSize * (productsSpecParams.PageIndex - 1), productsSpecParams.PageSize);


            if (!string.IsNullOrEmpty(productsSpecParams.Sort))
            {
                switch (productsSpecParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;

                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;

                    default:
                        AddOrderBy(p => p.Name);
                        break;
                }
            }
        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
        }
    }
}
