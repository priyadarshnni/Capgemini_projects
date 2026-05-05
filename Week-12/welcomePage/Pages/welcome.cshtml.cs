using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class WelcomeModel : PageModel
{
    [BindProperty]
    public string UserName { get; set; }

    public void OnGet()
    {
        UserName = "Guest";
    }

    public void OnPost()
    {
        if (string.IsNullOrEmpty(UserName))
        {
            UserName = "Guest";
        }
    }
}