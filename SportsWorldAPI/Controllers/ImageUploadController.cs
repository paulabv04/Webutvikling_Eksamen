
using Microsoft.AspNetCore.Mvc;

namespace SportsWorldAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public ImageUploadController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            //Folder: wwwroot/images
            string uploadPath = Path.Combine(_env.WebRootPath, "images");

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            //Unique filename 
            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            string filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
;
            }

            return Ok(new { fileName });
        }
    }
}