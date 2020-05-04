using Core.Interfaces;
using Core.Models;
using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Persistence
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            database = redis.GetDatabase();
        }

        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var data = await database.StringGetAsync(basketId);
            return data.IsNullOrEmpty ? null : JsonConvert.DeserializeObject<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket customerBasket)
        {
            var created = await database.StringSetAsync(customerBasket.Id, 
                JsonConvert.SerializeObject(customerBasket),TimeSpan.FromDays(30));

            if (!created)
                return null;

            return await GetBasketAsync(customerBasket.Id);

        }
    }
}
