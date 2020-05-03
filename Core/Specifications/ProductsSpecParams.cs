using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specifications
{
    public class ProductsSpecParams
    {
        private const int MAX_PAGE_SIZE = 50;
        public int PageIndex { get; set; } = 1;

        private int _pageSize = 6;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                if (value > MAX_PAGE_SIZE)
                    _pageSize = MAX_PAGE_SIZE;

                _pageSize = value;
            }
        }
        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string Sort { get; set; }
        
        private string _search;
        public string Search
        {
            get
            {
                return _search;
            }
            set
            {
                _search = value.ToLower();
            }
        }
    }


}
