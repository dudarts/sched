using System.Security.Cryptography;
using System.Text;

public class Cripto
{

    public static string md5(string txt)
    {
        MD5 md5Hasher = MD5.Create();
        byte[] valorCriptografado = md5Hasher.ComputeHash(Encoding.Default.GetBytes(txt));
        StringBuilder strBuilder = new StringBuilder();

        for (int i = 0; i < valorCriptografado.Length; i++)
        {
            strBuilder.Append(valorCriptografado[i].ToString("x2"));
        }
        return strBuilder.ToString();
    }

}