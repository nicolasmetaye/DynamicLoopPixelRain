using System.Web.Mvc;

namespace DynamicLoopPixelRain.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "DynamicLoop - Pixel Rain";

            return View();
        }
    }
}
