using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SmartIT.Employee.MockDB;

namespace EmployeeWebApi.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Route("api/employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeRepository _employeeService;

        public EmployeeController()
        {
            _employeeService = new EmployeeRepository();
        }

        [HttpGet]
        public async Task<ICollection<Employee>> Get()
        {
            return await _employeeService.GetAllAsync();
        }

        [HttpGet("{id}")]
        public ICollection<Employee> Get(string id)
        {
            if (id.IsNumeric())
                return _employeeService.FindbyId(Convert.ToInt32(id));

            return _employeeService.FindbyName(id);

        }

        [HttpPost]
        public async Task<Employee> Post([FromBody]Employee item)
        {
            return await _employeeService.AddAsync(item);
        }

        [HttpPut("{id}")]
        public async Task<Employee> Put([FromBody]Employee item)
        {
            return await _employeeService.UpdateAsync(item);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var findEmployee = await _employeeService.FindbyIdAsync(id);
            if (findEmployee != null)
                await _employeeService.DeleteAsync(findEmployee);
        }
    }
}