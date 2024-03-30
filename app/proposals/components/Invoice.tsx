import { Token, TOKEN_FEES } from '@/contracts';

interface InvoiceProps {
  symbol: Token;
  usdAmount: number;
  tokenAmount: string;
  usdFactor: string;
}

export const Invoice = ({
  symbol,
  usdAmount,
  tokenAmount,
  usdFactor,
}: InvoiceProps) => {
  return (
    <div className="grid grid-cols-2">
      <h3 className="text-lg font-medium mb-2">Subtotal</h3>
      <p className="text-lg font-medium text-end mb-2">
        {symbol === Token.FLT ? '' : '$'}
        {tokenAmount} {symbol}
      </p>
      <h3 className="text-lg font-medium mb-2">Fee</h3>
      <p className="text-lg font-medium text-end mb-2">
        {TOKEN_FEES[symbol as Token]}%
      </p>
      <h3 className="text-lg font-medium mb-4">Total USD</h3>
      <div>
        <p className="text-lg font-medium text-end">${usdAmount} </p>
        <p className="text-sm font-medium text-end mb-4">
          (1FLT = ${usdFactor})
        </p>
      </div>

      <h3 className="text-2xl font-bold">Total amount</h3>
      <p className="text-2xl font-bold text-end">
        {symbol === Token.FLT ? '' : '$'}
        {tokenAmount}
        {symbol}
      </p>
    </div>
  );
};
