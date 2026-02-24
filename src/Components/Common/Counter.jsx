
const Counter = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <div className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1 rounded border border-slate-200 max-sm:text-sm text-slate-600">
      <button onClick={onDecrement} className="p-1 select-none" type="button">
        -
      </button>

      <p className="p-1">{quantity}</p>

      <button onClick={onIncrement} className="p-1 select-none" type="button">
        +
      </button>
    </div>
  );
};

export default Counter;
