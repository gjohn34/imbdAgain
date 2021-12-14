using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using imbdAgain.Models;
using System.Collections;
using System.Collections.Generic;

namespace imbdAgain.Data
{
    public class Auth : IJWTAuth
    {
        private readonly string _key;
        public Auth(string key)
        {
            _key = key;
        }

        public string Authentication(string username, string password, IEnumerable<User> users)
        {
            // TODO - change this to db query
            User user = users.FirstOrDefault(x => x.Username == username && x.Password == password);
            if (user == null)
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenKey = Encoding.ASCII.GetBytes(_key);

            //var claims = new Dictionary<string, object>()
            //    {
            //        { "id", "bar" },
            //    };

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Username),
                        new Claim("id", user.Id.ToString())
                    }),
                //Claims = claims,
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature),


            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public JwtPayload FindUser(string token)
        {
            var handler = new JwtSecurityTokenHandler();

            if (!handler.CanReadToken(token))
            {
                throw new Exception();
            }
            return handler.ReadJwtToken(token).Payload;
            //try
            //{
            //    var identity = handler.ValidateToken(foo, validationParameters, out SecurityToken validatedToken);
            //    if (metadataAvailable)
            //    {
            //        output += "Token is valid according to metadata!";
            //    }
            //    else
            //    {
            //        output += "Token is valid according to a self-evaluation!";
            //    }

            //    jwtSignature = token.RawSignature;
            //}
            //catch (Exception e)
            //{
            //    //Print errors
            //}
        }
    }
}
