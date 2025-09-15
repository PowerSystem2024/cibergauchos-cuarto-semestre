# Profundizando el tipo float
a = 3.0



# Contructor de tipo float --> puede recibir int y str
a = float(10) # le pasamos un tipo entero
a = float('10')
print(f"a: {a}")

# Notación exponencial (valores positivos o negativos)
a = 3e5
print(f"a =  {a:.5f}")


# Cualquier calculo que incluye un float, !!!!todo cambia a float

a = 4.0 + 5
print(a)
print(type(a))