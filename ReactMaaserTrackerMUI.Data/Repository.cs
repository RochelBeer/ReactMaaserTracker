using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class Repository
    {
        private readonly string _connectionString;
        public Repository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Source> GetSources()
        {
            using var context = new DataContext(_connectionString);
            return context.Sources.Include(i => i.Incomes).ToList();
        }
        public void AddIncome(Income income)
        {
            using var context = new DataContext(_connectionString);
            context.Income.Add(income);
            context.SaveChanges();
        }
        public void AddMaaser(Maaser maaser)
        {
            using var context = new DataContext(_connectionString);
            context.Maaser.Add(maaser);
            context.SaveChanges();
        }
        public void AddSource(Source source)
        {
            using var context = new DataContext(_connectionString);
            context.Sources.Add(source);
            context.SaveChanges();
        }
        public void EditSource(Source source)
        {
            using var context = new DataContext(_connectionString);
            context.Sources.Update(source);
            context.SaveChanges();
        }
        public void DeleteSource(Source source)
        {
            using var context = new DataContext(_connectionString);
            context.Remove(source);
            context.SaveChanges();
        }
        public List<Maaser> GetMaaser()
        {
            using var context = new DataContext(_connectionString);
            return context.Maaser.ToList();
        }
        public List<Income> GetIncomes()
        {
            using var context = new DataContext(_connectionString);
            var list = context.Income.Include(i => i.Source).ToList();
            return list;
        }
        public decimal TotalIncome()
        {
            using var context = new DataContext(_connectionString);
            var totalIncome = context.Income.Sum(i => i.Amount);
            return totalIncome;
        }
        public decimal TotalMaaser()
        {
            using var context = new DataContext(_connectionString);
            var totalMaaser = context.Maaser.Sum(i => i.Amount);
            return totalMaaser;
        }

    }
}
