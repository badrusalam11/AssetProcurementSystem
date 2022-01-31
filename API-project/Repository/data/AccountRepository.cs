using API_project.Context;
using API_project.Models;
using API_project.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Repository.data
{
    public class AccountRepository : GeneralRepository<MyContext, Account, string>
    {
        private readonly MyContext myContext;
        public AccountRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
        public int Login(LoginVM loginVM)
        {
            var email = myContext.Accounts.FirstOrDefault(a => a.Email == loginVM.Email);
            if (email != null)
            {
                var account = myContext.Accounts.Where(a => a.ID == email.ID).FirstOrDefault();
                if (BCrypt.Net.BCrypt.Verify(loginVM.Password, account.Password))
                {
                    return 1;
                }
                return 6;
            }
            return 0;
        }
        public IEnumerable<Object> GetRoles(string mail)
        {
            var cek = myContext.Accounts.Where(a => a.Email == mail).FirstOrDefault();
            var role = myContext.AccountRoles.Where(a => a.AccountID == cek.ID).Select(ar => ar.Role.Name).ToList();
            return role;
        }

        public Employee GetEmployees(string mail)
        {
            var account = myContext.Accounts.Where(a => a.Email == mail).FirstOrDefault();
            var employee = myContext.Employees.Where(a => a.ID == account.EmployeeID).FirstOrDefault();
            return employee;
        }
    }
}
