using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Skinet.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skinet.Controllers
{
    //[ApiExplorerSettings(IgnoreApi = true)]
    public class BuggyController : BaseApiController
    {
        private readonly SkinetDbContext context;

        public BuggyController(SkinetDbContext context)
        {
            this.context = context;
        }

        [HttpGet("notfound")]
        public IActionResult GetNotFoundRequest()
        {
            return Ok();
        }
        [HttpGet("servererror")]
        public IActionResult GetServerError()
        {
            var product = context.Products.Find(42);
            var thingToReturn = product.ToString();
            return Ok();
        }
        [HttpGet("badrequest")]
        public IActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }
        [HttpGet("badrequest/{id}")]
        public IActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}
