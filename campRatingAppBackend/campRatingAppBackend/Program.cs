using campRatingAppBackend.Services;
using campRatingBackend;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure; // Ensure this is present

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
        builder.WithOrigins("http://localhost:5173") // Frontend URL
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials()); // Optionally allow credentials (cookies, authorization headers)
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

// Register services (you'll create these)
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<CampgroundService>();
builder.Services.AddScoped<ReviewService>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});

// Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend"); // Always BEFORE Authorization

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
