using API_project.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_project.Context
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<AccountRole> AccountRoles { get; set; }
        public DbSet<Models.Type> Types { get; set; }
        public DbSet<Barang> Barangs { get; set; }
        public DbSet<RequestPeminjaman> RequestPeminjaman { get; set; }
        public DbSet<Peminjaman> Peminjaman { get; set; }
        public DbSet<Pengembalian> Pengembalians { get; set; }
        public DbSet<Tagihan> Tagihans { get; set; }
        public DbSet<Nota> Notas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().HasOne(a => a.Account).WithOne(em => em.Employee).HasForeignKey<Account>(a => a.EmployeeID);
            modelBuilder.Entity<Account>().HasMany(ar => ar.AccountRoles).WithOne(a => a.Account).HasForeignKey(ar => ar.AccountID);
            modelBuilder.Entity<Role>().HasMany(ar => ar.AccountRoles).WithOne(r => r.Role);
            modelBuilder.Entity<Models.Type>().HasMany(b => b.Barangs).WithOne(t => t.Type);
            modelBuilder.Entity<Account>().HasMany(rp => rp.RequestPeminjaman).WithOne(a => a.Account);
            modelBuilder.Entity<RequestPeminjaman>().HasMany(p => p.Peminjaman).WithOne(rp => rp.RequestPeminjaman);
            modelBuilder.Entity<Barang>().HasMany(p => p.Peminjaman).WithOne(b => b.Barang);
            modelBuilder.Entity<Peminjaman>().HasOne(pb => pb.Pengembalian).WithOne(p => p.Peminjaman).HasForeignKey<Pengembalian>(pb => pb.ID);
            modelBuilder.Entity<Pengembalian>().HasOne(t => t.Tagihan).WithOne(pb => pb.Pengembalian).HasForeignKey<Tagihan>(t => t.PengembalianID);
            modelBuilder.Entity<Nota>().HasMany(t => t.Tagihans).WithOne(n => n.Nota);
        }
    }
}
