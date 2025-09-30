def newBoard(n):
  board = []
  for i in range(n):
    board.append(0)
  return board

def display(board,n):
    lignePion = ""
    ligneIndices = ""

    for i in range(len(board)):
        if board[i] == 0:
            symbole = "."
        elif board[i] == -1:
            symbole = "o"
        elif board[i] == 1:
            symbole = "x"
        else:
            symbole = "?"

        lignePion += symbole.ljust(3)
        ligneIndices += str(i + 1).ljust(3)

    print(lignePion)
    print(ligneIndices)
    print()

def possible(board,n,i):
    if(board[i-1] == 0):
        return True
    return False

def select(board,n):
    choix = int(input("Choisissez un chiffre entre 1 et 12 : "))
    if (choix < 1 or choix > n) or not possible(board,n,choix):
        return select(board,n)
    print()
    return choix

def put(board,n,i):
    if i - 2 >= 0:
        board[i - 2] = -1
    if i - 1 >= 0:
        board[i - 1] = 1
    if i < n:
        board[i] = -1

def again(board,n):
    for i in range(n):
        if(board[i] == 0):
            return True
    return False


def Dawson(n):
    board1 = newBoard(n)
    player = 1
    display(board1,n)

    while (again(board1,n)):
        print("Player " + str(player))
        i = select(board1,n)
        put(board1,n,i)
        display(board1,n)
        if again(board1,n):
          player = 2 if player == 1 else 1
    
    print("Player " + str(player) + " win")




Dawson(12)


