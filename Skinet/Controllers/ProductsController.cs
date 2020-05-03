using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Skinet.DTOs;
using Skinet.Errors;
using Skinet.Helpers;

namespace Skinet.Controllers
{
   

    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> productRepo;
        private readonly IGenericRepository<ProductBrand> productBrandRepo;
        private readonly IGenericRepository<ProductType> productTypeRepo;
        private readonly IMapper mapper;

        public ProductsController(IGenericRepository<Product> productRepo,
            IGenericRepository<ProductBrand> productBrandRepo,
            IGenericRepository<ProductType> productTypeRepo,
            IMapper mapper)
        {
            this.productRepo = productRepo;
            this.productBrandRepo = productBrandRepo;
            this.productTypeRepo = productTypeRepo;
            this.mapper = mapper;
        }


        /// <summary>
        /// Gets all products.
        /// </summary>
        [HttpGet]
        public async Task <ActionResult<Pagination<ProductToReturnDTO>>> GetProducts([FromQuery] ProductsSpecParams productsSpecParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productsSpecParams);

            var countSpec = new ProductsWithFiltersForCountsSpecification(productsSpecParams);

            var totalItems = await productRepo.CountAsync(countSpec);

            var products = await productRepo.ListAsync(spec);

            var data = mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDTO>>(products);
            //return Ok(data);
            return Ok(new Pagination<ProductToReturnDTO>(productsSpecParams.PageIndex, productsSpecParams.PageSize, totalItems, data));
        }
       
        /// <summary>
        /// Gets product by Id.
        /// </summary>
        /// <response code="404">If the product is not found</response>  
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDTO>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await productRepo.GetModelWithSpec(spec);

            if (product == null)
                return NotFound(new ApiResponse(404));

            return Ok(mapper.Map<Product,ProductToReturnDTO>(product));
        }

        /// <summary>
        /// Gets all brands.
        /// </summary>
        [HttpGet("brands")]
        public async Task<IActionResult> GetProductBrands()
        {
            var brands = await productBrandRepo.ListAllAsync();
            return Ok(brands);
        }

        /// <summary>
        /// Gets all product types.
        /// </summary>
        [HttpGet("types")]
        public async Task<IActionResult> GetProductTypes()
        {
            var types = await productTypeRepo.ListAllAsync();
            return Ok(types);
        }


    }
}