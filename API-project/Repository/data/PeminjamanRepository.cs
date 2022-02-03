using API_project.Context;
using API_project.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Repository.data
{
    public class PeminjamanRepository : GeneralRepository<MyContext, Peminjaman, string>
    {
        private readonly MyContext myContext;
        public PeminjamanRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public IEnumerable<Object> GetLoan()
        {
            var query = (from rp in myContext.Set<RequestPeminjaman>()
                         select new
                         {
                             ID = rp.ID,
                             StartDate = rp.StartDate,
                             EndDate = rp.EndDate,
                             Keperluan = rp.Keperluan,
                             Approval = rp.Approval,
                             Account = rp.AccountID,
                             Loan = rp.Loan,
                             Pinjaman = myContext.Peminjaman.Where(p => p.RequestPeminjamanID == rp.ID).ToList()
                         });

            return query.ToList();
        }

        public IEnumerable<Object> GetRequestLoan()
        {
            var query = (from e in myContext.Set<Employee>() join
                         a in myContext.Set<Account>() on e.ID equals a.EmployeeID join
                         rp in myContext.Set<RequestPeminjaman>() on a.ID equals rp.AccountID
                         where rp.Approval == 2 && rp.Loan == 0
                         select new
                         {
                             Name = e.FirstName + ' '+ e.LastName,
                             ID = rp.ID,
                             StartDate = rp.StartDate,
                             EndDate = rp.EndDate,
                             Keperluan = rp.Keperluan,
                             Approval = rp.Approval,
                             Account = rp.AccountID,
                             Loan = rp.Loan,
                             Pinjaman = myContext.Peminjaman.Where(p => p.RequestPeminjamanID == rp.ID).ToList()
                         });

            return query.ToList();
        }

        public IEnumerable<Object> GetLoanActive()
        {
            var query = (from e in myContext.Set<Employee>()
                         join a in myContext.Set<Account>() on e.ID equals a.EmployeeID
                         join rp in myContext.Set<RequestPeminjaman>() on a.ID equals rp.AccountID
                         where rp.Approval == 0 && rp.Loan == 1
                         select new
                         {
                             Name = e.FirstName + ' ' + e.LastName,
                             ID = rp.ID,
                             StartDate = rp.StartDate,
                             EndDate = rp.EndDate,
                             Keperluan = rp.Keperluan,
                             Approval = rp.Approval,
                             Account = rp.AccountID,
                             Loan = rp.Loan,
                             Pinjaman = myContext.Peminjaman.Where(p => p.RequestPeminjamanID == rp.ID).ToList()
                         });

            return query.ToList();
        }

        public IEnumerable<Object> GetReturnRequestLoan()
        {
            var query = (from e in myContext.Set<Employee>()
                         join a in myContext.Set<Account>() on e.ID equals a.EmployeeID
                         join rp in myContext.Set<RequestPeminjaman>() on a.ID equals rp.AccountID
                         where rp.Approval == 2 && rp.Loan == 2
                         select new
                         {
                             Name = e.FirstName + ' ' + e.LastName,
                             ID = rp.ID,
                             StartDate = rp.StartDate,
                             EndDate = rp.EndDate,
                             Keperluan = rp.Keperluan,
                             Approval = rp.Approval,
                             Account = rp.AccountID,
                             Loan = rp.Loan,
                             Pinjaman = myContext.Peminjaman.Where(p => p.RequestPeminjamanID == rp.ID).ToList()
                         });

            return query.ToList();
        }

        public IEnumerable<Object> GetLoanHistory()
        {
            var query = (from e in myContext.Set<Employee>()
                         join a in myContext.Set<Account>() on e.ID equals a.EmployeeID
                         join rp in myContext.Set<RequestPeminjaman>() on a.ID equals rp.AccountID
                         where (rp.Approval == 1 && rp.Loan == 3) || (rp.Approval == 0 && rp.Loan == 2)
                         select new
                         {
                             Name = e.FirstName + ' ' + e.LastName,
                             ID = rp.ID,
                             StartDate = rp.StartDate,
                             EndDate = rp.EndDate,
                             Keperluan = rp.Keperluan,
                             Approval = rp.Approval,
                             Account = rp.AccountID,
                             Loan = rp.Loan,
                             Pinjaman = myContext.Peminjaman.Where(p => p.RequestPeminjamanID == rp.ID).ToList()
                         });

            return query.ToList();
        }

        public IEnumerable<Object> GetLoanActiveEmployee(string AccountID)
        {
            var query = (from rp in myContext.Set<RequestPeminjaman>()
                         where rp.AccountID == AccountID && ((rp.Approval == 2 && rp.Loan == 0) || (rp.Approval == 0 && rp.Loan == 1) || (rp.Approval == 2 && rp.Loan == 2))
                         select new
                         {
                             ID = rp.ID,
                             StartDate = rp.StartDate,
                             EndDate = rp.EndDate,
                             Keperluan = rp.Keperluan,
                             Approval = rp.Approval,
                             Account = rp.AccountID,
                             Loan = rp.Loan,
                             Pinjaman = myContext.Peminjaman.Where(p => p.RequestPeminjamanID == rp.ID).ToList()
                         });

            return query.ToList();
        }

        public IEnumerable<Object> GetLoanHistoryEmployee(string AccountID)
        {
            var query = (from rp in myContext.Set<RequestPeminjaman>()
                         where rp.AccountID == AccountID && ((rp.Approval == 1 && rp.Loan == 3) || (rp.Approval == 0 && rp.Loan == 2))
                         select new
                         {
                             ID = rp.ID,
                             StartDate = rp.StartDate,
                             EndDate = rp.EndDate,
                             Keperluan = rp.Keperluan,
                             Approval = rp.Approval,
                             Account = rp.AccountID,
                             Loan = rp.Loan,
                             Pinjaman = myContext.Peminjaman.Where(p => p.RequestPeminjamanID == rp.ID).ToList()
                         });

            return query.ToList();
        }

        public IEnumerable<Object> GetLoanDetail(string ID)
        {
            var query = (from rp in myContext.Set<RequestPeminjaman>()
                         where rp.ID == ID
                         select new
                         {
                             ID = rp.ID,
                             StartDate = rp.StartDate,
                             EndDate = rp.EndDate,
                             Keperluan = rp.Keperluan,
                             Approval = rp.Approval,
                             Account = rp.AccountID,
                             Loan = rp.Loan,
                             Pinjaman = myContext.Peminjaman.Where(p => p.RequestPeminjamanID == rp.ID).ToList()
                         });

            return query.ToList();
        }
    }
}
