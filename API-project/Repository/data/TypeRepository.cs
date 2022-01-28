using API_project.Context;
using API_project.Models;

namespace API_project.Repository.data
{
    public class TypeRepository : GeneralRepository<MyContext, Type, string>
    {
        public TypeRepository(MyContext myContext) : base(myContext)
        {
        }
    }
}
