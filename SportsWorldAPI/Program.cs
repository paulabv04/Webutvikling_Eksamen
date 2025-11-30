using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<SportsWorldContext>(
    options => options.UseSqlite("Data Source=SportsWorld.db")
);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin()
    );
});

// Controllers
builder.Services.AddControllers();

// OpenAPI (samme som læreren)
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();  
app.UseStaticFiles();   

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "SportsWorld API v1");
    });
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

Console.WriteLine("DATABASE PATH:");
Console.WriteLine(Path.GetFullPath("SportsWorld.db"));

app.Run();
