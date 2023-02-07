using Microsoft.AspNetCore.Mvc;

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

        public IActionResult GetTestAllCreditCardsPartialView()
        {
            return PartialView("TestAllCreditCardsPartial");
        }

        public IActionResult GetAddNewCreditCardPartialView()
        {
            return PartialView("AddNewCreditCardPartial");
        }
    }
}
