def initBoard(n,p):
  if p>= n/2:
    p = n/2 -1
  
  board = []
  for i in range(n):
    if(i < p ):
      board.append(1)
    elif( i >= n-p):
      board.append(2)
    else:
      board.append(0)
  return board

def display(board,n):
  l1 = ""
  l2 = ""

  for i in range(n):
    if board[i] == 0:
      l1 += ".".ljust(3)
    elif board[i] == 1:
      l1 += "x".ljust(3)
    else:
      l1 += "o".ljust(3)

    l2 += str(i).ljust(3)

  print(l1)
  print(l2)

board1 = initBoard(12,3)
display(board1,12)