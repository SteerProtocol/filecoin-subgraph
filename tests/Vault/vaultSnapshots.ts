export class PoolData {
  fees1: string;
  fees0: string;
  timestamp: string;
  totalAmount0: string;
  totalAmount1: string;
  sqrtPriceX96: string;
  totalSupply: string;

  constructor(
    totalAmount0: string,
    totalAmount1: string,
    timestamp: string,
    totalSupply: string,
    sqrtPriceX96: string,
    fees1: string,
    fees0: string
  ){
    this.fees1 = fees1;
    this.fees0 = fees0;
    this.timestamp = timestamp;
    this.totalAmount0 = totalAmount0;
    this.totalAmount1 = totalAmount1;
    this.sqrtPriceX96 = sqrtPriceX96;
    this.totalSupply = totalSupply;
  }
}

export const VAULT_SNAPSHOTS: Array<PoolData> = [
  new PoolData(
     "1505585011433837307",
     "28715152",
     "1687945370",
     "1443100000000000000",
    "358714861477854225271620",
    "0",
    "0"
  ),
  new PoolData(
     "1671930172167301781",
     "25355666",
     "1688031380",
     "1443100000000000000",
    "356090955606042523368055",
    "9825",
    "876962928424899"
  ),
  new PoolData(
     "1407361150598518538",
     "30780771",
     "1688117750",
     "1443100000000000000",
    "359152647877459693765000",
    "27955",
    "1326111984260987"
  ),
  new PoolData(
     "1301097844734072186",
     "33004379",
     "1688204150",
     "1443100000000000000",
    "361329353497586386770965",
    "46667",
    "1941953204646795"
  ),
  new PoolData(
     "2074856272949256357",
     "17736213",
     "1688290550",
     "1443100000000000000",
    "346226338823273848067469",
    "114088",
    "7574742369468390"
  ),
  new PoolData(
     "1681237441016963496",
     "25327412",
     "1688376980",
     "1443100000000000000",
    "347179760365803774211506",
    "147811",
    "9208982918949625"
  ),
  new PoolData(
     "1927645566635421487",
     "20695165",
     "1688463350",
     "1443100000000000000",
    "341684463196738606346427",
    "155931",
    "10299759637854197"
),
]
