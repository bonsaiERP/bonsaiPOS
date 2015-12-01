var Base64 = function () {

  var DIC = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '+', '/' ];

	// public method for encoding
	this.encode = function(numero)
  {
    var base = 64;
    var cociente = 1;
    var resto = 0;
		var palabra = "";

		while (verificador(cociente, 0) != 0)
    {
      cociente = parseInt(numero / base);
			resto = numero % base;
			palabra = DIC[resto] + palabra;
			numero = cociente;
    }
		return palabra;
	}

  function verificador(a,b)
  {
    a = parseInt(a);
    b = parseInt(b);
    if (a > b)
    {
      return 1;
    }
    else
    {
      if (b > a)
      {
        return -1;
      }
      else
      {
        return 0;
      }
    }
  }

}
