using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevPARAM.Models
{
    public class DevParamDbContext : DbContext
    {
        public DevParamDbContext(DbContextOptions<DevParamDbContext> options) : base(options)
        {

        }
    }
}
