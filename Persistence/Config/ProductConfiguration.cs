using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Persistence.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).IsRequired().HasMaxLength(255);
            builder.Property(p => p.Price).IsRequired();
            builder.Property(p => p.ImageUrl).IsRequired();
            builder.HasOne(p => p.ProductBrand).WithMany().HasForeignKey(b => b.ProductBrandId);
            builder.HasOne(p => p.ProductType).WithMany().HasForeignKey(b => b.ProductTypeId);
        }
    }
}
