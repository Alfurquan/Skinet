﻿using Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
        Task<CustomerBasket> GetBasketAsync(string basketId);

        Task<CustomerBasket> UpdateBasketAsync(CustomerBasket customerBasket);

        Task<bool> DeleteBasketAsync(string basketId);
    }
}
