using API_project.Context;
using API_project.Models;
using API_project.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Repository.data
{
    public class EmployeeRepository : GeneralRepository<MyContext, Employee, string>
    {
        private readonly MyContext myContext;
        public EmployeeRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;

        }

        public int Register(RegisterVM registerVM)
        {

            int hasilCek = CheckAccount(registerVM);
            if (hasilCek != 1)
            {
                return hasilCek;
            }

            int increment = myContext.Employees.ToList().Count;
            string formattedNIK = "";
            string formattedIdEMP = "";
            if (increment == 0)
            {
                formattedNIK = DateTime.Now.Year + "0" + increment.ToString();
                formattedIdEMP = "EMP" + "0" + increment.ToString();
            }
            else
            {
                string increment2 = myContext.Employees.ToList().Max(e => e.NIK);
                int formula = Int32.Parse(increment2) + 1;
                formattedNIK = formula.ToString();

                string incrementId = myContext.Employees.ToList().Max(e => e.ID);
                string[] explode = incrementId.Split("P");
                int formulaId = Int32.Parse(explode[1]) + 1;
                formattedIdEMP = "EMP" + "0" + formulaId.ToString();
            }

            var employee = new Employee
            {
                ID = formattedIdEMP,
                NIK = formattedNIK,
                FirstName = registerVM.FirstName,
                LastName = registerVM.LastName,
                Gender = registerVM.Gender,
                Phone = registerVM.Phone,
                Address = registerVM.Address
            };
            myContext.Employees.Add(employee);
            myContext.SaveChanges();


            // Tabel Account
            string formattedIdACC = "";
            if (increment == 0)
            {
                formattedIdACC = "ACN" + "0" + increment.ToString();
            }
            else
            {
                string incrementId = myContext.Accounts.ToList().Max(e => e.ID);
                string[] explode = incrementId.Split("N");
                int formulaId = Int32.Parse(explode[1]) + 1;
                formattedIdACC = "ACN" + "0" + formulaId.ToString();
            }

            var account = new Account
            {
                ID = formattedIdACC,
                Email = registerVM.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(registerVM.Password),
                EmployeeID = formattedIdEMP
            };
            myContext.Accounts.Add(account);
            myContext.SaveChanges();


            // Table AccountRole
            string formattedIdACR = "";
            if (increment == 0)
            {
                formattedIdACR = "ACR" + "0" + increment.ToString();
            }
            else
            {
                string incrementId = myContext.AccountRoles.ToList().Max(e => e.ID);
                string[] explode = incrementId.Split("R");
                int formulaId = Int32.Parse(explode[1]) + 1;
                formattedIdACR = "ACR" + "0" + formulaId.ToString();
            }
            var accountRole = new AccountRole
            {
                ID = formattedIdACR,
                RoleID = "ROLE00",
                AccountID = formattedIdACC
            };
            myContext.AccountRoles.Add(accountRole);
            var result = myContext.SaveChanges();

            return result;
        }


        public int CheckAccount(RegisterVM registerVM)
        {
            var employee = myContext.Employees.SingleOrDefault(
                e => e.NIK == registerVM.NIK ||
                e.Phone == registerVM.Phone);
            var account = myContext.Accounts.SingleOrDefault(
                a => a.Email == registerVM.Email);

            if (employee == null)
            {
                // return 1;
                if (account == null)
                {
                    return 1;
                }
                else if(account.Email == registerVM.Email)
                {
                    return -3;
                }
                else { return 0; }

            }
            else
            {
                if (employee.NIK == registerVM.NIK)
                {
                    return -1;
                }
                else
                {
                    if (employee.Phone == registerVM.Phone)
                    {
                        return -2;
                    }
                    //else
                    //{
                    //    if (account.Email == registerVM.Email)
                    //    {
                    //        return -3;
                    //    }
                    //    else { return 0; }
                    //}
                    else { return 0; }

                }

            }
        }

    }
}
