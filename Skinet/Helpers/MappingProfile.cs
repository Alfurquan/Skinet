using AutoMapper;
using Core.Models;
using Skinet.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skinet.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductToReturnDTO>()
                .ForMember(p => p.ProductType, opt => opt.MapFrom(p => p.ProductType.Name))
                .ForMember(p => p.ProductBrand, opt => opt.MapFrom(p => p.ProductBrand.Name))
                .ForMember(p => p.ImageUrl, opt => opt.MapFrom<ProductURLResolver>());
                
        }
    }
}
