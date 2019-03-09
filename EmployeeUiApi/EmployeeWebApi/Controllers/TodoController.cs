using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SmartIT.Employee.MockDB;

namespace EmployeeWebApi.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoRepository _todoService;

        public TodoController()
        {
            _todoService = new TodoRepository();
        }

        //[Route("~/api/Get")]
        //[Route("~/api/GetAllTodos")]
        //[Route("~/api/GetTodos")]
        [HttpGet]
        public async Task<ICollection<Todo>> Get()
        {
            return await _todoService.GetAllAsync();
        }

        //[Route("~/api/Get/{id}")]
        //[Route("~/api/GetTodo/{id}")]
        [HttpGet("{id}")]
        public Todo Get(int id)
        {
            return  _todoService.FindbyId(id);
        }

        //[Route("~/api/GetTodoByName/{name}")]
        [HttpGet("{name}")]

        public ICollection<Todo> GetTodoByName(string name)
        {
            return _todoService.FindbyName(name);
        }

        //[Route("~/api/AddTodo")]
        [HttpPost]
        public async Task<Todo> Post([FromBody]Todo item)
        {
            return await _todoService.AddAsync(item);
        }

        //[Route("~/api/UpdateTodo/{id}")]
        //[Route("~/api/UpdateTodo")]
        [HttpPut("{id}")]
        public async Task<Todo> Put([FromBody]Todo item)
        {
            return await _todoService.UpdateAsync(item);
        }

        //[Route("~/api/DeleteTodo/{id}")]
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var findTodo = _todoService.FindbyId(id);
            if (findTodo != null)
                await _todoService.DeleteAsync(findTodo);
        }
    }
}