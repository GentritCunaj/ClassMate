



using System.Security.Claims;

namespace ClassMate.Models
{
    public interface IAuthentication
    {
        string GenerateJwtToken(ApplicationUser user, string role);

        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);

        string GenerateRefreshToken();
       /* string ValidateToken(string token);*/
    }
}