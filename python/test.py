def years(t):
  a, b = 0,1
  while b<2:
    b= b*(1+t)
    a = a+1
  return a

print(years(0.2))
