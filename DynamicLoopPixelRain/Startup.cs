using DynamicLoopPixelRain;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace DynamicLoopPixelRain
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
