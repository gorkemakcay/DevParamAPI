using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevPARAM.Controllers
{
    public class CreditCardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetCreaditCardPartialView()
        {
            return PartialView("CreditCardPartial");
        }
    }
}
