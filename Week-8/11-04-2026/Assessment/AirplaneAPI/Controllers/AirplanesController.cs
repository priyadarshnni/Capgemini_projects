using Microsoft.AspNetCore.Mvc;
using AirplaneAPI.Models;
using AirplaneAPI.DTOs;

namespace AirplaneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirplanesController : ControllerBase
    {
        private static readonly List<Airplane> airplanes = new List<Airplane>
        {
            new Airplane
            {
                Id = 1,
                ModelName = "A320",
                Manufacturer = "Airbus",
                Capacity = 180,
                Price = 98000000,
                EngineType = "Jet",
                ManufactureDate = new DateTime(2020, 5, 10),
                IsCargo = false,
                Country = "France"
            },
            new Airplane
            {
                Id = 2,
                ModelName = "Boeing 737",
                Manufacturer = "Boeing",
                Capacity = 200,
                Price = 105000000,
                EngineType = "Jet",
                ManufactureDate = new DateTime(2019, 3, 15),
                IsCargo = false,
                Country = "USA"
            }
        };

        
        [HttpGet]
        public ActionResult<IEnumerable<AirplaneResponseDto>> GetAllAirplanes()
        {
            var result = airplanes.Select(a => new AirplaneResponseDto
            {
                Id = a.Id,
                ModelName = a.ModelName,
                Manufacturer = a.Manufacturer,
                Capacity = a.Capacity,
                Price = a.Price,
                EngineType = a.EngineType,
                ManufactureDate = a.ManufactureDate,
                IsCargo = a.IsCargo,
                Country = a.Country
            }).ToList();

            return Ok(result);
        }

        
        [HttpGet("{id}")]
        public ActionResult<AirplaneResponseDto> GetAirplaneById(int id)
        {
            var airplane = airplanes.FirstOrDefault(a => a.Id == id);

            if (airplane == null)
            {
                return NotFound(new
                {
                    message = $"Airplane with id {id} not found."
                });
            }

            var result = new AirplaneResponseDto
            {
                Id = airplane.Id,
                ModelName = airplane.ModelName,
                Manufacturer = airplane.Manufacturer,
                Capacity = airplane.Capacity,
                Price = airplane.Price,
                EngineType = airplane.EngineType,
                ManufactureDate = airplane.ManufactureDate,
                IsCargo = airplane.IsCargo,
                Country = airplane.Country
            };

            return Ok(result);
        }

        
        [HttpPost]
        public ActionResult<AirplaneResponseDto> CreateAirplane([FromBody] CreateAirplaneDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int newId = airplanes.Any() ? airplanes.Max(a => a.Id) + 1 : 1;

            var airplane = new Airplane
            {
                Id = newId,
                ModelName = dto.ModelName,
                Manufacturer = dto.Manufacturer,
                Capacity = dto.Capacity,
                Price = dto.Price,
                EngineType = dto.EngineType,
                ManufactureDate = dto.ManufactureDate,
                IsCargo = dto.IsCargo,
                Country = dto.Country
            };

            airplanes.Add(airplane);

            var response = new AirplaneResponseDto
            {
                Id = airplane.Id,
                ModelName = airplane.ModelName,
                Manufacturer = airplane.Manufacturer,
                Capacity = airplane.Capacity,
                Price = airplane.Price,
                EngineType = airplane.EngineType,
                ManufactureDate = airplane.ManufactureDate,
                IsCargo = airplane.IsCargo,
                Country = airplane.Country
            };

            return CreatedAtAction(nameof(GetAirplaneById), new { id = airplane.Id }, response);
        }

        
        [HttpPut("{id}")]
        public ActionResult UpdateAirplane(int id, [FromBody] UpdateAirplaneDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var airplane = airplanes.FirstOrDefault(a => a.Id == id);

            if (airplane == null)
            {
                return NotFound(new
                {
                    message = $"Airplane with id {id} not found."
                });
            }

            airplane.ModelName = dto.ModelName;
            airplane.Manufacturer = dto.Manufacturer;
            airplane.Capacity = dto.Capacity;
            airplane.Price = dto.Price;
            airplane.EngineType = dto.EngineType;
            airplane.ManufactureDate = dto.ManufactureDate;
            airplane.IsCargo = dto.IsCargo;
            airplane.Country = dto.Country;

            return Ok(new
            {
                message = $"Airplane with id {id} updated successfully."
            });
        }

        
        [HttpDelete("{id}")]
        public ActionResult DeleteAirplane(int id)
        {
            var airplane = airplanes.FirstOrDefault(a => a.Id == id);

            if (airplane == null)
            {
                return NotFound(new
                {
                    message = $"Airplane with id {id} not found."
                });
            }

            airplanes.Remove(airplane);

            return Ok(new
            {
                message = $"Airplane with id {id} deleted successfully."
            });
        }
    }
}