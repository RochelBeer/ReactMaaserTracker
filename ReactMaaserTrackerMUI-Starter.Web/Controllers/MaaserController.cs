using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserController : ControllerBase
    {
        private readonly string _connectionString;
        public MaaserController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("getsources")]
        public List<Source> GetSources()
        {
            Repository repo = new(_connectionString);
            List<Source> sources = repo.GetSources();
            return sources;
        }
        [HttpPost]
        [Route("addsource")]
        public void AddSource(Source source)
        {
            Repository repo = new(_connectionString);
            repo.AddSource(source);
        }
        [HttpPost]
        [Route("editsource")]
        public void EditSource(Source source)
        {
            Repository repo = new(_connectionString);
            repo.EditSource(source);
        }
        [HttpPost]
        [Route("deletesource")]
        public void DeleteSource(Source source)
        {
            Repository repo = new(_connectionString);
            repo.DeleteSource(source);
        }
        [HttpGet]
        [Route("getincomes")]
        public List<Income> GetIncomes()
        {
            Repository repo = new(_connectionString);
            return repo.GetIncomes();
        }
        [HttpPost]
        [Route("addincome")]
        public void AddIncome(Income income)
        {
            Repository repo = new(_connectionString);
            repo.AddIncome(income);
        }
        [HttpGet]
        [Route("getmaaser")]
        public List<Maaser> GetMaaser()
        {
            Repository repo = new(_connectionString);
            return repo.GetMaaser();
        }
        [HttpPost]
        [Route("addMaaser")]
        public void AddMaaser(Maaser maaser)
        {
            Repository repo = new(_connectionString);
            repo.AddMaaser(maaser);
        }
        [HttpGet]
        [Route("totalincome")]
        public decimal TotalIncome()
        {
            Repository repo = new(_connectionString);
            return repo.TotalIncome();
        }
        [HttpGet]
        [Route("totalmaaser")]
        public decimal TotalMaaser()
        {
            Repository repo = new(_connectionString);
            return repo.TotalMaaser();
        }
        //[HttpGet]
        //[Route("getsortedbysource")]
        //public List<Source> GetSortedBySource()
        //{
        //    Repository repo = new(_connectionString);
        //    repo.
        //}

    }
}
