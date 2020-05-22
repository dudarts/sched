using Microsoft.Extensions.Configuration;
using System;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Sched.Model;

namespace Sched.Auth
{
    public class TokenService
    {
        private readonly string _secret;
        private readonly double _timeout;
        public TokenService(IConfiguration config)
        {
            _secret = config.GetSection("TokenConfigurations:secret").Value;
            _timeout = Convert.ToDouble(config.GetSection("TokenConfigurations:seconds").Value);
        }
        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("subject", user.Id.ToString()),
                    new Claim("name", user.Name.ToString()),
                    new Claim("email", user.Email.ToString()),
                    new Claim("role", "user")
                }),
                Expires = DateTime.UtcNow.AddSeconds(_timeout),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}