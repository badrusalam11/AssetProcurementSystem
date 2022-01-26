using API_project.Context;
using API_project.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Repository
{
    public class GeneralRepository<Context, Entity, Key> : IRepository<Entity, Key> where Entity : class where Context : MyContext
    {
        private readonly MyContext myContext;
        private readonly DbSet<Entity> entities;

        public GeneralRepository(MyContext myContext)
        {
            this.myContext = myContext;
            entities = myContext.Set<Entity>();
        }

        public IEnumerable<Entity> Get()
        {
            return entities.ToList();
        }

        public Entity Get(Key key)
        {
            return entities.Find(key);
        }

        public int Insert(Entity entyti)
        {
            if (entyti == null)
            {
                throw new ArgumentNullException("Entity");
            }
            entities.Add(entyti);
            return myContext.SaveChanges();
        }

        public int Update(Entity entyti)
        {
            if (entyti == null)
            {
                throw new ArgumentNullException("Entity");
            }
            myContext.Entry(entyti).State = EntityState.Modified;
            return myContext.SaveChanges();
        }

        public int Delete(Key key)
        {
            var entity = entities.Find(key);
            if (entity == null)
            {
                throw new ArgumentNullException("Entity");
            }
            entities.Remove(entity);
            return myContext.SaveChanges();
        }
    }
}
