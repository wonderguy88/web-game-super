export const ResolveWinning = (type, amount) => {
  switch (type) {
    case 1:
      return amount * 35;
    case 2:
      return amount * 17;
    case 3:
      return amount * 11;
    case 4:
      return amount * 8;
    case 5:
      return amount * 5;
    case 6:
      return amount * 5;
    case 12:
      return amount * 2;
    case 18:
      return amount;

    default:
      return 0;
  }
};

export default (betsData, wheelNumber) => {
  let result = 0;
  betsData.forEach((bet) => {
    if (bet[1].split(",").includes(`${wheelNumber}`)) {
      result += ResolveWinning(bet[0], bet[2]);
      result += bet[2]; // returning bet amount if win
    }
  });
  return result;
};
