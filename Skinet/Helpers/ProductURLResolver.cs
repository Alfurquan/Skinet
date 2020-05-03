using AutoMapper;
using Core.Models;
using Microsoft.Extensions.Configuration;
using Skinet.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skinet.Helpers
{
    public class ProductURLResolver : IValueResolver<Product, ProductToReturnDTO, string>
    {
        private readonly IConfiguration config;

        public ProductURLResolver(IConfiguration config)
        {
            this.config = config;
        }

        public string Resolve(Product source, ProductToReturnDTO destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ImageUrl))
            {
                return config["ApiUrl"] + source.ImageUrl;
            }
            return null;
        }
    }
}
