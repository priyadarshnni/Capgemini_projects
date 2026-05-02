using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);


builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddOcelot(builder.Configuration);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();


app.UseSwagger();

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/admission/swagger/v1/swagger.json", "Admission API");
    c.SwaggerEndpoint("/attendance/swagger/v1/swagger.json", "Attendance API");
    c.SwaggerEndpoint("/student/swagger/v1/swagger.json", "Student API");
});

app.UseCors("AllowAll");


await app.UseOcelot();

app.Run();