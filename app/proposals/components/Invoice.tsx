import { formatUnits } from 'viem';

interface InvoiceProps {
  symbol: string;
  usdAmount: number;
  tokenAmount: string;
  tokenPrice: string;
  decimals: number;
  fee: number;
}

export const Invoice = ({
  symbol,
  usdAmount,
  tokenAmount,
  tokenPrice,
  decimals,
  fee,
}: InvoiceProps) => {
  const formattedUnits = formatUnits(BigInt(tokenAmount), decimals);
  const formattedTokenAmount = parseFloat(formattedUnits).toFixed(6);

  return (
    <div className="grid grid-cols-2">
      <h3 className="text-lg font-medium mb-2">Subtotal</h3>
      <p className="text-lg font-medium text-end mb-2">
        {tokenPrice !== '1.00' ? '' : '$'}
        {formattedTokenAmount} {symbol}
      </p>
      <h3 className="text-lg font-medium mb-2">Fee</h3>
      <p className="text-lg font-medium text-end mb-2">{fee}%</p>
      <h3 className="text-lg font-medium mb-4">Total USD</h3>
      <div>
        <p className="text-lg font-medium text-end">${usdAmount} </p>
        <p className="text-sm font-medium text-end mb-4">
          (1{symbol} = ${tokenPrice})
        </p>
      </div>

      <h3 className="text-2xl font-bold">Total amount</h3>
      <p className="text-2xl font-bold text-end">
        {tokenPrice !== '1.00' ? '' : '$'}
        {formattedTokenAmount}
        {symbol}
      </p>
    </div>
  );
};
